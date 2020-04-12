import json
import sys

finaldict = {}
for file in sys.argv[1:]:

    f = open(file, "r")
    f1 = f.readlines()
    f.close()
    x = f1[0].strip()
    keys = x.split()
    wrapper = []

    for line in f1[1:]:
        adict = {}
        x = line.strip()
        vals = x.split()
        for i in range(5):
            adict[keys[i]] = int(vals[i])
        wrapper.append(adict)
    
    key = file[:-4]
    finaldict[key] = wrapper

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(finaldict, f, ensure_ascii=False, indent=4)
    

