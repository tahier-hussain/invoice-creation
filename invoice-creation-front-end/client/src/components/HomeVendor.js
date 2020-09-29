import React, { Component } from "react";
import Header from "./Header";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import SingleService from "./SingleService";

class HomeVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      services: [],
      error_message: {},
      singleService: {},
      toggle: false,
      requestedServices: []
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/get-user-posts",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          services: res.data.slice(0, 5)
        });
        console.log(this.state.services);
      } else if (res.status == 400) {
        location.reload();
      }
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/service/get-requests-not-accepted",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          requestedServices: res.data
        });
        console.log(this.state.requestedServices);
      }
    });
  }

  toggle = service => {
    this.setState({
      toggle: !this.state.toggle,
      singleService: service
    });
  };

  acceptRequest = id => {
    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/service/accept-request",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      },
      data: {
        id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        alert("Request was accepted successfully");
      } else {
        alert("Something went wrong. Couldn't accept the request");
      }
      location.reload();
    });
  };

  render() {
    return (
      <div>
        {this.state.toggle === false ? (
          <div>
            <Container className="container-background">
              <div className="circular--landscape mt-4">
                <img src={require(`../../public/${this.state.userDetails.profile_picture}`)} id="leftbox" className="img" />
              </div>
              <div className="ml-2 mt-2">
                <h2 className="font-weight-bold">{this.state.userDetails.name}</h2>
                <p>
                  <strong>User Type:</strong> Vendor
                </p>
                <p>
                  <strong>Email:</strong> {this.state.userDetails.email}
                </p>
                <p>
                  <strong>Description:</strong> {this.state.userDetails.description ? <a>{this.state.userDetails.description}</a> : <a>No description</a>}
                </p>
              </div>
            </Container>
            <Container className="mt-5 container-background">
              <h2 className="mb-3 font-weight-bold">This is the home page for the Vendor.</h2>
              <h4 className="mb-5">The vendor will be able to create posts based on the services that they could provide. Those posts will be visible to the companies/business owners who can then approach the vendor for a particular service.</h4>
              <div>
                <Link to="/create-service" className="btn btn-primary">
                  Create Post / Service
                </Link>
              </div>
            </Container>
            <Container className="mt-5 container-background">
              <h3 className="font-weight-bold mb-3">Services that you provide</h3>
              {this.state.services.length > 0 ? (
                <div>
                  {this.state.services.map(service => (
                    <Container className=" mb-3 container2-background">
                      <h3>{service.title}</h3>
                      <p>
                        {service.content.substring(0, 500)} ...
                        <Button onClick={() => this.toggle(service)} color="link">
                          {" "}
                          read more{" "}
                        </Button>
                      </p>
                    </Container>
                  ))}
                </div>
              ) : (
                <div>
                  <strong>{this.state.error_message.msg}</strong>
                </div>
              )}
              <Link to="/all-services" className="btn btn-info">
                {" "}
                View all Services{" "}
              </Link>
            </Container>
            <Container className="container-background mt-5">
              <h3 className="font-weight-bold mb-3">Requested Services</h3>
              {this.state.requestedServices.length > 0 ? (
                <Container>
                  {this.state.requestedServices.map(user => (
                    <Container className="container2-background">
                      <div className="circular--landscape-mini">
                        <img src={require(`../../public/${user.profile_picture}`)} className="img" />
                      </div>
                      <div>
                        <p>
                          Name: <strong>{user.name}</strong>
                        </p>
                      </div>
                      <div>
                        <p>
                          Email: <strong>{user.email}</strong>
                        </p>
                      </div>
                      <button className="btn btn-info mr-2">View Details</button>
                      <button onClick={() => this.acceptRequest(user.service_id)} className="btn btn-success">
                        Accept
                      </button>
                    </Container>
                  ))}
                </Container>
              ) : (
                <h3>There are no requests to display</h3>
              )}
            </Container>
          </div>
        ) : (
          <div>
            <Container>
              <button onClick={this.toggle} className="btn btn-primary">
                {" "}
                {"<< "}Go Back
              </button>
              <SingleService singleService={this.state.singleService} />
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default HomeVendor;
