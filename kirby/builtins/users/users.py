import json
from bson import json_util
from bson.json_util import ObjectId

from kirby.core import db

users = db.get_collection('users')


def get_all_users():
    return json_util.dumps(users.find())


def get_user_by_id(user_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    return json.loads(json_util.dumps(users.find_one({'_id': user_id})))


def get_user_by_name(username):
    return json.loads(json_util.dumps(users.find_one({'username': username})))


def create_user(username, password, roles):
    return json_util.dumps(users.insert_one({
        'username': username,
        'password': password,
        'roles': roles
    }).inserted_id)
