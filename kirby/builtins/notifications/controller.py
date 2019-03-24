from bson import ObjectId
from flask import request

from kirby.core.private.router import socketio
from kirby.core.db import collection as notifications, bson_to_json
from kirby.builtins.auth import get_current_user_id

_userid_to_sid = {}


@socketio.on('connect')
def _connect_handler():
    current_user = get_current_user_id()
    if current_user:
        _userid_to_sid[current_user['id']] = request.sid
    else:
        return False


def get_by_user(user_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    return bson_to_json(list(notifications.find({'user_id': user_id})))


def notify(notification, *user_ids):
    if not user_ids:
        socketio.send({'context': notification})
    for user_id in user_ids:
        if not isinstance(user_id, ObjectId):
            user_id = ObjectId(user_id)
        new_notification_id = notifications.insert_one({
            'context': notification,
            'user_id': user_id
        }).inserted_id
        new_notification = bson_to_json(
            notifications.find_one({'_id': new_notification_id}))
        socketio.send(
            new_notification, room=_userid_to_sid[bson_to_json(user_id)])
