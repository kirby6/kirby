import json
from kirby.core import web_api
from .controller import get_by_user


@web_api.route('/<string:user_id>')
def get_by_user_route(user_id):
    return json.dumps(get_by_user(user_id)), 200
