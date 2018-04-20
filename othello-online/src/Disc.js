import React, { Component } from 'react';
import rebase from './rebase.js'
import './Disc.css'

class Disc extends Component {
    style = () => {
        return ({
            backgroundColor: this.props.color,
        })
    }

    render = () => {
        return (
            // <p>row={this.props.row}, col={this.props.col}</p>
            <div id="circle" style={this.style()}></div>
        )
    }
}
export default Disc