import pandas as pd
import csv
import json

def flattenjson(b, delim):
    val = {}
    for i in b.keys():
        if isinstance(b[i], dict):
            get = flattenjson(b[i], delim)
            for j in get.keys():
                val[i + delim + j] = get[j]
        else:
            val[i] = b[i]
            
    return val

# df = pd.read_json("./data/data.json")
# flat = flattenjson(df, ',')
# df.to_csv("./data/data.csv", index=False)

# fname = "./data/data2.csv"

# input = map(lambda x: flattenjson( x, "," ), input)

# columns = [x for row in input for x in row.keys()]
# columns = list(set(columns))

# with open(fname, 'wb') as out_file:
#     csv_w = csv.writer(out_file)
#     csv_w.writerow(columns)

#     for i_r in input:
#         csv_w.writerow(map(lambda x: i_r.get(x, ""), columns))

# read in data.json to a dict
with open("./data/data.json", "r") as f:
    data = json.load(f)

data2 = {}

# flatten the dict
for j in data.keys():
    data2[j] = flattenjson(data[j], ",")

pd.DataFrame(data2).to_csv('./data/data4.csv', index=False)