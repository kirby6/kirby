from gevent.pywsgi import WSGIServer

from kirby.core.config import PLUGIN_DIRECTORIES, SERVER_ADDRESS
from kirby.core.private import loader as loader, router as router

if __name__ == '__main__':
    for plugin_dir in PLUGIN_DIRECTORIES:
        loader.Loader(plugin_dir).load_all()
    print('Serving on: %s' % str(SERVER_ADDRESS))
    WSGIServer((SERVER_ADDRESS['host'], SERVER_ADDRESS['port']),
               router.app).serve_forever()
