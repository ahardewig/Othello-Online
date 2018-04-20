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
        //Implement this later
        if(this.props.col === "green"){

        } else { //Piece is already clicked, so don't do anything
            //return false
        }
        return true;
    }

    onClick = (event) => {
        if(validMove)
        this.props.changeDiscColor(this.props.row, this.props.col, "black")
    }

    render = () => {
        return (
            // <p>row={this.props.row}, col={this.props.col}</p>
            <div id="circle" style={this.style()} onClick={this.onClick}></div>
        )
    }
}
export default Disc