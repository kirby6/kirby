import json
from flask import request

from kirby.core import web_api
from .controller import assign_to_user, update_status, get_user_assignments, update_redo_count


@web_api.route('/', methods=['POST'])
def assign_to_user_route():
    activity_id = request.json['activity_id']
    user_id = request.json['user_id']
    return json.dumps(
        assign_to_user(user_id=user_id, activity_id=activity_id)), 201


@web_api.route('/<string:assignment_id>', methods=['PATCH'])
def update_status_route(assignment_id):
    update_status(assignment_id, status=request.json['status'])
    return '', 204


@web_api.route('/<string:assignment_id>/redo', methods=['PATCH'])
def update_redo_count_route(assignment_id):
    update_redo_count(assignment_id, new_redo_count=request.json['redo_count'])
    return '', 204


@web_api.route('/')
def get_user_assignments_route():
    return json.dumps(get_user_assignments(request.args.get('user_id'))), 200
