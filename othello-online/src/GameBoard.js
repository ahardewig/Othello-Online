import React, { Component } from 'react';
import rebase from './rebase.js'
import Disc from './Disc.js'

class GameBoard extends Component {
    constructor(){
        super();
        this.state = {
            game: { },
            boardSynced: false,
            playerColor: "",
        }
    }
    componentWillMount = () => {
        //rebase.syncState(`games/${this.props.gameID}/board`, {
        // this.testFunc()
        rebase.syncState(`games/${this.props.gameID}`, { //TODO: change testingID to be a prop
            context: this,
            state: 'game',
            then(data){
                let newState = { ...this.state }
                newState.boardSynced = true
                if(this.props.playerID === newState.game.blackPlayerID){
                    newState.playerColor = "black"
                } else {
                    newState.playerColor = "white"
                }
                this.setState(newState)
            }
        })
    }

    // testFunc = () => { //add dummy data for testing
    //     rebase.post(`games/testingID/board`, {
    //         data: {
    //             0: {0: "white",1: "white",2: "white",3: "white",4: "white",5: "white",6: "white",7: "black",},
    //             1: {0: "white",1: "black",2: "white",3: "black",4: "black",5: "white",6: "white",7: "black",},
    //             2: {0: "black",1: "white",2: "white",3: "white",4: "white",5: "white",6: "white",7: "black",},
    //             3: {0: "white",1: "white",2: "black",3: "white",4: "white",5: "white",6: "white",7: "black",},
    //             4: {0: "white",1: "black",2: "black",3: "black",4: "white",5: "black",6: "white",7: "black",},
    //             5: {0: "white",1: "black",2: "black",3: "black",4: "white",5: "white",6: "white",7: "white",},
    //             6: {0: "white",1: "white",2: "white",3: "black",4: "white",5: "white",6: "white",7: "white",},
    //             7: {0: "white",1: "black",2: "white",3: "white",4: "white",5: "white",6: "white",7: "white",},
    //         }
    //     })
    // }
    getGameBoardState = () => {
        return this.state
    }

    setGameBoardState = (newState) => {
        this.setState(newState)
    }

