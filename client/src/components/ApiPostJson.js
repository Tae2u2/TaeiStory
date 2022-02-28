import React, { Component } from "react";

const axios = require("axios");

class ApiPostJson extends Component {
  componentDidMount() {
    axios.post("/users", {}).then((response) => {
      console.log("response.data.message : " + response.data.message);
    });
  }

  render() {
    return (
      <>
        <h1>call node api postcd</h1>
      </>
    );
  }
}

export default ApiPostJson;
