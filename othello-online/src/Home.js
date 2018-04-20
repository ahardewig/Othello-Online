import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard.js'
import rebase, { auth } from "./rebase.js"
import { Route, Switch, Redirect } from "react-router-dom";
import { isObjectEmpty, buildUserFromGoogle } from "./apphelpers.js"
import Login from "./Login.js"
import ReactLoading from "react-loading";

class Home extends Component {

    constructor() {
      super();
      this.state = {
          searchingForGame: false,
          user: "john"
      }
    }

    componentWillMount() {
        //fetch user data
      
    }

    
    loadingSymbolToggle = () => {

        if (this.state.searchingForGame){
            console.log("true11111")
            return 20
        }
        else {
            console.log("false111111")
            return 0
        }


    }

    searchForGame = () => {
        //set searchingForGame to true and rerender to a dif loading screen
        //popup the loading symbol
        
            this.setState({searchingForGame: true});
    


    }
    cancelSearch = () => {
        this.setState({searchingForGame: false});
    }


  render() {
    return (
      <div className="Home" style={{height: '100vh', width: '100%', background: 'white'}}>
            <text>Welcome {this.props.username}!</text>
            <br></br><br></br><br></br><br></br><br></br>
            <text style={{background: 'white', color: 'black', size: '20'}}>Welcome to Othello-Online!</text>
            <br></br><button onClick={this.searchForGame}>Search for a game</button><br></br>
            <br></br><button hidden={!this.state.searchingForGame} onClick={this.cancelSearch}>Cancel search</button>
            <ReactLoading type={"spokes"} color="#000000" height={20} width={parseInt(this.loadingSymbolToggle())} />

                    <div style={{width: '100%', height: '100%', backgroundColor: '#F8F8F8'}}>
                        <Switch>
                            
                            
                            {/* <Route path="/createproject" render={() => {
                                return <CreateProjectForm goToUrl={this.props.goToUrl} getAppState={this.props.getAppState}/>
                            }} /> */}
    
                        </Switch>
                    </div>
      </div>
    );
  }
}

export default Home;
