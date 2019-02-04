from bson import json_util
from bson.json_util import ObjectId

from kirby.core.db import bson_to_json, collection as users
from kirby.builtins.auth import get_token


def get_all_users():
    return bson_to_json(users.find())


def get_user_by_id(user_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    return bson_to_json(users.find_one({'_id': user_id}))


def get_user_by_name(username):
    return bson_to_json(users.find_one({'username': username}))


def create_user(firstname, lastname, username, password, roles):
    return json_util.dumps(users.insert_one({
        'firstname': firstname,
        'lastname': lastname,
        'username': username,
        'password': password,
        'roles': roles
    }).inserted_id)


def login(username, password):
    user = get_user_by_name(username)
    if user and user['password'] == password:
        return get_token(user)
    else:
        return jsonify({"error": "Invalid username or password"}), 401

