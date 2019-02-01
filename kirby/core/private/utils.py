import inspect
import os

from ..config import PLUGIN_DIRECTORIES

plugin_dir_names = list(
    map(lambda plugin_dir: os.path.split(plugin_dir)[-1], PLUGIN_DIRECTORIES))


def get_calling_plugin_name():
    calling_module = inspect.getmodule(
        inspect.stack()[2][0]).__name__.split('.')
    plugin_dir_name = list(
        filter(lambda plugin_dir: plugin_dir in calling_module, plugin_dir_names))[0]
    calling_module = calling_module[calling_module.index(plugin_dir_name) + 1]
    return calling_module
