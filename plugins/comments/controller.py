import datetime
from bson import ObjectId

from kirby.core.db import collection as comments, bson_to_json
from kirby.core import websocket

aggregation = [{
    '$lookup': {
        'from': 'users',
        'localField': 'author_id',
        'foreignField': '_id',
        'as': 'author'
    }
}, {
    '$unwind': '$author'
}, {
    '$project': {
        'author.password': 0
    }
}]


def get_by_context(context):
    return bson_to_json(
        list(
            comments.aggregate([{
                '$match': {
                    'context': context
                }
            }] + aggregation)))


def post_comment(context, message, author_id):
    if not isinstance(author_id, ObjectId):
        author_id = ObjectId(author_id)
    comment = {
        'context': context,
        'message': message,
        'author_id': author_id,
        'is_read': False,
        'post_date': datetime.datetime.utcnow()
    }
    result = bson_to_json(comments.insert_one(comment).inserted_id)
    websocket.emit(
        'comment', {
            'msg': 'comment posted',
            'id': result,
            'author_id': bson_to_json(author_id),
        })
    return result
