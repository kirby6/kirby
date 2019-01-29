from flask import request

from kirby.builtins.auth import required_roles
from kirby.core import web_api
from .users import create_user, get_all_users, get_user_by_id


@web_api.route('/')
@required_roles('admin')
def get_users_route():
    return get_all_users()


@web_api.route('/', methods=['POST'])
def create_user_route():
    create_user(request.json['username'], request.json['password'], request.json['roles'])


@web_api.route('/<string:user_id>')
def get_user_by_id_route(user_id):
    return get_user_by_id(user_id)
