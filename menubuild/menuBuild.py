#!/usr/bin/python3

import json
import pprint
import re
import jinja2
from collections import OrderedDict

def extractJsData(data, start, end):
    obj = data[data.find(start)+len(start)-1 : data.rfind(end)+1]
    obj = re.sub(r"//.*", "", obj)
    #pprint.pprint(obj)
    return json.loads(obj, object_pairs_hook=OrderedDict)


def loadLevelGroups():
  with open('../js/levels.js') as dataFile:
    data = dataFile.read()
    return extractJsData(data, 'tmGlob_levelsGroups={', '};//END_tmGlob_levelsGroups')
  
def getLangs():
  #lang_codes=[]
  lang_data={}
  alang=False
  with open('../js/Lang.js') as dataFile:
    while True:
      line=dataFile.readline()
      if not line:
        break
      if len(line)>=13 and line[:11]=="class Lang_":
        alang=line[11:13]
        lang_data[alang]={}
      
      m = re.match(" *this.([^=]*)=\"(.*)\";", line)
      if m:
        lang_data[alang][m.group(1)]=m.group(2)
      
  return lang_data


def writeIndex(levelsGroupsData, langsList):
  content = jinja2.Environment(loader=jinja2.FileSystemLoader('./')).get_template('template_index.html').render(levelGroupsData=levelGroupsData, langs=langsList)
  with open("../index.html",'w') as f: f.write(content)


def writeSubIndexes(levelsGroupsData, langsList):
  for gid in levelsGroupsData:
    if re.match(r"[^a-zA-Z0-9]", gid) is not None:
      raise NameError('disallowed caracter in level group name')
    content = jinja2.Environment(loader=jinja2.FileSystemLoader('./')).get_template('template_levelgroup.html').render(levelsList=levelsGroupsData[gid], grp=gid, langs=langsList)
    with open("../index_"+gid+".html",'w') as f: f.write(content)


levelGroupsData=loadLevelGroups()
langsData=getLangs()

writeIndex(levelGroupsData, langsData)
writeSubIndexes(levelGroupsData, langsData)

#94 46 22 81 nayuma


