import React, { Component } from "react";
import Header from "./Header";
import SingleService from "./SingleService";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

class ListOfServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      error_message: "",
      toggle: false,
      singleService: {},
      toggle_requestService: false,
      no_of_items: ""
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/get"
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          services: res.data
        });
      } else if (res.status == 400) {
        this.setState({
          error_message: "Something went wrong. Couldn't load the services"
        });
      }
    });
  }

  toggle = service => {
    this.setState({
      toggle: !this.state.toggle,
      singleService: service
    });
  };

  requestService = event => {
    event.preventDefault();
    console.log(this.state.singleService);
    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        vendor_id: this.state.singleService.user_id,
        service_id: this.state.singleService._id,
        no_of_items: this.state.no_of_items
      }
    };

    console.log(requestOptions);
    axios(requestOptions).then(res => {
      if (res.status == 200) {
        alert("Your request has been sent to the vendor. Please wait while the vendor responds");
      } else if (res.status == 400) {
        alert("couldn't send request. Something went wrong");
      }
      location.reload();
    });
  };

  toggle_requestService = () => {
    this.setState({
      toggle_requestService: !this.state.toggle_requestService
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Header />
        {this.state.toggle === false ? (
          <Container className="container-background">
            <h2 className="font-weight-bold">List of Services you can buy</h2>
            <Link to="home" className="btn btn-primary mb-3">
              {"<< "} Go Back
            </Link>
            {this.state.error_message ? (
              <div>{this.state.error_message}</div>
            ) : (
              <div>
                {this.state.services.map(service => (
                  <Container className="container2-background mb-3">
                    <h3>{service.title}</h3>
                    <p className="font-weight-light">
                      {service.content.substring(0, 500)} ...{" "}
                      <Button onClick={() => this.toggle(service)} color="link">
                        read more
                      </Button>
                    </p>
                  </Container>
                ))}
              </div>
            )}
          </Container>
        ) : (
          <Container className="mt-3">
            <h2 className="font-weight-bold mt-3 mb-3">Service Details</h2>
            <button onClick={this.toggle} className="btn btn-primary">
              {" "}
              {"<< "}Go Back
            </button>
            <br></br>
            <button onClick={this.toggle_requestService} className="btn btn-success mt-3">
              {" "}
              Get this Service
            </button>
            {this.state.toggle_requestService === true ? (
              <div>
                <Form className="mt-4 mb-4" onSubmit={this.requestService}>
                  <Col>
                    <FormGroup>
                      <Label>No Of Items</Label>
                      <Input type="number" name="no_of_items" id="no_of_items" placeholder="no of items" onChange={this.changeHandler} />
                      <Button type="submit" color="dark" className="mt-2">
                        Submit
                      </Button>
                    </FormGroup>
                  </Col>
                </Form>
              </div>
            ) : (
              ""
            )}
            <SingleService singleService={this.state.singleService} />
          </Container>
        )}
      </div>
    );
  }
}

export default ListOfServices;
