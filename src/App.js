import "./App.css";
import Card from "./component/card";

import React, { useState, useEffect, useRef } from "react";

//api key: c49c02d84d5e47889a00c45df4cb791e

function App() {
  const [cardnumber, setcardnumber] = useState([1]);

  function handlecard() {
    console.log(cardnumber)
    const indexcard=(cardnumber[(cardnumber.length)-1])+1
    setcardnumber([...cardnumber,indexcard])
    console.log("index: ", cardnumber)
    
  }
  return (
    <body>
      <div className='App'>
        {/* nav using bs */}
        <div className='d-flex  flex-md-row align-items-center p-3 px-md-4  border-bottom box-shadow' style={{background:"#444444"}}>
          <h5 style={{color:"#fbfbfd"}}>StockViewer V2</h5>
          <a className='p-2  ml-2 align-items-center'style={{color:"#fbfbfd"}} href='#d'>
            About
          </a>
          <div className='flex-row ml-md-auto d-none d-md-flex'>
            <a href='https://twelvedata.com' style={{color:"#fbfbfd"}} >Powered by Twelvedata API</a>
          </div>
        </div>

        <div className='container-fluid'>
          <div className='row justify-content-center m-4 d-flex text-center'>
          {cardnumber.map((card)=> <Card/>)}
            <div
        className='col-sm-auto  mb-3 text-center align-self-center '
        style={{width: "20rem"}} 
        onClick={()=>handlecard()}
      > 
      <div className='container pt-3 h-100  ' >
      <div className="flex-row text-center p-9  align-middle">
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='50'
          height='50'
          fill='currentColor'
          className='bi bi-plus-circle'
          viewBox='0 0 16 16'
        >
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
          
        </svg>
        <p>Add New stock</p>
        </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </body>
  );
}
export default App;
