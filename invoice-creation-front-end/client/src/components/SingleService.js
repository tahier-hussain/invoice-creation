import React, { Component } from "react";
import Header from "./Header";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

class SingleService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.singleService.title,
      content: props.singleService.content,
      street_name: props.singleService.street_name,
      colony: props.singleService.colony,
      city: props.singleService.city,
      state: props.singleService.state,
      country: props.singleService.country,
      gst: props.singleService.gst,
      address: props.singleService.address,
      readOnly: false
    };
  }

  componentDidMount() {
    if (this.props.singleService) {
      this.setState({
        readOnly: true
      });
      console.log(this.props.singleService);
    }
  }

  edit = event => {
    event.preventDefault();
    this.setState({
      readOnly: false
    });
  };
  render() {
    return (
      <div>
        <Container className="container-background mt-3">
          <h2>
            <strong>{this.state.title}</strong>
          </h2>
          <p>
            <strong>Description: </strong>
            {this.state.content}
          </p>
        </Container>
      </div>
    );
  }
}

export default SingleService;
