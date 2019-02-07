from kirby.core import filesystem
from kirby.core.db import collection as exercises
from bson import ObjectId


def add_files_to_filesystem(files):
    file_ids = []
    for file in files:
        file_ids.append(filesystem.put(**file))
    return file_ids


def remove_files_from_filesystem(files):
    for file in files:
        filesystem.delete(file['_id'])


def get_exercise_by_id(exercise_id):
    if not isinstance(exercise_id, ObjectId):
        exercise_id = ObjectId(exercise_id)
    return exercises.find_one({'_id': exercise_id})


def get_all_exercises_from_db():
    return exercises.find()


def get_file_by_id(file_id):
    return filesystem.get(file_id)


def get_metadata_by_id(file_id):
    return filesystem.get_file_metadata(file_id)


def insert_exercise_to_db(exercise):
    return exercises.insert_one(exercise).inserted_id


def delete_exercise_from_db(exercise_id):
    if not isinstance(exercise_id, ObjectId):
        exercise_id = ObjectId(exercise_id)
    exercises.delete_one({'_id': exercise_id})
