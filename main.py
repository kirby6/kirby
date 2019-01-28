from core.private import loader as loader
from core.private import router as router

PLUGINS_DIRECTORY = "./plugins"

if __name__ == '__main__':
    la = loader.Loader(PLUGINS_DIRECTORY)
    la.test
    la.test2
    router.app.run('0.0.0.0', 5000)
