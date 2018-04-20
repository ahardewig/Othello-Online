import React, { Component } from 'react';
import rebase from './rebase.js'

class Disc extends Component {

    render = () => {
        return (
            <p>row={this.props.row}, col={this.props.col}</p>
        )
    }
}
export default Disc