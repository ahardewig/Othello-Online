import React, { Component } from 'react';
import logo from './logo.svg';
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
        winSorted: {

        },
        lossSorted: {
            
        },
        tieSorted: {
            
        },
        totalGamesSorted: {

        },

        selected: 0,

      }
      
    }
    

    compareWin(a, b) {
        console.log(a)
        if (a.numWins > b.numWins) {
          return -1;
        }
        if (a.numWins < b.numWins) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
      compareLoss(a, b) {
        if (a.numLosses > b.numLosses) {
          return -1;
        }
        if (a.numLosses < b.numLosses) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
      compareTie(a, b) {
        if (a.numTies > b.numTies) {
            return -1;
          }
          if (a.numTies < b.numTies) {
            return 1;
          }
          // a must be equal to b
          return 0;
      }

      compareTotalGames(a, b) {
        var totalA = a.numLosses + a.numWins + a.numTies
        var totalB = b.numLosses + b.numWins + b.numTies
          if (totalA > totalB) {
            return -1;
          }
          if (totalA < totalB) {
            return 1;
          }
          // a must be equal to b
          return 0;
      }


  
    componentWillMount() {
        //fetch and sort all of the data from the database.
        rebase.fetch(`users/`, {
            context: this,
            asArray: true
          }).then(data => {
            data.sort(this.compareWin)
            this.setState({winSorted: data});
          })
    }



    sortByLosses = () => {
        rebase.fetch(`users/`, {
            context: this,
            asArray: true
          }).then(data => {
             data.sort(this.compareLoss)
             this.setState({lossSorted: data});
             this.setState({selected: 1});
          })

    }

    sortByTies = () => {
        rebase.fetch(`users/`, {
            context: this,
            asArray: true
          }).then(data => {
             data.sort(this.compareTie)
             this.setState({tieSorted: data});
             this.setState({selected: 2});
          })
    }

    sortByWins = () => {

        rebase.fetch(`users/`, {
            context: this,
            asArray: true
          }).then(data => {
            data.sort(this.compareWin)
            this.setState({winSorted: data});
            this.setState({selected: 0});
          })
    }

    sortByTotalGames = () => {
        rebase.fetch(`users/`, {
            context: this,
            asArray: true
          }).then(data => {
             data.sort(this.compareTotalGames)
             this.setState({totalGamesSorted: data});
             this.setState({selected: 3});
          })

    }

    tempScreen = () => {
        return (
            <div className="Leaderboard">
            <p align="center">
            
                {this.props.username}
                <br></br><br></br><br></br>
                <text>LeaderBoard</text>
            </p>
          </div>
        
        )
    }

    goHome = () => {
        console.log(this.props.goToUrl("/home"))
    }

    returnSortedRender = () => {
        console.log(this.state.selected)
        if (this.state.selected == 0){
            return (
                (Object.values(this.state.winSorted)).map((users, index) => (
                    <span>
                        {(index+1) + "------" + users.displayName + "======" + users.numWins}
                        <br></br>
                    </span>
                ))
            )
        }
        else if (this.state.selected == 1){
            return (
                (Object.values(this.state.lossSorted)).map((users, index) => (
                    <span>
                        {(index+1) + "------" + users.displayName + "======" + users.numLosses}
                        <br></br>
                    </span>
                ))
            )
        }
        else if (this.state.selected == 2){
            return (
                (Object.values(this.state.tieSorted)).map((users, index) => (
                    <span>
                        {(index+1) + "------" + users.displayName + "======" + users.numTies}
                        <br></br>
                    </span>
                ))
            )
        }
        else if (this.state.selected == 3){
            return (
                (Object.values(this.state.totalGamesSorted)).map((users, index) => (
                    <span>
                        {(index+1) + "------" + users.displayName + "======" + ((users.numWins+users.numLosses+users.numTies))}
                        <br></br>
                    </span>
                ))
            )
        }
    }

    displaySortedParameter = () => {
        if (this.state.selected == 0){
            return "Wins"
        }
        else if (this.state.selected == 1){
            return "Losses"
        }
        else if (this.state.selected == 2) {
            return "Ties"
        }
        else {
            return "Total Games"
        }
    }


    firstScreen = () => {

        return (
            <div className="Leaderboard">
            <p align="left">
                <button style={{
                            borderRadius: "500px",
                            padding: '10px 50px',
                            margin: '20px 0px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: 'black'

                            }} onClick={this.goHome}>Home</button>
            </p>
        <p align="center">
        
            {this.props.username}
            <br></br><br></br><br></br>
            <text>LeaderBoard (</text>{this.displaySortedParameter()}<text>)</text>
            <ol style={{"text-align":"center", "list-style-position":"inside"}}>

                {this.returnSortedRender()}
            </ol>
            <text>Sort by</text>
        </p>

        <button style={{
                            borderRadius: "500px",
                            padding: '10px 50px',
                            margin: '20px 0px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: 'black'

                            }} onClick={this.sortByWins}>Wins</button>

        <button style={{
                            borderRadius: "500px",
                            padding: '10px 50px',
                            margin: '20px 0px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: 'black'

                            }} onClick={this.sortByLosses}>Losses</button>

        <button style={{
                            borderRadius: "500px",
                            padding: '10px 50px',
                            margin: '20px 0px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: 'black'

                            }} onClick={this.sortByTies}>Ties</button>
        <button style={{
                            borderRadius: "500px",
                            padding: '10px 50px',
                            margin: '20px 0px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: 'black'

                            }} onClick={this.sortByTotalGames}>Total Games Played</button>

      </div>
        )

    }


  render() {
    console.log(this.state.winPercentSorted)
    // if (this.winPercentSorted){
    //     return this.tempScreen()
    // }
    // else {
        return this.firstScreen()
    //}
  }
}

export default App;
