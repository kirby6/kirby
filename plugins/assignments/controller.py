from . import statuses
from kirby.core.db import collection as assignments, bson_to_json
from bson import ObjectId
import pymongo


def assign_to_user(user_id, activity_id):
    if not isinstance(user_id, ObjectId):
        user_id = ObjectId(user_id)
    if not isinstance(activity_id, ObjectId):
        activity_id = ObjectId(activity_id)
    assignment = {
        'user_id': user_id,
        'activity_id': activity_id,
        'status': statuses.OPENED,
        'redoCount': 0
    }
    index_name = 'user_activity_index'
    if index_name not in assignments.index_information():
        assignments.create_index([('user_id', pymongo.ASCENDING),
                                  ('activity_id', pymongo.ASCENDING)],
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


def update_redo_count(assignment_id, new_redo_count):
    if new_redo_count < 0:
        raise Exception('Invalid redo count, must be large than zero')
    if not isinstance(assignment_id, ObjectId):
        assignment_id = ObjectId(assignment_id)
    return assignments.update_one({
        '_id': assignment_id
    }, {
        '$set': {
            'redo_count': new_redo_count
        }
    }).modified_count


def get_user_assignments(user_id=None):
    aggregation = [
        {
            '$lookup': {
                'from': 'activities',
                'localField': 'activity_id',
                'foreignField': '_id',
                'as': 'activity'
            }
        },
        {
            '$unwind': '$activity'
        },
        {
            '$lookup': {
                'from': 'modules',
                'localField': 'activity_id',
                'foreignField': 'activities',
                'as': 'modules'
            }
        },
        {
            '$graphLookup': {
                'from': 'modules',
                'startWith': '$modules._id',
                'connectFromField': 'parent',
                'connectToField': '_id',
                'as': 'modules'
            }
        },
        {
            '$lookup': {
                'from': 'users',
                'localField': 'user_id',
                'foreignField': '_id',
                'as': 'user'
            }
        },
        {
            '$unwind': '$user'
        },
    ]
    if user_id:
        if not isinstance(user_id, ObjectId):
            user_id = ObjectId(user_id)
        aggregation.append({'$match': {'user_id': user_id}})
    return bson_to_json(list(assignments.aggregate(aggregation)))


def get_by_id(assignment_id):
    if not isinstance(assignment_id, ObjectId):
        assignment_id = ObjectId(assignment_id)
    return next(
        iter(
            bson_to_json(
                assignments.aggregate([{
                    '$match': {
                        '_id': assignment_id
                    }
                },
                    {
                    '$lookup': {
                        'from': 'activities',
                        'localField': 'activity_id',
                        'foreignField': '_id',
                        'as': 'activity'
                    }
                }, {
                    '$unwind': '$activity'
                }]))), None)
