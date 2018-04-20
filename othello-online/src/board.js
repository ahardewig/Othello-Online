import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

var black = 0;
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.curColor = "green"; //Sbutton
    this.colorSet = false;
  }
  clicky() {
    if (black) {
      black = false;
      if (false) {
      } else {
        this.curColor = "black";
      }
    } else {
      black = true;
      if (false) {
      } else {
        this.curColor = "white";
      }
    }
    this.colorSet = true;
    this.forceUpdate();
  }

  render() {
    var bgColor = this.curColor;
    return (
      <button
        onClick={this.clicky.bind(this)}
        style={{
          backgroundColor: bgColor,
          padding: "10px 10px",
          margin: "2px 2px",
          cursor: "pointer"
        }}
      >
        {" "}
      </button>
    );
  }
}

class SquareRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var things = Array(this.props.value).fill(null);
    for (var i = 0; i < this.props.value; i++) {
      things.push(<Square value={this.props.value} />);
    }
    return things;
  }
}

class SquareRowContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SquareRow value={this.props.value} />
      </div>
    );
  }
}

const Board = () => (
  <div>
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
    <SquareRowContainer value={8} />
  </div>
);

render(<Board />, document.getElementById("root"));
