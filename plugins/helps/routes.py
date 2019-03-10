import json
from flask import request

from kirby.core import web_api
from .controller import get_all, get_by_id, create_help


@web_api.route('/')
def get_all_route():
    return json.dumps(get_all()), 200


@web_api.route('/<string:help_id>')
def get_help_by_id_route(help_id):
    return json.dumps(get_by_id(help_id))


@web_api.route('/', methods=['POST'])
def create_help_route():
    return json.dumps(create_help(**request.json)), 201
