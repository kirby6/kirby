from kirby.core import flask_app
from kirby.core import db
from bson.json_util import ObjectId
from bson import json_util

users = db.get_collection('users')


@flask_app.route('/<string:user_id>')
def get_user_by_id(user_id):
    return json_util.dumps(users.find_one({'_id': ObjectId(user_id)}))
