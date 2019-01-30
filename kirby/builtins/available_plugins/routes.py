import json

from kirby.core import web_api
from .controller import get_all_available_plugins


@web_api.route('/')
def get_available_plugins_route():
    return json.dumps(get_all_available_plugins())
