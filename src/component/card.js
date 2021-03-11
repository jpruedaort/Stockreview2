import country from "country-list-js";
import React, { useState, useEffect, useRef } from "react";
import removeDuplicates from "./removeduplicate";

export default function Card(props) {
  //Setup of initial sttes
  const [list, setlist] = useState([]);
  const [countryname, setcountryname] = useState("Select Country");
  const [symsearch, setsymsearch] = useState("Select Symbol");
  const [isloaded, setIsLoaded] = useState(false);
  const [priceLoaded, setPriceLoaded] = useState(false);
  const [price, setprice] = useState(NaN);
  const [stockname, setstockname] = useState("the stock name");

  // Normaly the useEffect hook triggers when the page is initaly is rendered , we want to prevent this,  (initialrender checks this)
  const initialrender1 = useRef(true);
  const initialrender2 = useRef(true);

  useEffect(() => {
    //Here we check if the page was already rendered or not
    if (initialrender1.current) {
      initialrender1.current = false;
    } else {
      //Here we call the api depending  the select box that is being moddified
      async function getStocks() {
        let url = "";
        if (symsearch !== "Select Symbol") {
          //This one corresponds to the Symbol select Box, it calls the json form the Api and returns the price of the symbol, the "json.price" is where the  price is filtered
          url =
            "https://api.twelvedata.com/price?apikey=c49c02d84d5e47889a00c45df4cb791e&symbol=" +
            symsearch;
          setPriceLoaded(false);
          const json = await (await fetch(url)).json();
          setprice(parseFloat(json.price));
          setPriceLoaded(true);
        }
      }
      getStocks();
    }
  }, [symsearch]);

  useEffect(() => {
    if (initialrender2.current) {
      initialrender2.current = false;
    } else {
      console.log("is rendering");
      // Here the symbols depending on the country are called, please note that the .data in "json.data" is used to filter the json
      let url = "";
      async function getStocks() {
        url =
          `https://api.twelvedata.com/stocks?apikey=c49c02d84d5e47889a00c45df4cb791e&country=` +
          countryname;
        console.log("url: ", url);
        setIsLoaded(false);
        const json = await (await fetch(url)).json();
        console.log(json);
        setlist(removeDuplicates(json.data, "symbol"));
        setIsLoaded(true);
      }
      getStocks();
    }
  }, [countryname]);

  function handlepricechange(e) {
    setsymsearch(e.target.value);
    setstockname(e.target.value);


  }
  return (
    <div
      className='col-sm-auto  mb-3 text-center'
      stlye={{ display: "table-cell" }}
    >
      <div
        className='card p-1 h-100 ml-1 mr-1 bg-white border-dark '
        style={{ width: "18rem" }}
      >
        {/* Here the country  is selected, they are imported using the npm module "country-list-js" */}
        <form>
          <div className='d-flex justify-content-center '>
            <label htmlFor='countryname' className='pt-1 '>
              <b>Country:</b>
            </label>
          </div>
          <select
            className='flex flex-box mr-1 ml-1'
            style={{ width: "260px" }}
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

          {isloaded === true || countryname === "Select Country" ? (
            <div>
              <label htmlFor='symsearch' className='pt-3'>
                {" "}
                <b>Stock symbol: </b>
              </label>
              <br />
              <select
                className='mb-3'
                name='symsearch'
                id='symsearch'
                onChange={(e) => handlepricechange(e)}
              >
                <option>Select</option>
                {list.length > 0 ? (
                  list.map((item) => (
                    <option key={item.symbol} data-stock-name={item.symbol}>
                      {item.symbol}
                    </option>
                  ))
                ) : (
                  <option> No symbol found </option>
                )}
              </select>
            </div>
          ) : (
            <h6>
              <b>Loading ...</b>
            </h6>
          )}
        </form>

        {/* Here the price will pop up when the stock symbol is selected (If the API doesn't shows any price for the selected symbol, it will diplay "No stock price available") */}
        {priceLoaded === true ? (
          <div
            className='container  mb-3 mt-3 rounded text-center mb-4'
            style={{ width: "auto" }}
          >
            {isNaN(price) ? (
              <h1>
                <b>No price</b> <br />
              </h1>
            ) : (
              <h2> {price} USD</h2>
            )}
            <h7>{stockname}</h7>
          </div>
        ) : (
          <div
            className='container  mb-3 mt-3 rounded text-center'
            style={{ width: "100px", height: "100px" }}
          ></div>
        )}
      </div>
    </div>
  );
}
