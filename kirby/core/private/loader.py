import importlib
import os

_loaded_plugins = set()


def get_module_from_path(path):
    path = path.replace('..' + os.sep, '..')
    path = path.replace('.' + os.sep, '')
    return path.replace(os.sep, '.')


class Loader:
    def __init__(self, plugins_dir):
        self.plugins_dir = plugins_dir

    def __getattr__(self, item):
        if item not in self.__dict__:
            _loaded_plugins.add(item)
            module_path = get_module_from_path(os.path.join(self.plugins_dir, item))
            module = importlib.import_module(module_path, item)
            self.__dict__[item] = module
        return self.__dict__[item]

    def load_all(self):
        for plugin in os.listdir(self.plugins_dir):
            getattr(self, plugin)
