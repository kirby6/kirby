from kirby.builtins.auth import get_current_user_id
from kirby.builtins.users import get_user_by_id
from kirby.core import web_api

a = 4


@web_api.route('/<int:age>', methods=['GET'])
def bla(age):
    return 'hello %s, you are %d years old' % (get_user_by_id(get_current_user_id())['username'], age)
