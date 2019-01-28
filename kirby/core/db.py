from pymongo import MongoClient
import kirby.core.config as config

db = MongoClient(**config.DB_CONNECTION).get_database(config.DB_NAME)
