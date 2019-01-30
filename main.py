from kirby.core.config import BUILTINS_DIRECTORY, PLUGINS_DIRECTORY, SERVER_ADDRESS
from kirby.core.private import loader as loader, router as router

if __name__ == '__main__':
    builtins = loader.Loader(BUILTINS_DIRECTORY)
    builtins.load_all()
    plugins = loader.Loader(PLUGINS_DIRECTORY)
    plugins.load_all()
    router.app.run(**SERVER_ADDRESS)



"""
  <div *plugin="matrix"> asdasdasd </div>

"""