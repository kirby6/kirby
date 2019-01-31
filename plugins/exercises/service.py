from kirby.core import filesystem
from kirby.core.db import collection as exercises


def add_files_to_filesystem(files):
    file_ids = []
    for file in files:
        file_ids.append(filesystem.put(**file))
    return file_ids


def get_all_exercises_from_db():
    return exercises.find()


def insert_exercise_to_db(exercise):
    return exercises.insert_one(exercise).inserted_id
