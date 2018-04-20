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

    renderRow = (rowNum) => {
        let row = []
        for(var i = 0; i < 8; i++){
            row.push(<p>testing {i}</p>)
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