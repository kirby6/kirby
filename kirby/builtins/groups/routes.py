import json
from flask import request

from kirby.builtins.auth import required_roles
from kirby.core import web_api
from .groups import create_group, get_all_groups, get_group_by_name, get_group_children


@web_api.route('/')
def get_groups_route():
    return json.dumps(get_all_groups())


@web_api.route('/<string:group_name>')
def get_group_by_name_route(group_name):
    return json.dumps(get_group_by_name(group_name))


@web_api.route('/children')
def get_groups_children_route():
    parent_group = request.args.get('parent')
    return json.dumps(get_group_children(parent_group))


@web_api.route('/', methods=['POST'])
@required_roles('admin')
def create_group_route():
    return create_group(request.json['name'], request.json.get('parent'))
