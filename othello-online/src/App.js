import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard.js'
import rebase, { auth } from "./rebase.js"
import { Route, Switch, Redirect } from "react-router-dom";
import { isObjectEmpty, buildUserFromGoogle } from "./apphelpers.js"
import Login from "./Login.js"
import Home from "./Home.js"

class App extends Component {

    constructor() {
      super();
      this.state = {
        user: { }
      }
    }


    postUser(user) {
      rebase.post(`users/${user.uid}`, {
        data: user
      });
     
    }

    checkIfUserIsInDatabase(user) {
      // let inDataBase = false
      rebase.fetch(`users/${user.uid}`, {
        context: this
      }).then((data) => {
        if (isObjectEmpty(data)) {
          this.postUser(user)
        }
      })
    }
  

    componentWillMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const newState = { ...this.state }
          const newUser = buildUserFromGoogle(user)
          newState.user = newUser
          this.setState(newState)
          this.checkIfUserIsInDatabase(newUser)
          this.bindingref = rebase.syncState(`users/${this.state.user.uid}`, {
            context: this,
            state: 'user',
            then: () => {
              const newState = { ...this.state }
              newState.userSynced = true
              this.setState(newState)
            }
  
          })
        } else {
          if (this.bindingref) {
            rebase.removeBinding(this.bindingref)
          }
          const newState = { ...this.state }
          newState.user = { }
          this.setState(newState)
          this.goToUrl("/")
        }
      })
    }

    getAppState = () => {
      return this.state;
    }
  
    setAppState = (newState) => {
      this.setState(newState)
    }
  
    goToUrl = (url) => {
      this.props.history.push(url)
    }
  

  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/" render={() => {
          if (!isObjectEmpty(this.state.user) ){
            console.log(this.state.user)
            console.log(this.state.user.uid)
            return <Home username = {this.state.user.displayName} playerID={this.state.user.uid} getAppState={this.getAppState} setAppState={this.setAppState} goToUrl={this.goToUrl} />
            //return <GameBoard playerID="abcd"/>
          }
          else {
            console.log("hi")
            return <Login />
          }
        }} />
      
        </Switch>
      </div>
    );
  }
}

export default App;
