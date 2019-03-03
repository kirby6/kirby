from bson import json_util
from bson.json_util import ObjectId
from flask import jsonify

from kirby.core.db import bson_to_json, collection as users
from kirby.builtins.auth import get_token


def get_all_users():
    return bson_to_json(users.find({}, {'password': 0}))


def get_user_by_id(user_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    return bson_to_json(users.find_one({'_id': user_id}, {'password': 0}))


def _get_user_password(user_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    result = bson_to_json(users.find_one({'_id': user_id}, {'password': 1, '_id': 0}))
    return result and result['password']


def get_user_by_name(username):
    return bson_to_json(users.find_one({'username': username}, {'password': 0}))


def create_user(firstname, lastname, username, password, roles):
    return json_util.dumps(users.insert_one({
        'firstname': firstname,
        'lastname': lastname,
        'username': username,
        'password': password,
        'roles': roles,
        'groups': []
    }).inserted_id)


def login(username, password):
    user = get_user_by_name(username)
    if user and _get_user_password(user['id']) == password:
        user['token'] = get_token(user)
        return jsonify(user), 201
    else:
        return jsonify({"error": "Invalid username or password"}), 403

def add_user_to_group(user_id, group_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    if not isinstance(group_id, ObjectId):
        group_id = ObjectId(group_id)
            
    return users.update_one({
        '_id': user_id
    }, {
        '$addToSet': {
            'groups': group_id
        }
    }).modified_count