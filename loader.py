import os
import importlib

PLUGINS_DIRECTORY = "./plugins"

plugin_dirs = os.listdir(PLUGINS_DIRECTORY)


def get_module_from_path(path):
    path = path.replace('..' + os.sep, '..')
    path = path.replace('.' + os.sep, '')
    return path.replace(os.sep, '.')


class Loader:
    def __getattr__(self, item):
        if item not in self.__dict__:
            module = get_module_from_path(os.path.join(PLUGINS_DIRECTORY, item, "index"))
            self.__dict__[item] = importlib.import_module(module, item)
            # TODO: Dependencies
        return self.__dict__[item]


la = Loader()
a = la.test.A()
print(a.moshe)
