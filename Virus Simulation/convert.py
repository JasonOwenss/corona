import json
f = open("data.txt","r")
f1 = f.readlines()
f.close()
x = f1[0].strip()
keys = x.split()
count = 0
wrapper = []
for line in f1[1:]:
    if count < 5:
        count = count + 1
    else:
        count = 0
    adict = {}
    x = line.strip()
    vals = x.split()
    for i in range(5):
        adict[keys[i]] = int(vals[i])
    wrapper.append(adict)


with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(wrapper, f, ensure_ascii=False, indent=4)
    

