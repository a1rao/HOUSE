from bs4 import BeautifulSoup
import requests

url = 'https://sandiego.craigslist.org/csd/apa/d/la-jolla-regents-lajolla/6873740447.html'

page_response = requests.get(url, timeout=5)
page_content = BeautifulSoup(page_response.content, "html.parser")

textContent = []
price = page_content.find('span', attrs={'class':'price'}).text
bedbath = page_content.find('span', attrs={'class':'housing'}).text
address = page_content.find('div', attrs={'class':'mapaddress'}).text


print(str(address) + ': ' + str(bedbath) + ' at ' + str(price)) 
