import React, { Component, Fragment } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

export default App;