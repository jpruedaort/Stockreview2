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
  const [priceLoaded, setPriceLoaded] = useState(false);
  const [price, setprice] = useState(NaN);
  const [stockname,setstockname]=useState("the stock name")

  // Normaly the useEffect hook triggers when the page is initaly is rendered , we want to prevent this,  (initialrender checks this)
  const initialrender1 = useRef(true);
  const initialrender2= useRef(true)


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
          setPriceLoaded(false)
          const json = await (await fetch(url)).json();
          setprice((parseFloat(json.price)));
          setPriceLoaded(true)
        }
      }
      getStocks();
    }
  }, [symsearch]);

  useEffect(()=>{
    if (initialrender2.current) {
      initialrender2.current = false;
    } else {
      console.log("is rendering")
    // Here the symbols depending on the country are called, please note that the .data in "json.data" is used to filter the json
    let url=""
    async function getStocks(){
    url =`https://api.twelvedata.com/stocks?apikey=c49c02d84d5e47889a00c45df4cb791e&country=` +countryname;
    console.log("url: ",url)
    setIsLoaded(false)
    const json = await (await fetch(url)).json();
    console.log(json)
    setlist(removeDuplicates(json.data, "symbol"));
    setIsLoaded(true)    
    }
    getStocks()
  }
  },[countryname])

  function handlepricechange(e){
    console.log(e.target.getAttribute("data-stock-name"))
    setsymsearch(e.target.getAttribute("data-stock-name"))
    setstockname(e.target.value)

  }

  return (
    <div className='App'>
      {/* nav using bs */}
      <div className='d-flex  flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow'>
        <h5>StockViewer V2</h5>
          <a className='p-2 text-dark ml-2 align-items-center' href='#d'>
            About
          </a>
        <div className="flex-row ml-md-auto d-none d-md-flex">
          <a href="https://twelvedata.com">Powered by Twelvedata API</a>
        </div>
        
      </div>

      <div className='container  my-auto'>
        <div
          className='card-deck text-center'
          style={{ width: "20 rem", height: "80 px" }}
        >
          <div className='card mt-2 mb-2 box-shadow' style={{width:"15rem"}}>
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

              {isloaded === true || countryname ==="Select Country"  ?
              <div>
              <label htmlFor='symsearch'> Stock symbol: </label>
              <select
                className='ml-3'
                name='symsearch'
                id='symsearch'
                onChange={(e) =>handlepricechange(e) }
              >
                <option>Select</option>
                {list.length > 0 ? 
                  list.map((item)=>
                    <option key={item.symbol} data-stock-name={item.symbol}>{item.name}</option>
                    )
                 : (
                  <option> No symbol found </option>
                )}
              </select>
              </div>
              :<h6><b>Loading ...</b></h6>}
              
            </form>

            {/* Here the price will pop up when the stock symbol is selected (If the API doesn't shows any price for the selected symbol, it will diplay "No stock price available") */}
            {priceLoaded === true && (
            <div className="container border mb-3 mt-3 rounded" style={{width: "auto"}}>
            <h1><b>{(isNaN(price) ? "No stock price available" : price+" USD" )} </b></h1>
            <h7>{stockname}</h7>
            
            </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
