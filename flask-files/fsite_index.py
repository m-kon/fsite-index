# -*- coding: utf-8 -*-
"""module create input data for fsite-index

read folders names from ./dist
all but not 'static' are projects names
and contain 'links' file with lines like
  <place-name> - <link-to place>
"""

import os

path = os.getcwd()
projects_dir = 'dist'
not_project = ['static']


def projects_names(directory=projects_dir, not_projects=not_project):
    """get folders names from projects dir exclude 'static'

    return array of names"""
    names = []
    try:
        for name in os.listdir(directory):
            if name not in not_projects:
                names.append(name)
        return names
    except FileNotFoundError:
        print("Мы в {}".format(path))
        print("Возможно, это не нужное место.")
        print("Вокруг должны быть папка static и директории с именами проектов.")
        return names

def collect_data(names, directory=projects_dir):
    import json

    data = {}

    for i in range(len(names)):
        try:
            with open('{}/{}/d.json'.format(directory, names[i])) as f:
                d = json.load(f)
            data[i] = d
        except FileNotFoundError:
            print('В {} нет d.json'.format(names[i]))

    return data


if __name__ == "__main__":
    print(collect_data(projects_names()))
