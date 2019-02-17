from . import statuses
from kirby.core.db import collection as assignments, bson_to_json
from bson import ObjectId
import pymongo


def assign_to_user(user_id, exercise_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    if not isinstance(exercise_id, ObjectId):
        exercise_id = ObjectId(exercise_id)
    assignment = {
        'user_id': user_id,
        'exercise_id': exercise_id,
        'status': statuses.OPENED
    }
    index_name = 'user_exercise_index'
    if index_name not in assignments.index_information():
        assignments.create_index([('user_id', pymongo.ASCENDING),
                                  ('exercise_id', pymongo.ASCENDING)],
                                 unique=True,
                                 name=index_name)
    return bson_to_json(assignments.insert(assignment))


def update_status(assignment_id, status):
    valid_statuses = [
        statuses.__dict__[s] for s in dir(statuses) if not s.startswith("__")
    ]
    if status not in valid_statuses:
        raise Exception('Invalid status')
    if not isinstance(assignment_id, ObjectId):
        assignment_id = ObjectId(assignment_id)
    return assignments.update_one({
        '_id': assignment_id
    }, {
        '$set': {
            'status': status
        }
    }).modified_count


def get_user_assignments(user_id=None):
    aggregation = [{
        '$lookup': {
            'from': 'exercises',
            'localField': 'exercise_id',
            'foreignField': '_id',
            'as': 'exercise'
        }
    }]
    if user_id:
        if not isinstance(user_id, ObjectId):
            user_id = ObjectId(user_id)
        aggregation.append({'$match': {'user_id': user_id}})
    return bson_to_json(list(assignments.aggregate(aggregation)))
