import React  from 'react';
import './App.css';



//api key: c49c02d84d5e47889a00c45df4cb791e


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      isloaded: false,
      symsearch:"Select Symbol",
    
    }
    this.handleChange = this.handleChange.bind(this);
  }




  componentWillMount(){
    function removeDuplicates(array, key) {
      return array.reduce((accumulator, element) => {
          if (!accumulator.find(el => el[key] === element[key])) {
            accumulator.push(element);
          }
          return accumulator;
        }, []);
    }

 
    let url = 'https://api.twelvedata.com/stocks?apikey=c49c02d84d5e47889a00c45df4cb791e&country=USA&type=Common Stock'  //Url with apikey (Line 6)
    fetch(url).then(response => response.json()).then((result)=>result.data).then(((rawresult)=>removeDuplicates(rawresult,'symbol')))
      .then((results)=> this.setState({isloaded: true, list: results}))      

    
  }

  handleChange(e){
    this.setState({symsearch: e.target.value})

  }




  render(){
    return (
      <div>
        {/* <ul>
          {this.state.list.map(item => (
            <li key={item.symbol}> 
              {item.symbol}
            </li>
          ))}
        </ul> */}


        <form>
          <label htmlFor="stcname"> Stock symbol: </label>
          <select name="stcname" id="stcname" onChange={this.handleChange} value={this.state.symsearch} >
            {this.state.list.length > 0 
              ? this.state.list.map(item => (
              <option key={item.symbol} >{item.symbol}</option>))
              : <option> No symbol found </option>
            
            }
          </select>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

          <p>selected Symbol: {this.state.symsearch}</p>


        </form>
      

      </div>

  
    );
  }
}
export default App;