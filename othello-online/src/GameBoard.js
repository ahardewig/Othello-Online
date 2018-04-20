import React, { Component } from 'react';
import rebase from './rebase.js'

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
        rebase.syncState(`games/testingID/board`, {
            context: this,
            state: 'board',
            then(data){
                let newState = { ...this.state }
                newState.boardSynced = true
                this.setState(newState)
            }
        })
    }
    render = () => {
        if(this.state.boardSynced){
            return (
                <p> ahoy it's synced: {this.state.board.testvalue}</p>
            )
        } else {
            return (
                <p> ahoy it's not synced</p>
            )
        }

    }
}
export default GameBoard