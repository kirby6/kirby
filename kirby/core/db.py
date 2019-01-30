import inspect
from pymongo import MongoClient

import kirby.core.config as config
from kirby.core.private.utils import get_calling_plugin_name

_db = MongoClient(**config.DB_CONNECTION).get_database(config.DB_NAME)


class _Collection:
    def __getattr__(self, item):
        plugin_name = get_calling_plugin_name(inspect.stack())
        plugin_collection = _db.get_collection(plugin_name)
        return getattr(plugin_collection, item)


collection = _Collection()
