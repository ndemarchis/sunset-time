import requests
import os
import json
import datetime
from dateutil.parser import parse

from scraper import Scrape

import csv

key = '8683a34629fe4031ba3f9d6c0e346d7a'
dictObj = {}

global TO_SCRAPE
TO_SCRAPE = 50

# specifies the output path for the data to be queried
outputFileName = "./data/data.json"

# loads the file if it exists
if os.path.exists(outputFileName):
    with open(outputFileName) as f:
        dictObj = json.load(f)


def getSunsetTime(lat: float, lon: float, date: str, row):
    # makes a single request to the API with an arbitrary image path
    dateObj = datetime.datetime.strptime(date, '%Y-%m-%d')
    r = requests.post(
        "https://api.sunrise-sunset.org/json?lat=" + str(lat) + "&lng=" + str(lon) + "&date=" + dateObj.strftime("%Y-%m-%d") + "&formatted=0"
    )
    # print(r.json())
    dictAdd(r.json(), row)

def oldGetWeather(lat: str, lon: str, inDate: datetime.datetime, row):
    # makes a single request to the API with an arbitrary image path
    dateObj = datetime.datetime.strptime(inDate, "%Y-%m-%dT%H:%M:%S%z")
    beginningDate = datetime.datetime.strftime(dateObj + datetime.timedelta(minutes=-30), '%Y-%m-%d:%H')
    endDate = datetime.datetime.strftime(dateObj + datetime.timedelta(minutes=30), '%Y-%m-%d:%H')

    print(dateObj, beginningDate, endDate)
    r = requests.post(
        "https://api.weatherbit.io/v2.0/forecast/hourly?lat=" + lat + "&lon=" + lon + "&start_date=" + beginningDate + "&end_date=" + endDate + "&key=" + key
    )
    dictObj[row['Name']]['weather'] = r.json()
    print(r.json())

def dictAdd(response, row):
    dictObj[row['Name']] = row
    dictObj[row['Name']]['sunset'] = response['results']
    print(dictObj[row['Name']])

def readCSV():
    with open('./data/supplementary_information.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        count = 0
        for row in reader:
            if ((count < TO_SCRAPE) and (row['Name'] not in dictObj.keys())):
                # getSunsetTime(row['lat'], row['lon'], row['Date'], row)
                time, out = Scrape.scrape(row['airport code'], row['Date'])
                if (time == None):
                    print("No data for: " + row['Name'])
                    continue
                dictObj[row['Name']] = row
                dictObj[row['Name']]['sunset'] = time.strftime("%H:%M:%S%z")
                dictObj[row['Name']]['weather'] = out
                count += 1
                print(" " + str(count) + " counted")

def weatherGetter():
    count = 0
    for key, value in dictObj.items():
        if ((count <= 2) and ('weather' not in dictObj[key].keys())):
            # oldGetWeather(value['lat'], value['lon'], value['sunset'], dictObj[key])
            # Scrape.scrape(value['airport code'], value['Date'])
            count += 1

readCSV()
weatherGetter()

with open(outputFileName, 'w') as fp:
    json.dump(dictObj, fp, indent=4)