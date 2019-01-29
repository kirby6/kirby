from kirby.core import web_api

a = 4


@web_api.route('/<int:age>', methods=['POST'])
def bla(age):
    return 'hello %d' % age
