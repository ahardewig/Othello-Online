import React, { Component } from 'react';
import rebase from './rebase.js'
import Disc from './Disc.js'

class GameBoard extends Component {
    constructor(){
        super();
        this.state = {
            board: { },
            boardSynced: false,
        }
    }
    componentWillMount = () => {
        //rebase.syncState(`games/${this.props.gameID}/board`, {
        // this.testFunc()
        rebase.syncState(`games/testingID/board`, { //TODO: change testingID to be a prop
            context: this,
            state: 'board',
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
    getBoardState = () => {
        return this.state
    }

    setBoardState = (newState) => {
        this.setState(newState)
    }

    changeDiscColor = (row, col, color) => {
        let newState = { ...this.state }
        newState.board[row][col] = color
        this.setState(newState)
    }

    renderRow = (rowNum) => {
        let row = []
        for(var i = 0; i < 8; i++){
            row.push(<Disc row={rowNum} col={i} color={this.state.board[rowNum][i]} changeDiscColor={this.changeDiscColor}
                        getBoardState={this.getBoardState} setBoardState={this.setBoardState}/>) //TODO: make color change dynamically
        }
        return row
    }

    render = () => {
        let rows = [];
        if(this.state.boardSynced){
            for(var i = 0; i < 8; i++){
                rows.push(<div>{this.renderRow(i)}<br></br></div>)
            }

            return (
                <div>
                    <p> ahoy it's synced: {this.state.board.testvalue}</p>
                    {rows}
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