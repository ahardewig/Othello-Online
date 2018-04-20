import React, { Component } from 'react';
import rebase from './rebase.js'
import './Disc.css'

class Disc extends Component {
    style = () => {
        return ({
            backgroundColor: this.props.color,
        })
    }

    validMove = () => {
        if(this.props.playerColor !== this.props.getGameBoardState().game.colorsTurn){
            return false    //don't do anything if it's not their turn
        }
        if(this.props.color === "green"){ 
            //TODO: check if this is adjacent to another piece and therefore valid
            return true;
        } else { //Piece is already clicked, so don't do anything
            return false
        }
    }

    onClick = (event) => {
        if(this.validMove()){
            //this.props.changeDiscColor(this.props.row, this.props.col, "black")
            this.props.changeDiscColor(this.props.row, this.props.col, this.props.playerColor)
            //TODO: call game logic checker to flip other discs
        } else { //Not a valid move
            return
            //Add error or something?
        }
        
        //if(validMove)
    }

    render = () => {
        return (
            // <p>row={this.props.row}, col={this.props.col}</p>
            // <div id="circle" style={this.style()} onClick={this.onClick}></div>
            <button id="circle" style={this.style()} onClick={this.onClick}></button>
        )
    }
}
export default Disc