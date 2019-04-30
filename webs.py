##
# Date: 30 Apr 2019
# Author: Vie Ong
#
# This file contains the code to scrape housing information when given a url 
# from apartments.com.
# 
# Information still needs to be scraped: 
# - Type of Units available
# - Address
# - Name of property
#
# Current information scraped includes:
#   1. Expenses to be paid (monthly fees and one-time fees)
#       - Both fees are stored in an array named "expenses" with each element 
#       formatted as (fee type, fee name, fee cost)
#
#   2. Unique features of the listing
#       - The features are stored in an array named "uf" with each element 
#       being the feature
#
#   3. Pet policy
#       - Pet policies are store in an array named "pet" with each element
#       formatted as (pet_type_allowed, description, pet_deposit)
#       - pet_deposit is an array of deposits needed to pay under the pet
#       policy
#
#   4. Parking information
#       - Stored in an array named "park" with each element formatted as
#       (parking_service_provided, description)
#
#   5. Property Information
#       - Stored in an array named "property_information" with each element 
#       as each information
#
#   6. Extra features featured on the listing page
#       - Extra features include but not limited to Services, Interior,
#       Outdoor Space, Fitness &amp;Recreation, Student Features, Kitchen,
#       Features, Living Space
#       - All extra features are stored in an array named "extras" with each
#       element representing one feature. Each element/feature has the format
#       (feature_title, feature_lists)
#       - feature_lists is an array of string listing out the features
#
#   7. Office Hour
#       - Stored in an array named "off_hr" with each element formatted as
#       (day, hours)
###
from bs4 import BeautifulSoup
import requests
import pandas as pd
import re

# Scrapping details (User agent needed for certain server)
headers = {'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'}
# URL name
url = 'https://www.apartments.com/la-regencia-san-diego-ca/2l067qb/'

# Get source and soup
src = requests.get(url, headers=headers)
soup = BeautifulSoup(src.text, 'html.parser')



#1. Find fees (monthly and one-time)
monthly_fees = soup.find('div', attrs = {'class':'monthlyFees'})
oneTime_fees = soup.find('div', attrs = {'class':'oneTimeFees'})

# Get description
fees = monthly_fees.find_all('div', attrs = {'class':'descriptionWrapper'})
ot_fees = oneTime_fees.find_all('div', attrs = {'class':'descriptionWrapper'})

# Array to store expenses
expenses = []

# Extract monthly fees information
for i in fees:
    descriptions = i.find_all('span')
    fee_name = descriptions[0].text
    fee_cost = descriptions[1].text
    expenses.append(('Recurring', fee_name, fee_cost))

# Extract one-time fees information
for i in ot_fees:
    descriptions = i.find_all('span')
    fee_name = descriptions[0].text
    fee_cost = descriptions[1].text
    expenses.append(('One-Time', fee_name, fee_cost))

#print(expenses)



#2. Get unique features
unique_features = soup.find('div', attrs = {'class':'specList js-spec'}).findAll('li')

# To strip unnecessary tags
remove_tag = re.compile('<.*?>')

# Store all unique features 
uf = []
for i in unique_features:
    uf.append(i.text[1:])

#print(uf)




#3. Get pet policy
pet_policy = soup.findAll('div', attrs={'class':'petPolicyDetails'})

# Array to store pet policies
pet = []

for i in pet_policy:
    # Get policy description
    #print(i)
    petstr = i.find('p').text.split('\r',1)
    petstr[0] = petstr[0].replace('\n', '')
    petstr[1] = petstr[1].replace('\n', '').strip()
    
    
    # Get fess
    petfees = i.findAll('li')
    petdeposit = []
    for k in petfees:
        petdeposit.append(k.text[1:])

    pet.append((petstr[0], petstr[1], petdeposit))
#print(pet)



#4. Parking
parking = soup.find('div', attrs={'class':'parkingDetails'})

parking_detail = parking.find('div', attrs={'class':'parkingTypeFeeContainer'}).text
parking_spaces = parking.find('p').text

park = []
park.append((parking_detail.strip(), parking_spaces.strip()))

#print(park)



#5. Property Information
property_feature = soup.find('div', attrs={'class':'specList propertyFeatures js-spec'}).findAll('li')
property_information = []

for i in property_feature:
    property_information.append(i.text[1:].strip())

#print(property_information)



#6. Extra features of the apartment
extra_info = soup.findAll('div', attrs={'class':'specList js-spec', 'data-shuffle-priority':'4'})
extras = []

# Find individual features 
for i in extra_info:
    title = i.find('h3').text
    listed = i.findAll('li')
    
    lists = []
    # Find the description of each feature
    for k in listed:
        lists.append(k.text[1:].strip())
    
    # Add feature and their desccription as an element in an array
    extras.append((title, lists))



#7. Office Hour
office_hr = soup.findAll('div', attrs={'class':'daysHoursContainer'})
off_hr = []

for i in office_hr:
    days = i.find('div', attrs={'class':'days'}).text.strip()
    hours = i.find('div', attrs={'class':'hours'}).text.strip()

    off_hr.append((days, hours))

print(off_hr)

# save as csv (commented out for now because infos will not be stored in database)
#df = pd.DataFrame(expenses, columns=['Rent Type', 'Fee Type', 'Cost'])
#df.to_csv('expenses.csv', index=False, encoding='utf-8')
