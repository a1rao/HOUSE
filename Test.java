import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.*;

import org.json.*;
import org.jsoup.Jsoup;
import org.jsoup.*;
import org.jsoup.nodes.*;
import org.jsoup.select.Elements;

/**
 * This class is used for HTML parsing from URL using Jsoup.
 * @author Andrew Schwartz
 */
public class Test {
	public static void main(String args[]){
		print("running...");
		Document doc;
		try {
			//Get Document object after parsing the html from given url.
			String url = "https://www.zillow.com/homes/for_rent/16835690_zpid/2-_beds/0-899368_price/0-3500_mp/32.868925,-117.234091,32.866123,-117.239144_rect/17_zm/";
			doc = Jsoup.connect(url).get();

			String title = doc.title(); //Get title
			print("Title: " + title); //Print title.

			Elements webAddress = doc.getElementsByClass("ds-address-container"); //Get address
			Elements webPrice = doc.getElementsByClass("ds-price");
            Elements webSize = doc.getElementsByClass("ds-bed-bath-living-area");
            Elements webDescription = doc.getElementsByClass("character-count-truncated");
            //Elements webDaysListed = doc.getElementsByClass("ds-overview-stat-value");
            //Elements webListingAgent = doc.select(".ds-overview .ds-listing-agent-info");

            //print("NEW: " + webListingAgent.text());

            //for (Element e : doc.select("span[ds-listing-agent-display-name]")) {
            //    System.out.println( " 1 "   + e.text());
            //}

            String stringPrice = webPrice.text().substring(webPrice.text().length()/2);
            String address = webAddress.text().substring(webAddress.text().length()/2);
            String size = webSize.text().substring(webSize.text().length()/2);
            String description = webDescription.text();
            //String stringDL = webDaysListed.text();

            String[] splited = webSize.text().split(" ");
            String stringBed = splited[0];
            String stringBath = splited[2];
            String stringSqft = splited[4];

            int bed = Integer.parseInt(stringBed);
            int bath = Integer.parseInt(stringBath);
            int sqft = Integer.parseInt(stringSqft.replace(",",""));
            //int daysListed = Integer.parseInt(stringDL);


            print( "Address: " + address);
            print( "Price: " + stringPrice);
            print( "Number of Bedrooms: " + bed);
            print( "Number of Bathrooms: " + bath);
            print( "Square footage of the listing: " + stringSqft);
            print( "Description: " + description );
            //print( "Days Listed: " + daysListed);



		} catch (IOException e) {
			e.printStackTrace();
		}
	}


	public static void print(String string) {
		System.out.println(string);
	}
	public static void print(int i)  {
	    System.out.println(i);
	}

}