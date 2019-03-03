import json
from bson import json_util, ObjectId
from pymongo import MongoClient
from pymongo.collection import Collection

import kirby.core.config as config
from kirby.core.private.utils import get_calling_plugin_name

_db = MongoClient(**config.DB_CONNECTION).get_database(config.DB_NAME)


def _replace_object_id_with_string(bson_data):
    if isinstance(bson_data, ObjectId):
        return str(bson_data)
    if isinstance(bson_data, list):
        return list(map(_replace_object_id_with_string, bson_data))
    if isinstance(bson_data, dict):
        return {('id' if k == '_id' else k): _replace_object_id_with_string(v)
                for k, v in bson_data.items()}
    return bson_data


def bson_to_json(data):
    data = _replace_object_id_with_string(data)
    return json.loads(json_util.dumps(data))


def json_to_bson(data):
    return json_util.loads(json.dumps(data))


class _Collection:
    def __getattr__(self, item):
        plugin_name = get_calling_plugin_name()
        plugin_collection = _db.get_collection(plugin_name)
        return getattr(plugin_collection, item)


collection = _Collection()
try:
    assert isinstance(collection, Collection)
except:
    pass
