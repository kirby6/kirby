import json
from flask import request

from kirby.core import web_api
from .controller import create_module, get_all_modules, get_module_by_name, \
    add_activity


@web_api.route('/')
def get_modules_route():
    return json.dumps(get_all_modules())


@web_api.route('/<string:module_name>')
def get_module_by_name_route(module_name):
    return json.dumps(get_module_by_name(module_name))


@web_api.route('/', methods=['POST'])
def create_module_route():
    return create_module(request.json['name'], request.json.get('parent'))


@web_api.route('/<string:module_id>', methods=['POST'])
def add_activity_route(module_id):
    add_activity(module_id, request.json['activity_id'])
    return ''