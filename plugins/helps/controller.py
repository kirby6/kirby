import datetime
from bson import ObjectId

from kirby.core.db import collection as helps, bson_to_json
from kirby.core import websocket


def get_all():
    return bson_to_json(
        list(
            helps.aggregate([{
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
                             }])))


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
