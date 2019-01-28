import os
import importlib

PLUGINS_DIRECTORY = "./plugins"

plugin_dirs = os.listdir(PLUGINS_DIRECTORY)


def get_module_from_path(path):
    path = path.replace('..' + os.sep, '..')
    path = path.replace('.' + os.sep, '')
    return path.replace(os.sep, '.')


class Loader:
    def __init__(self, plugins_dir):
        self.plugins_dir = plugins_dir

    def __getattr__(self, item):
        if item not in self.__dict__:
            module = get_module_from_path(os.path.join(self.plugins_dir, item, "index"))
            self.__dict__[item] = importlib.import_module(module, item)
            # TODO: Dependencies
        return self.__dict__[item]


la = Loader(PLUGINS_DIRECTORY)
a = la.test.A()
print(a.moshe)
