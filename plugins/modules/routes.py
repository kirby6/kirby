import json
from flask import request

from kirby.builtins.auth import required_roles
from kirby.core import web_api
from .controller import create_module, get_all_modules, get_module_by_name


@web_api.route('/')
def get_modules_route():
    return json.dumps(get_all_modules())


@web_api.route('/<string:module_name>')
def get_module_by_name_route(module_name):
    return json.dumps(get_module_by_name(module_name))


@web_api.route('/', methods=['POST'])
@required_roles('admin')
def create_module_route():
    return create_module(request.json['name'], request.json.get('parent'),
                         request.json.get('parent'))
