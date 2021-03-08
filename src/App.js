import React, {useState ,useEffect, useRef}  from 'react';
import './App.css';
import country from 'country-list-js'
import removeDuplicates from './component/removeduplicate'



//api key: c49c02d84d5e47889a00c45df4cb791e


function App(){
  
  const [list,setlist]=useState([]);
  const [countryname,setcountryname]=useState("Select Country");
  const [symsearch,setsymsearch]=useState("Select Symbol");
  const [isloaded,setIsLoaded]=useState(false);
  const [price,setprice]=useState(null)


  const initialrender=useRef(true)

  useEffect(() => {
    

    if(initialrender.current){
      initialrender.current=false
    }else{
      async function getStocks () {
        let url=""
        if(symsearch !== "Select Symbol"){
          url= 'https://api.twelvedata.com/price?apikey=c49c02d84d5e47889a00c45df4cb791e&symbol='+symsearch
            console.log(url)
            const json= await(await fetch(url)).json()
            setprice(json.price)
        }
        url=`https://api.twelvedata.com/stocks?apikey=c49c02d84d5e47889a00c45df4cb791e&country=`+countryname
          const json= await(await fetch(url)).json()
          setlist(removeDuplicates(json.data,'symbol'))
  
    }
    getStocks()
    }


  },[countryname,symsearch]);


    return (
      <div>

          
        <form>
          <label htmlFor="countryname">Country:</label>
            <select name="countryname" id="countryname" onChange={(e) => setcountryname(e.target.value)}>
              <option>{countryname}</option>
                {country.names().map(item =>
                  (<option key={item}>{item}</option>)
                )}

            </select>
        </form>


        {/* This is where the symbol is selected */}
        <form> 
          <label htmlFor="symsearch"> Stock symbol: </label>
            <select name="symsearch" id="symsearch" onChange={(e) => setsymsearch(e.target.value)} >
              {list.length > 0 
                ? list.map(item => (
                <option key={item.symbol} >{item.symbol}</option>))
                : <option> No symbol found </option>
              
              }
            </select>
        </form>

        <p> this is the country {countryname} this is the {symsearch} this is the {price}</p>


        
      

      </div>

  
    ); 
}
export default App;