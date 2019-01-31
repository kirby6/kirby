import json

from kirby.core import web_api
from .controller import get_all_exercises


@web_api.route('/')
def get_all_exercises_route():
    return json.dumps(get_all_exercises())
