import json
from flask import request

from kirby.core import web_api
from .controller import get_all_stations, get_station_by_name, create_station

@web_api.route('/')
def get_stations_route():
    return json.dumps(get_all_stations())


@web_api.route('/<string:station_name>')
def get_station_by_id_route(station_name):
    return json.dumps(get_station_by_name(station_name))

@web_api.route('/', methods=['POST'])
def create_station_route():
    return create_station(request.json['name'], request.json.get('playlist'))
