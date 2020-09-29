import React, { Component } from "react";
import Header from "./Header";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

class AllServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      error_message: ""
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/get-user-posts",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          services: res.data
        });
        console.log(this.state.services);
      } else if (res.status == 400) {
        this.setState({
          error_message: res.data
        });
        location.reload();
      }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Container className="mb-3">
          <Link to="/home" className="btn btn-primary mt-3">
            {"<< "}Go Back
          </Link>
        </Container>
        <Container className="mt-5">
          <h3 className="font-weight-bold mb-3">Services that you provide</h3>
          {this.state.services.length > 0 ? (
            <div>
              {this.state.services.map(service => (
                <Container className=" mb-3 container-background">
                  <h3>{service.title}</h3>
                  <p>
                    {service.content.substring(0, 500)} ...<Button color="link"> read more </Button>
                  </p>
                </Container>
              ))}
            </div>
          ) : (
            <div>
              <strong>{this.state.error_message.msg}</strong>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default AllServices;
