import requests
import os
import json
from datetime import datetime

import csv

dictObj = {}

# specifies the output path for the data to be queried
outputFileName = "./data/data.json"

# loads the file if it exists
if os.path.exists(outputFileName):
    with open(outputFileName) as f:
        dictObj = json.load(f)


def getSunsetTime(lat: float, lon: float, date: str, row):
    # makes a single request to the API with an arbitrary image path
    dateObj = datetime.strptime(date, '%Y-%m-%d')
    r = requests.post(
        "https://api.sunrise-sunset.org/json?lat=" + str(lat) + "&lng=" + str(lon) + "&date=" + dateObj.strftime("%Y-%m-%d") + "&formatted=0"
    )
    # print(r.json())
    dictAdd(r.json(), row)

def getWeather(lat: float, lon: float, datetime: datetime):
    # makes a single request to the API with an arbitrary image path
    r = requests.post(
        "https://api.weatherbit.io/v2.0/forecast/hourly?lat=" + city + "&lon=" + lon + "&start_date=" + datetime.date() + "&end_date=" + datetime.date()
    )
    print(r.json())

def dictAdd(response, row):
    dictObj[row['Name']] = row
    dictObj[row['Name']]['sunset'] = response['results']['sunset']
    print(dictObj[row['Name']])

def readCSV():
    with open('./data/supplementary_information.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        count = 0
        for row in reader:
            if ((count <= 2) and row['Name'] not in dictObj.keys()):
                getSunsetTime(row['lat'], row['lon'], row['Date'], row)
                count += 1

readCSV()


# getSunsetTime(float("40.7128"), float("-74.0059"), "2015-11-01")

with open(outputFileName, 'w') as fp:
    json.dump(dictObj, fp, indent=4)