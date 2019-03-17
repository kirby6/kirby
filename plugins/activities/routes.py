import json
from flask import request, make_response

from kirby.core import web_api
from .controller import create_activity, get_all_activities, update_activity, \
    delete_activity, get_activity_file_by_id, get_submissions


@web_api.route('/')
def get_all_activities_route():
    return json.dumps(get_all_activities())


@web_api.route('/', methods=['POST'])
def create_activity_route():
    return json.dumps(
        create_activity(
            name=request.form['name'],
            submissions=json.loads(request.form.get('submissions')),
            files=request.files.values()))


@web_api.route('/<string:activity_id>', methods=['PUT'])
def update_activity_route(activity_id):
    update_activity(activity_id, request.form, request.files.values())
    return 'ok', 200


@web_api.route('/<string:activity_id>', methods=['DELETE'])
def delete_activity_route(activity_id):
    delete_activity(activity_id)
    return 'ok', 200


@web_api.route('/<string:activity_id>/files/<string:file_id>', methods=['GET'])
def get_activity_file_by_id_route(activity_id, file_id):
    response = make_response(
        get_activity_file_by_id(activity_id, file_id).read())
    response.mimetype = 'application/octet-stream'
    return response


@web_api.route('/submissions')
def get_available_submissions():
    return json.dumps(get_submissions())
