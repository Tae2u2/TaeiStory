import React, { Component } from "react";

class ApiGetJson extends Component {
  componentDidMount = async () => {
    const response = await fetch("/users");
    const body = await response.json();
    console.log("body message : " + body.message);
  };

  render() {
    return (
      <>
        <h1>call node api Get</h1>
      </>
    );
  }
}

export default ApiGetJson;
