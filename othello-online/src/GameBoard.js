import React, { Component } from 'react';
import rebase from './rebase.js'
import Disc from './Disc.js'

class GameBoard extends Component {
    constructor(){
        super();
        this.state = {
            game: { },
            boardSynced: false,
        }
    }
    componentWillMount = () => {
        //rebase.syncState(`games/${this.props.gameID}/board`, {
        // this.testFunc()
        rebase.syncState(`games/testingID`, { //TODO: change testingID to be a prop
            context: this,
            state: 'game',
            then(data){
                let newState = { ...this.state }
                newState.boardSynced = true
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
    getGameState = () => {
        return this.state
    }

    setGameState = (newState) => {
        this.setState(newState)
    }

    changeDiscColor = (row, col, color) => {
        let newState = { ...this.state }
        newState.game.board[row][col] = color
        this.setState(newState)
    }

    renderRow = (rowNum) => {
        let row = []
        for(var i = 0; i < 8; i++){
            row.push(<Disc row={rowNum} col={i} color={this.state.game.board[rowNum][i]} changeDiscColor={this.changeDiscColor}
                        getGameState={this.getGameState} setGameState={this.setGameState}/>) //TODO: make color change dynamically
        }
        return row
    }

    render = () => {
        let rows = [];
        if(this.state.boardSynced){
            for(var i = 0; i < 8; i++){
                rows.push(<div display="flex">{this.renderRow(i)}</div>)
            }

            return (
                <div>
                    <p> ahoy it's synced: {this.state.game.board.testvalue}</p>
                    <div>
                    {rows}
                    </div>
                </div>
            )
        } else {
            return (
                <p> ahoy it's not synced</p>
            )
        }

    }
}
export default GameBoard