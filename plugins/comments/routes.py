import json
from flask import request

from kirby.core import web_api
from .controller import get_by_context, post_comment


@web_api.route('/', methods=['PUT'])
def get_by_context_route():
    return json.dumps(get_by_context(request.json)), 200


@web_api.route('/', methods=['POST'])
def post_comment_route():
    return json.dumps(post_comment(**request.json)), 201
