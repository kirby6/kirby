from flask import jsonify, request
from flask_jwt_extended import JWTManager, create_access_token

from kirby.builtins.users import get_user_by_id, get_user_by_name
from kirby.core import web_api
from kirby.core.private.router import app

app.config['JWT_SECRET_KEY'] = 'super-secret'  # TODO: Change this!
jwt = JWTManager(app)


@jwt.user_claims_loader
def add_claims_to_access_token(user_id):
    return {
        'roles': get_user_by_id(user_id)['roles']
    }


@web_api.route('/', methods=['POST'])
def get_token():
    username = request.json.get('username')
    password = request.json.get('password')
    user = get_user_by_name(username)
    if not user or user['password'] != password:
        return jsonify({"error": "Bad username or password"}), 401
    access_token = create_access_token(identity=user['_id']['$oid'])
    return jsonify(access_token=access_token), 200
