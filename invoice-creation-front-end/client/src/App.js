import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CreateService from "./components/CreateService";
import AllServices from "./components/AllServices";
import ListOfServices from "./components/ListOfServices";
import DisplayService from "./components/DisplayService";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/create-service" component={CreateService} exact />
          <Route path="/all-services" component={AllServices} exact />
          <Route path="/list-of-services" component={ListOfServices} exact />
          <Route path="/display-service/:serviceId" component={DisplayService} exact />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
