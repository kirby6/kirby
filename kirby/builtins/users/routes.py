import json
from flask import request

from kirby.builtins.auth import required_roles
from kirby.core import web_api
from .controller import create_user, get_all_users, get_user_by_id, login, add_user_to_group


@web_api.route('/')
@required_roles('admin')
def get_users_route():
    return json.dumps(get_all_users())


@web_api.route('/', methods=['POST'])
def create_user_route():
    return create_user(request.json['firstname'],
                       request.json['lastname'],
                       request.json['username'],
                       request.json['password'],
                       request.json['roles'])


@web_api.route('/<string:user_id>')
def get_user_by_id_route(user_id):
    return json.dumps(get_user_by_id(user_id))


@web_api.route('/login', methods=['POST'])
def login_route():
    return login(request.json['username'], request.json['password'])


@web_api.route('/group', methods=['POST'])
def add_user_to_group_route():
    return add_user_to_group(request.json['user_id'], request.json['group_id'])
