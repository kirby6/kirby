import json
from bson import json_util
from pymongo import MongoClient
from pymongo.collection import Collection

import kirby.core.config as config
from kirby.core.private.utils import get_calling_plugin_name

_db = MongoClient(**config.DB_CONNECTION).get_database(config.DB_NAME)


def bson_to_json(data):
    return json.loads(json_util.dumps(data))


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
