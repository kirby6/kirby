from kirby.core.db import bson_to_json, collection as radio
from bson import json_util, ObjectId


def get_all_stations():
    return bson_to_json(list(radio.find()))


def get_station_by_name(station_name):
    if not isinstance(station_name, ObjectId):
        station_name = ObjectId(station_name)
    return bson_to_json(radio.find({'_id': station_name}))


def create_station(name, playlist):
    station_to_add = {
        '_id': name,
        'playlist': playlist
    }
    return json_util.dumps(radio.insert_one(station_to_add).inserted_id)
