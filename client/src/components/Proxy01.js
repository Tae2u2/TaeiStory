import React, { Component } from "react";

class Proxy01 extends Component {
  componentDidMount = async () => {
    const response = await fetch("/users");
    const body = await response.text();
    console.log("body: " + body);
  };

  render() {
    return (
      <>
        <h1>Proxy call node Api</h1>
      </>
    );
  }
}

export default Proxy01;
