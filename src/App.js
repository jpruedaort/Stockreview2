import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }

  render(){
    return (
      <div className="App">
          <nav className="navbar navbar-expand-sm bg-white align-items-middle">
            <a className="navbar-brand text-dark font-weight-bold  " href="nothing.com">Stockview</a>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <a className="nav-link text-dark " href="nothing.com">
                      Stock of the Day
                      </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark" href="nothing.com">
                      Portfolio
                    </a>
                  </li>
                </ul>
              </div>
          </nav>

      </div>
  
    );
  }
}
export default App;