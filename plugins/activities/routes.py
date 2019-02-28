import json
from flask import request

from kirby.core import web_api
from .controller import create_activity, get_all_activities, update_activity, \
    delete_activity


@web_api.route('/')
def get_all_activities_route():
    return json.dumps(get_all_activities())


@web_api.route('/', methods=['POST'])
def create_activity_route():
    return create_activity(
        name=request.form['name'], files=request.files.values())


@web_api.route('/<string:activity_id>', methods=['PUT'])
def update_activity_route(activity_id):
    update_activity(activity_id, request.form, request.files.values())
    return 'ok', 200


@web_api.route('/<string:activity_id>', methods=['DELETE'])
def delete_activity_route(activity_id):
    delete_activity(activity_id)
    return 'ok', 200
