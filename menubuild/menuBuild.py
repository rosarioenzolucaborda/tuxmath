#!/usr/bin/python3

import json
import pprint

with open('../js/levels.js') as dataFile:
    data = dataFile.read()
    obj = data[data.find('let tmGlob_levelsSettings={') : data.rfind('}')+1]
    jsonObj = json.loads(obj)
    
pprint.pprint(jsonObj)

