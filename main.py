from gevent.pywsgi import WSGIServer

from kirby.core.config import BUILTINS_DIRECTORY, PLUGINS_DIRECTORY, SERVER_ADDRESS
from kirby.core.private import loader as loader, router as router

if __name__ == '__main__':
    builtins = loader.Loader(BUILTINS_DIRECTORY)
    builtins.load_all()
    plugins = loader.Loader(PLUGINS_DIRECTORY)
    plugins.load_all()
    print('Serving on: %s' % str(SERVER_ADDRESS))
    WSGIServer((SERVER_ADDRESS['host'], SERVER_ADDRESS['port']), router.app).serve_forever()

"""
  <div *plugin="matrix"> asdasdasd </div>

"""
