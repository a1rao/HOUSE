# HOUSE - Housing Off-Campus University Students Everywhere

The purpose of this web app is to help college students find housing.  Consolidating information and deciding where to live can be a hassle— HOUSE aims to facilitate the process by providing an easy way to save listings and make comparisons. Users can create an account and consequently login, retrieve password, and logout.  The main functionality of the app begins with a web scrape: the user inputs a housing listing link to the main scrape bar.  HOUSE then pulls up a “listing card”, which displays concise information about the listing.  Such information includes listing image, price, address, distance to campus, number of bedrooms, number of bathrooms, square footage, listing type, and nearby stores.  The user can save listings in folders as well as add them to the “comparison table”, which allows users to view multiple listings side by side to compare information.  Users can access their folders to view saved listings, as well as sort the listings in the folders by price, distance, and number of bedrooms.

*Test credentials:*

Email:  housetesting2222@gmail.com;
Password: housetesting2 

Alternatively, register with personal name and email and password.

*Requirements:*

If running on a local server, please install Node and NPM and execute the following before starting the server:
    
    npm install cheerio firebase react bootstrap react-bootstrap

If using web domain, no requirements.

Website runs best on Chrome web browser.

*Installation Instruction:*

If running on a local server, execute the following:
    
    git clone https://github.com/a1rao/HOUSE.git
    
If using web domain, no installation needed.

*How to Run:*

If running on a local server, execute the following:
    
    cd HOUSE/react-firebase
    npm start

*Known Bugs:*

Sometimes, the background image for the home page may not display on some machines.

If you press enter while in a field on any page except Login, Register, or Forgot Password, the page will reload and all progress will be lost.

Currently, all users default to having UCSD as their campus. Entering another value during registration will save that different value; but any map scraping will be done with reference to UCSD.

When an account is deleted in the database, that email is no longer usable; a new account cannot use that email, and attempting to login will cause the site to crash.

If an invalid URL is passed, garbage information is displayed.  