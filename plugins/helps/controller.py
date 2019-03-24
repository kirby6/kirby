import datetime
from bson import ObjectId

from kirby.core.db import collection as helps, bson_to_json
from kirby.core import websocket

aggregation = [{
    '$lookup': {
        'from': 'users',
        'localField': 'sender_id',
        'foreignField': '_id',
        'as': 'sender'
    }
}, {
    '$unwind': '$sender'
}, {
    '$project': {
        'sender.password': 0
    }
},
               {
                   '$lookup': {
                       'from': 'groups',
                       'localField': 'receiving_group_id',
                       'foreignField': '_id',
                       'as': 'receiving_group'
                   }
               }, {
                   '$unwind': '$receiving_group'
               }]


def get_all():
    return bson_to_json(list(helps.aggregate(aggregation)))


def get_by_id(help_id):
    if not isinstance(help_id, ObjectId):
        help_id = ObjectId(help_id)
    return bson_to_json(
        list(helps.aggregate([{
            '$match': {
                '_id': help_id
            }
        }] + aggregation))[0])


def create_help(sender_id, receiving_group_id, message, context=None):
    if not isinstance(sender_id, ObjectId):
        sender_id = ObjectId(sender_id)
    if not isinstance(receiving_group_id, ObjectId):
        receiving_group_id = ObjectId(receiving_group_id)
    help_object = {
        'sender_id': sender_id,
        'receiving_group_id': receiving_group_id,
        'message': message,
        'is_closed': False,
        'is_read': False,
        'creation_time': datetime.datetime.utcnow()
    }
    if context:
        help_object['context'] = context
    result = bson_to_json(helps.insert_one(help_object).inserted_id)
    websocket.emit(
        'help', {
            'msg': 'help created',
            'id': result,
            'sender_id': bson_to_json(sender_id),
            'receiving_group_id': bson_to_json(receiving_group_id)
        })
    return result


def get_by_sender(sender_id):
    if not isinstance(sender_id, ObjectId):
        sender_id = ObjectId(sender_id)
    return bson_to_json(
        list(
            helps.aggregate([{
                '$match': {
                    'sender_id': sender_id
                }
            }] + aggregation)))


def change_state(help_id, is_closed=None, is_read=None):
    if not isinstance(help_id, ObjectId):
        help_id = ObjectId(help_id)
    new_state = {}
    if is_closed is not None:
        new_state['is_closed'] = is_closed
    if is_read is not None:
        new_state['is_read'] = is_read
    helps.update_one({'_id': help_id}, {'$set': new_state})
    websocket.emit('help', {
        'msg': 'state changed',
        'id': bson_to_json(help_id),
    })
