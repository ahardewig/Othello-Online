import React, { Component } from 'react';
import rebase from './rebase.js'
import './Disc.css'

class Disc extends Component {
    style = () => {
        return ({
            backgroundColor: this.props.color,
        })
    }

    validCoord = (row, col) => {
        if(row >= 0 && row <= 7 && col >= 0 && col <= 7){
            return true
        } else {
            return false
        }
    }

    getColorFromCoords = (row, col) =>{
        return this.props.getGameBoardState().game.board[row][col]
    }

    checkLineAndFlip = (row1, col1, row2, col2, playerColor) => {
        //Get slope
        let rowChange = row2 - row1
        let colChange = col2 - col1

        let currentRow = row2
        let currentCol = col2
        //Make stack of stuff to flip or something
        let toFlip = []
        while(this.validCoord(currentRow, currentCol)){
            toFlip.push({
                r: currentRow,
                c: currentCol,
            })
            let currColor = this.getColorFromCoords(currentRow, currentCol)
            if(currColor === playerColor){
                //Valid move, so flip the line
                for(var i = 0; i < toFlip.length; i++){
                    this.props.changeDiscColor(toFlip[i].r, toFlip[i].c, playerColor)
                }
                return true
            } else if (currColor === "green") {
                //Hit a green piece, so stop. Not a valid move.
                return false
            }
            currentRow = currentRow + rowChange
            currentCol = currentCol + colChange
        }
        //Didn't hit green, but also didn't hit another piece of yours. Invalid move.
        return false
    }

    validMove = () => {
        if(this.props.playerColor !== this.props.getGameBoardState().game.colorsTurn){
            return false    //don't do anything if it's not their turn
        }
        let checkRow, checkCol
        if(this.props.color === "green"){ 
            let valid = false;
            let oppositeColor = "white"
            if(this.props.playerColor === "white"){
                oppositeColor = "black"
            }
            //Check if this is adjacent to another piece and therefore valid
            // x  y  z
            // x  y  z
            // x  y  z
            //First, check x column
            checkRow = this.props.row - 1 //top row
            checkCol = this.props.col - 1 //left column
            for(; checkRow <= (this.props.row + 1); checkRow++){
                if(!this.validCoord(checkRow, checkCol)){
                    continue
                } else {
                    if(this.getColorFromCoords(checkRow, checkCol) === oppositeColor){
                        valid = this.checkLineAndFlip(this.props.row, this.props.col, checkRow, checkCol, this.props.playerColor)
                    } else {
                        continue
                    }
                }
            }

            //Second, check z column
            checkRow = this.props.row - 1 //top row
            checkCol = this.props.col + 1 //right column
            for(; checkRow <= (this.props.row + 1); checkRow++){
                if(!this.validCoord(checkRow, checkCol)){
                    continue
                } else {
                    if(this.getColorFromCoords(checkRow, checkCol) === oppositeColor){
                        valid = this.checkLineAndFlip(this.props.row, this.props.col, checkRow, checkCol, this.props.playerColor)
                    } else {
                        continue
                    }
                }
            }

            //Check top middle
            checkRow = this.props.row - 1
            checkCol = this.props.col
            if(this.validCoord(checkRow, checkCol)){
                if(this.getColorFromCoords(checkRow, checkCol) === oppositeColor){
                    valid = this.checkLineAndFlip(this.props.row, this.props.col, checkRow, checkCol, this.props.playerColor)
                }
            }
            //Check bottom middle
            checkRow = this.props.row + 1
            checkCol = this.props.col
            if(this.validCoord(checkRow, checkCol)){
                if(this.getColorFromCoords(checkRow, checkCol) === oppositeColor){
                    valid = this.checkLineAndFlip(this.props.row, this.props.col, checkRow, checkCol, this.props.playerColor)
                }
            }
            
            return valid;
        } else { //Piece is already clicked, so invalid
            return false
        }
    }

    onClick = (event) => {
        if(this.validMove()){
            //this.props.changeDiscColor(this.props.row, this.props.col, "black")
            this.props.changeDiscColor(this.props.row, this.props.col, this.props.playerColor)
            let newState = this.props.getGameBoardState();
            newState.game.piecesRemaining -= 1
            if(this.props.playerColor === "white"){
                newState.game.colorsTurn = "black"
            } else {
                newState.game.colorsTurn = "white"
            }
            if(newState.game.piecesRemaining === 0){
                this.props.declareWinner();
            }
            this.props.setGameBoardState(newState)
        } else { //Not a valid move
            return
            //Add error or something?
        }
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