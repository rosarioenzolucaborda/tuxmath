#!/usr/bin/python3

import json
import pprint
import re
import jinja2
from collections import OrderedDict

def loadLevelGroups():
  with open('../js/levels.js') as dataFile:
    data = dataFile.read()
    obj = data[data.find('tmGlob_levelsGroups={')+20 : data.rfind('}//END_tmGlob_levelsGroups')+1]
    obj = re.sub(r"//.*", "", obj)
    #pprint.pprint(obj)
    return json.loads(obj, object_pairs_hook=OrderedDict)


def writeIndex(levelsGroupsData):
  content = jinja2.Environment(loader=jinja2.FileSystemLoader('./')).get_template('template_index.html').render(levelGroupsData=levelGroupsData)
  with open("../index.html",'w') as f: f.write(content)


def writeSubIndexes(levelsGroupsData):
  for gid in levelsGroupsData:
    if re.match(r"[^a-zA-Z0-9]", gid) is not None:
      raise NameError('disallowed caracter in level group name')
    content = jinja2.Environment(loader=jinja2.FileSystemLoader('./')).get_template('template_levelgroup.html').render(levelsList=levelsGroupsData[gid], grp=gid)
    with open("../index_"+gid+".html",'w') as f: f.write(content)


levelGroupsData=loadLevelGroups()
writeIndex(levelGroupsData)
writeSubIndexes(levelGroupsData)

#94 46 22 81 nayuma


