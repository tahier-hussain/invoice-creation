import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import Header from "./Header";

class DisplayService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicec: {},
      error_message: ""
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    const obj = {
      id: params.serviceId
    };
    console.log(params.serviceId);
    const requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/get-one",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        service_id: obj
      }
    };

    console.log(requestOptions);
    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          service: res.data
        });
      } else {
        this.setState({
          error_message: "Something went wrong. Couldn't load the data"
        });
      }
      console.log(this.state.servicec);
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Container className="container-background">
          <h3>Hello</h3>
        </Container>
      </div>
    );
  }
}

export default DisplayService;
