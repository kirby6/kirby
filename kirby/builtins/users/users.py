import json
from bson import json_util
from bson.json_util import ObjectId

from kirby.core.db import collection as users


def bson_to_json(data):
    return json.loads(json_util.dumps(data))


def get_all_users():
    return bson_to_json(users.find())


def get_user_by_id(user_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    return bson_to_json(users.find_one({'_id': user_id}))


def get_user_by_name(username):
    return bson_to_json(users.find_one({'username': username}))


def create_user(username, password, roles):
    return json_util.dumps(users.insert_one({
        'username': username,
        'password': password,
        'roles': roles
    }).inserted_id)
