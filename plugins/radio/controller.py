from kirby.core.db import bson_to_json, collection as radio
from bson import json_util, ObjectId


def get_all_stations():
    return bson_to_json(radio.find())


def get_station_by_name(station_name):
    return bson_to_json(radio.find({'name': station_name}))


def create_station(name, playlist):
    station_to_add = {
        'name': playlist
    }
    return json_util.dumps(radio.insert_one(station_to_add).inserted_id)
