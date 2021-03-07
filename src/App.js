import React  from 'react';
import './App.css';
import country from 'country-list-js'



//api key: c49c02d84d5e47889a00c45df4cb791e


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      isloaded: false,
      symsearch:"Select Symbol",
      continentname:"Select Continent"
    
    }
    this.handleChange = this.handleChange.bind(this);
  }




  componentWillMount(){ // THis function is for deleteing any duplicates in the array list
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
    const value= e.target.value
    this.setState({
      ...this.state,
        [e.target.name]:value
    })
  }




  render(){
    return (
      <div>
        <form>
          <label htmlFor="continentname">Continent:</label>
            <select name="continentname" id="continentname" onChange={this.handleChange}>
              <option>{this.state.continentname}</option>
                {country.continents().map(item =>
                  (<option>{item}</option>)
                )}

            </select>
        </form>


        {/* This is where the symbol is selected */}
        <form> 
          <label htmlFor="symsearch"> Stock symbol: </label>
            <select name="symsearch" id="symsearch" onChange={this.handleChange} >
              <option >{this.state.symsearch}</option>
              {this.state.list.length > 0 
                ? this.state.list.map(item => (
                <option key={item.symbol} >{item.symbol}</option>))
                : <option> No symbol found </option>
              
              }
            </select>


        </form>
      

      </div>

  
    );
  }
}
export default App;