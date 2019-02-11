from kirby.core.db import bson_to_json, collection as websites


def get_all_websites():
    return bson_to_json(websites.find())
