import json

from kirby.core import web_api
from .controller import get_all_websites


@web_api.route('/')
def get_websites_route():
    return json.dumps(get_all_websites())
