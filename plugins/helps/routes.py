import json
from flask import request

from kirby.core import web_api
from kirby.builtins.auth import required_roles, get_current_user_id
from .controller import get_all, get_by_id, create_help, get_by_sender, \
    change_state


@web_api.route('/')
@required_roles('admin')
def get_all_route():
    return json.dumps(get_all()), 200


@web_api.route('/sent')
@required_roles()
def get_sent_helps_route():
    return json.dumps(get_by_sender(get_current_user_id()['id'])), 200


@web_api.route('/<string:help_id>')
def get_help_by_id_route(help_id):
    return json.dumps(get_by_id(help_id))


@web_api.route('/', methods=['POST'])
def create_help_route():
    return json.dumps(create_help(**request.json)), 201


@web_api.route('/<string:help_id>', methods=['PATCH'])
def change_state_route(help_id):
    change_state(help_id, **request.json)
    return 'ok', 200
