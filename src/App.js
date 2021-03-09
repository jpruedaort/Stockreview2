import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import country from "country-list-js";
import removeDuplicates from "./component/removeduplicate";

//api key: c49c02d84d5e47889a00c45df4cb791e

function App() {
  //Setup of initial sttes
  const [list, setlist] = useState([]);
  const [countryname, setcountryname] = useState("Select Country");
  const [symsearch, setsymsearch] = useState("Select Symbol");
  const [isloaded, setIsLoaded] = useState(false);
  const [price, setprice] = useState(NaN);

  // Normaly the useEffect hook triggers when the page is initaly is rendered , we want to prevent this,  (initialrender checks this)
  const initialrender = useRef(true);

  useEffect(() => {
    //Here we check if the page was already rendered or not
    if (initialrender.current) {
      initialrender.current = false;
    } else {
      //Here we call the api depending  the select box that is being moddified
      async function getStocks() {
        let url = "";
        if (symsearch !== "Select Symbol") {
          //This one corresponds to the Symbol select Box, it calls the json form the Api and returns the price of the symbol, the "json.price" is where the  price is filtered
          url =
            "https://api.twelvedata.com/price?apikey=c49c02d84d5e47889a00c45df4cb791e&symbol=" +
            symsearch;
          console.log(url);
          const json = await (await fetch(url)).json();
          setprice((parseFloat(json.price)));
        }
        // Here the symbols depending on the country are called, please note that the .data in "json.data" is used to filter the json
        url =
          `https://api.twelvedata.com/stocks?apikey=c49c02d84d5e47889a00c45df4cb791e&country=` +
          countryname;
        const json = await (await fetch(url)).json();
        setlist(removeDuplicates(json.data, "symbol"));
      }
      getStocks();
    }
  }, [countryname, symsearch]);

  return (
    <div className='App'>
      {/* nav using bs */}
      <div className='d-flex  flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow'>
        <h5>StockViewer V2</h5>
          <a className='p-2 text-dark ml-2 align-items-center' href='#d'>
            About
          </a>
        <div className="flex-row ml-md-auto d-none d-md-flex">
          <a href="https://twelvedata.com">Powered by Twelvedata</a>
        </div>
        
      </div>

      <div className='container  my-auto'>
        <div
          className='card-deck text-center'
          style={{ width: "20 rem", height: "80 px" }}
        >
          <div className='card mt-2 mb-2 box-shadow'>
            {/* Here the country  is selected, they are imported using the npm module "country-list-js" */}
            <form>
              <label htmlFor='countryname' className='pt-3'>
                Country:
              </label>
              <select
                className='ml-2 mr-2'
                name='countryname'
                id='countryname'
                onChange={(e) => setcountryname(e.target.value)}
              >
                <option>{countryname}</option>
                {country.names().map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <br />

              {/* This is where the symbol is selected, the symbol are extracted from the api call and filter from line 41*/}
              <label htmlFor='symsearch'> Stock symbol: </label>
              <select
                className='ml-3'
                name='symsearch'
                id='symsearch'
                onChange={(e) => setsymsearch(e.target.value)}
              >
                <option>Select</option>
                {list.length > 0 ? (
                  list.map((item) => (
                    <option key={item.symbol}>{item.symbol}</option>
                  ))
                ) : (
                  <option> No symbol found </option>
                )}
              </select>
            </form>
            
            <h1><b>{(isNaN(price) ? "No stock price available" : price+" USD" )} </b></h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