    declareWinner = () => {
        let blackScore = 0
        let whiteScore = 0
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                if(this.state.game.board[i][j] === "white"){
                    whiteScore++
                } else {
                    blackScore++
                }
            }
        }
        if(blackScore > whiteScore){ //Black wins
            const newState = { ...this.state }
            newState.game.winnerID = this.state.game.blackPlayerID
            this.setState(newState)
            rebase.fetch(`users/${this.state.game.blackPlayerID}/numWins`, {
                context: this,
                then(data){
                    let newNumWins = data;
                    newNumWins++;
                    rebase.update(`users/${this.state.game.blackPlayerID}`, {
                        data: {
                            numWins: newNumWins,
                        }
                    })
                }
            })
            rebase.fetch(`users/${this.state.game.whitePlayerID}/numLosses`, {
                context: this,
                then(data){
                    let newNumLosses = data;
                    newNumLosses++;
                    rebase.update(`users/${this.state.game.whitePlayerID}`, {
                        data: {
                            numLosses: newNumLosses,
                        }
                    })
                }
            })

        } else if (blackScore === whiteScore) { //Tie
            const newState = { ...this.state }
            newState.game.winnerID = "Tie"
            this.setState(newState)

            rebase.fetch(`users/${this.state.game.whitePlayerID}/numTies`, {
                context: this,
                then(data){
                    let newNumTies = data;
                    newNumTies++;
                    rebase.update(`users/${this.state.game.whitePlayerID}`, {
                        data: {
                            numTies: newNumTies,
                        }
                    })
                }
            })
            rebase.fetch(`users/${this.state.game.blackPlayerID}/numTies`, {
                context: this,
                then(data){
                    let newNumTies = data;
                    newNumTies++;
                    rebase.update(`users/${this.state.game.blackPlayerID}`, {
                        data: {
                            numTies: newNumTies,
                        }
                    })
                }
            })
            
        } else { //White wins
            const newState = { ...this.state }
            newState.game.winnerID = this.state.game.whitePlayerID
            this.setState(newState)
            rebase.fetch(`users/${this.state.game.whitePlayerID}/numWins`, {
                context: this,
                then(data){
                    let newNumWins = data;
                    newNumWins++;
                    rebase.update(`users/${this.state.game.whitePlayerID}`, {
                        data: {
                            numWins: newNumWins,
                        }
                    })
                }
            })
            rebase.fetch(`users/${this.state.game.blackPlayerID}/numLosses`, {
                context: this,
                then(data){
                    let newNumLosses = data;
                    newNumLosses++;
                    rebase.update(`users/${this.state.game.blackPlayerID}`, {
                        data: {
                            numLosses: newNumLosses,
                        }
                    })
                }
            })
        }
    }

    changeDiscColor = (row, col, color) => {
        let newState = { ...this.state }
        newState.game.board[row][col] = color
        this.setState(newState)
    }

    renderRow = (rowNum) => {
        let row = []
        for(var i = 0; i < 8; i++){
            row.push(<Disc row={rowNum} col={i} color={this.state.game.board[rowNum][i]} changeDiscColor={this.changeDiscColor} declareWinner={this.declareWinner}
                        getGameBoardState={this.getGameBoardState} setGameBoardState={this.setGameBoardState} playerColor={this.state.playerColor}/>) //TODO: make color change dynamically
        }
        return row
    }

    renderStatusMessage = () => {
        if(this.state.boardSynced){
            if(this.state.game.piecesRemaining > 0){
                if(this.state.game.colorsTurn === this.state.playerColor){
                    return (
                        <div>
                            <h3>Game running. Your color: {this.state.playerColor}</h3>
                            <div>
                                <h3>It's your turn!</h3>
                            </div>
                        </div>
                    )
                } else {
                    return(
                        <div>
                            <h3>Game running. Your color: {this.state.playerColor}</h3>
                            <div>
                                <h3>Wait for your opponent to make their move.</h3>
                            </div>
                        </div>
                    )
                }
            } else {
                return (
                    <div>
                        <h3>Game finished.</h3>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <h3>Loading Game</h3>
                </div>
            )
        }
    }

    renderWinnerMessage = () => {
        if(this.state.boardSynced){
            if (this.state.game.winnerID === ""){
                return (
                    <div></div>
                )
            } else if (this.state.game.winnerID === "Tie") {
                return (
                    <div>
                        <h2>It was a tie!</h2>
                    </div>
                )
            } else if (this.props.playerID === this.state.game.winnerID) {
                return (
                    <div>
                        <h2>You won!</h2>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h2>You lost.</h2>
                    </div>
                )
            }
        } else { //game not loaded
            return (
                <div></div>
            )
        }
        
    }

    goHome = () => {
        console.log(this.props)
        rebase.update(`users/${this.props.playerID}`, {
            data: {currentGame: ''},
            then(err){
            }
        });
    }


    render = () => {
        let rows = [];
        let gameStatus = this.renderStatusMessage();
        let resultMessage = this.renderWinnerMessage();
        if(this.state.boardSynced){
            for(var i = 0; i < 8; i++){
                rows.push(<div>{this.renderRow(i)}</div>)
            }
            return (
                <div >
                    <div><br></br><button onClick={this.goHome}>Home</button><br></br></div>
                    <div>
                    <p style=
                        {{backgroundColor: '#000030',
                            color: 'white',
                            fontSize: '30px',
                            padding: "20px 20px",
                            margin: "1px 1px",
                         }}
                        >Othello {this.state.game.board.testvalue}
                    </p>
                    </div>

                    <div>
                        <div style={{
                            marginTop: '5px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            flexWrap: 'wrap',
                            width: '425px',
                            borderStyle: "outset",
                            borderWidth: '5px',
                            backgroundColor: '#d9d9d9',
                         }}>
                        {rows}
                        </div>
                    </div>
                        {gameStatus}
                        {resultMessage}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}
export default GameBoard