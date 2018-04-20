import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard.js'
import rebase, { auth } from "./rebase.js"
import { Route, Switch, Redirect } from "react-router-dom";
import { isObjectEmpty, buildUserFromGoogle } from "./apphelpers.js"
import Login from "./Login.js"

class Home extends Component {

    constructor() {
      super();
    }


    postUser(user) {
    
    }
  

    componentWillMount() {
      
    }

    startGame = () => {


    }

    joinGame = () => {

    }

  render() {
    return (
      <div className="Home" style={{height: '100vh', width: '100%', background: 'white'}}>
            <text style={{background: 'white', color: 'black', size: '20'}}>Welcome to Othello-Online!</text>
            <br></br><button onClick={this.startGame()}>Start Game</button><br></br>
            <br></br><button onClick={this.joinGame()}>Join Game</button>




                    <div style={{width: '100%', height: '100%', backgroundColor: '#F8F8F8'}}>
                        <Switch>
                            
                            
                            <Route path="/createproject" render={() => {
                                return <CreateProjectForm goToUrl={this.props.goToUrl} getAppState={this.props.getAppState}/>
                            }} />
    
                        </Switch>
                    </div>
      </div>
    );
  }
}

export default Home;
