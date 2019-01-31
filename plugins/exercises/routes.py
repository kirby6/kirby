import json
from flask import request

from kirby.core import web_api
from .controller import create_exercise, get_all_exercises


@web_api.route('/')
def get_all_exercises_route():
    return json.dumps(get_all_exercises())


@web_api.route('/', methods=['POST'])
def create_exercise_route():
    return create_exercise(
        name=request.form['name'],
        groups=request.form['groups'],
        module=request.form['module'],
        files=request.files.values()
    )
