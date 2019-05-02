##
# Author: Niyonika Sheth
# Date: 5/1/19
#
# Program that scrapes data from Zumper listings
##

import requests
from bs4 import BeautifulSoup
import pandas as pd

# Get source code
r = requests.get('https://www.zumper.com/apartments-for-rent/32627116/2-bedroom-la-jolla-village-san-diego-ca')

soup = BeautifulSoup(r.text, 'html.parser')
results1 = soup.find_all('h1', attrs={ 'class':'H1_h1__2Wn9m' })
results2 = soup.find_all('div', attrs={'class':'SummaryIcon_summaryText__3xLpj'})
results3 = soup.find_all('div', attrs={ 'class':'MessageSummary_priceText__3c6sQ'})
results4 = soup.find_all('title')

# Get title
title = results1[0].text

# Get bedrooms and bathrooms
beds = results2[0].text #[0:-4]
bath = results2[1].text #[0:-9]

# Get price
price = results3[0].contents[0].text

#Get description
description = results4[0].text[0:-8]

# Create dataset
records = []
records.append((title, price, beds, bath, description))

print(records)

data = pd.DataFrame(records, columns=['Name', 'Price', 'Number of beds', 'Number of bathrooms', 'Description'])
#data.to_csv('zumper_scrape', index=False, encoding='utf-8')
