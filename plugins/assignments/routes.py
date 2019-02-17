from flask import request, jsonify

from kirby.core import web_api
from .controller import assign_to_user, update_status, get_user_assignments


@web_api.route('/', methods=['POST'])
def assign_to_user_route():
    exercise_id = request.json['exercise_id']
    user_id = request.json['user_id']
    return jsonify(assign_to_user(user_id=user_id,
                                  exercise_id=exercise_id)), 201


@web_api.route('/<string:assignment_id>', methods=['PUT'])
def update_status_route(assignment_id):
    return jsonify(
        update_status(assignment_id, status=request.args['status'])), 204


@web_api.route('/')
def get_user_assignments_route():
    return jsonify(get_user_assignments(request.args['user_id'])), 200
