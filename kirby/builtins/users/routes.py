from kirby.core import flask_app
from kirby.core import db
from bson.json_util import ObjectId
from bson import json_util
from flask import request
import json

users = db.get_collection('users')


@flask_app.route('/')
def get_users():
    return json_util.dumps(users.find())


@flask_app.route('/', methods=['POST'])
def create_user():
    request_data = json.loads(request.data)
    return json_util.dumps(users.insert_one({
        'name': request_data['name'],
        'age': request_data['age'],
    }).inserted_id)


@flask_app.route('/<string:user_id>')
def get_user_by_id(user_id):
    return json_util.dumps(users.find_one({'_id': ObjectId(user_id)}))
