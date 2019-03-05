import datetime
import json
from bson import ObjectId

from kirby.core.db import collection as helps, bson_to_json
from kirby.core import websocket


def get_all():
    return bson_to_json(helps.find({}))


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
    result = bson_to_json(helps.insert_one(help_object)).inserted_id
    websocket.emit(
        'helps', {
            'msg': 'help created',
            'id': json.dumps(result),
            'sender_id': json.dumps(sender_id),
            'receiving_group_id': json.dumps(receiving_group_id)
        })
    return result
