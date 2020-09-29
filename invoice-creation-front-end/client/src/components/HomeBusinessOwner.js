import React, { Component } from "react";
import Header from "./Header";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import SingleService from "./SingleService";

class HomeBusinessOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      services: [],
      error_message: "",
      pendingRequests: [],
      servicesBought: [],
      toggle: false,
      toggle_id: "",
      toggle_delete: false,
      toggle_delete_id: ""
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/get"
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          services: res.data.slice(0, 5)
        });
        console.log(this.state.services);
      } else if (res.status == 400) {
        this.setState({
          error_message: "Something went wrong. Couldn't load the services"
        });
      }
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/service/get-requests-pending-user",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    console.log(requestOptions);

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          pendingRequests: res.data
        });
        console.log(this.state.pendingRequests);
      }
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/service/get-accepted-requests-per-user",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status == 200) {
        this.setState({
          servicesBought: res.data
        });
        console.log(this.state.servicesBought);
      }
    });
  }

  cancelRequest = id => {
    let requestOptions = {
      method: "DELETE",
      url: "http://localhost:5000/api/service/delete-request",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Request has been cancelled successfully");
      } else {
        alert("Something went wrong");
      }
      location.reload();
    });
  };

  toggle_delete = id => {
    this.setState({
      toggle_delete: !this.state.toggle_delete,
      toggle_delete_id: id
    });
  };

  invoiceGenerator = service => {
    var doc = new jsPDF("p", "mm", "a4");

    var lMargin = 20;
    var rMargin = 10;
    var pdfInMM = 210;
    var paragraph;
    var lines;

    // paragraph = "This is the invoice for the service that you requested from the respective vendor.";
    // lines = doc.splitTextToSize(paragraph, 320 - lMargin - rMargin);
    // doc.setFont("times");
    // doc.setFontType("normal");
    // doc.setFontSize(20);
    // doc.setTextColor(0, 0, 0);
    // doc.text(lMargin, 35, lines);

    // paragraph = "The below are the details about the services that you've requested for.";
    // lines = doc.splitTextToSize(paragraph, 320 - lMargin - rMargin);
    // doc.setFontSize(15);
    // doc.text(lMargin, 55, lines);

    // paragraph = "Details:";
    // lines = doc.splitTextToSize(paragraph, 320 - lMargin - rMargin);
    // doc.setFontType("bold");
    // doc.text(lMargin, 65, lines);

    // paragraph = "NAME OF THE VENDOR : " + service.name;
    // lines = doc.splitTextToSize(paragraph, 320 - lMargin - rMargin);
    // doc.setFontType("normal");
    // doc.text(lMargin, 75, lines);

    // paragraph = "EMAIL : " + service.email;
    // lines = doc.splitTextToSize(paragraph, 320 - lMargin - rMargin);
    // doc.setFontType("normal");
    // doc.text(lMargin, 85, lines);

    // paragraph = "TITLE: " + service.request.title;
    // lines = doc.splitTextToSize(paragraph, 320 - lMargin - rMargin);
    // doc.setFontType("normal");
    // doc.text(lMargin, 95, lines);

    // var numberOfWords = 0;
    // var index = 0;
    // while (numberOfWords <= 30) {
    //   if (service.request.content[index] == " ") {
    //     numberOfWords++;
    //   }
    //   index++;
    // }

    // if (numberOfWords == 30) {
    //   paragraph = "DESCRIPTION: " + service.request.content.substring(0, index) + "(See full description inside the application.)";
    // } else {
    //   paragraph = "DESCRIPTION: " + service.request.content;
    // }
    // lines = doc.splitTextToSize(paragraph, 210 - lMargin - rMargin);
    // doc.text(lMargin, 105, lines);

    // paragraph = "ADDRESS: " + service.request.street_name + ", " + service.request.colony + ", " + service.request.city + ", " + service.request.state + ", " + service.request.country + ".";
    // lines = doc.splitTextToSize(paragraph, 210 - lMargin - rMargin);
    // doc.text(lMargin, 135, lines);
    paragraph = "INVOICE CREATION";
    lines = doc.splitTextToSize(paragraph, pdfInMM - 30 - 30);
    doc.setFontSize(30);
    doc.setTextColor(0, 10, 44);
    doc.setFontType("bold");
    doc.text(60, 20, lines);

    doc.line(10, 22, 200, 22);

    paragraph = "BILL TO:";
    lines = doc.splitTextToSize(paragraph, pdfInMM - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(20, 30, lines);

    paragraph = this.state.userDetails.name;
    lines = doc.splitTextToSize(paragraph, pdfInMM - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(20, 35, lines);

    paragraph = this.state.userDetails.email;
    lines = doc.splitTextToSize(paragraph, pdfInMM - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(20, 40, lines);

    paragraph = "SHIP TO:";
    lines = doc.splitTextToSize(paragraph, pdfInMM - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(70, 30, lines);

    if (this.state.userDetails.address) {
      paragraph = this.state.userDetails.address;
    } else {
      paragraph = "No Address";
    }
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(70, 35, lines);

    paragraph = "INVOICE#";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(130, 30, lines);

    paragraph = "iv-" + Math.floor(Math.random() * 10000 + 1);
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(165, 30, lines);

    paragraph = "INVOICE DATE";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(130, 35, lines);

    var today = new Date();
    paragraph = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(165, 35, lines);

    paragraph = "DUE DATE";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(130, 40, lines);

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate() + 20;

    if (day > 30) {
      day %= 30;
      month += 1;
      if (month > 12) {
        month %= 12;
        year += 1;
      }
    }
    paragraph = year + "-" + (month + 1) + "-" + day;
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(165, 40, lines);

    doc.line(20, 70, 190, 70);

    paragraph = "PRODUCT";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(25, 75, lines);

    paragraph = "AMOUNT";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(70, 75, lines);

    paragraph = "NO OF ITEMS";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(115, 75, lines);

    paragraph = "TOTAL AMOUNT";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(160, 75, lines);

    doc.line(20, 80, 190, 80);

    paragraph = service.request.title;
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(25, 85, lines);

    paragraph = service.request.gst;
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(70, 85, lines);

    if (service.service.no_of_items) {
      paragraph = service.service.no_of_items;
    } else {
      paragraph = "1";
    }
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(115, 85, lines);

    var amount = service.request.gst;
    var no_of_items = "1";
    if (service.service.no_of_items) {
      no_of_items = service.service.no_of_items;
    }
    amount = parseInt(amount) * parseInt(no_of_items);
    paragraph = amount;
    lines = doc.splitTextToSize(paragraph.toString(), 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(160, 85, lines);

    doc.line(20, 100, 190, 100);

    paragraph = "GST";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(115, 105, lines);

    paragraph = (parseInt(amount) / 100) * 18;
    lines = doc.splitTextToSize(paragraph.toString(), 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(160, 105, lines);

    paragraph = "Delivery tax";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(115, 115, lines);

    paragraph = "950";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(160, 115, lines);

    doc.line(20, 120, 190, 120);

    paragraph = "TOTAL AMOUNT";
    lines = doc.splitTextToSize(paragraph, 100 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(105, 125, lines);

    paragraph = parseInt(amount) + (parseInt(amount) / 100) * 18 + 950;
    lines = doc.splitTextToSize(paragraph.toString(), 100 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(160, 125, lines);

    paragraph = "Note: The payment will me made after the respective product / products have been delivered.";
    lines = doc.splitTextToSize(paragraph, 200 - lMargin - rMargin);
    doc.setFontSize(15);
    doc.setFontType("normal");
    doc.text(30, 160, lines);

    doc.save("invoice.pdf");
  };

  toggle = id => {
    this.setState({
      toggle: !this.state.toggle,
      toggle_id: id
    });
  };
  render() {
    return (
      <div>
        <Container className="container-background">
          <div className="circular--landscape mt-4">
            <img src={require(`../../public/${this.state.userDetails.profile_picture}`)} id="leftbox" className="img" />
          </div>
          <div className="ml-2 mt-2">
            <h2 className="font-weight-bold">{this.state.userDetails.name}</h2>
            <p>
              <strong>User Type:</strong> Business / Consumer Profile
            </p>
            <p>
              <strong>Email:</strong> {this.state.userDetails.email}
            </p>
            <p>
              <strong>Description:</strong> {this.state.userDetails.description ? <a>{this.state.userDetails.description}</a> : <a>No description</a>}
            </p>
          </div>
        </Container>
        <Container className="container-background mt-5">
          <h2 className="font-weight-bold">Buy Services</h2>
          {this.state.error_message ? (
            <div>{this.state.error_message}</div>
          ) : (
            <div>
              {this.state.services.map(service => (
                <Container className="container2-background mb-3">
                  <h3 className="font-weight-normal">{service.title}</h3>
                  <p className="font-weight-light">
                    {service.content.substring(0, 500)}...<button className="btn btn-link">read more</button>
                  </p>
                  <strong>By: {service.user_name}</strong>
                  <p>
                    <Link to={`/display-service/${service._id}`} className="btn btn-info mt-2">
                      View Details
                    </Link>
                  </p>
                </Container>
              ))}
            </div>
          )}
          <Link to="/list-of-services" className="btn btn-primary">
            View All
          </Link>
        </Container>
        <Container className="container-background mt-5">
          <h2 className="font-weight-bold">Services You've Bought</h2>
          {this.state.servicesBought.length > 0 ? (
            <Container>
              {this.state.servicesBought.map(service => (
                <Container className="container2-background mb-3">
                  <h3>{service.request.title}</h3>
                  <p>
                    {service.request.content.substring(0, 500)}... <button className="btn btn-link">read more</button>
                  </p>
                  {service.service.no_of_items ? (
                    <p>
                      <strong>No of Items: </strong>
                      {service.service.no_of_items}
                    </p>
                  ) : (
                    ""
                  )}
                  <p>
                    <strong className="mb-2">By: {service.name}</strong>
                  </p>
                  <button className="btn btn-info mr-2">View Details</button>
                  <button onClick={() => this.invoiceGenerator(service)} className="btn btn-success">
                    Download Invoice
                  </button>
                </Container>
              ))}
              <button className="btn btn-primary">View All</button>
            </Container>
          ) : (
            <Container>
              <h3>You haven't bought any services</h3>
            </Container>
          )}
        </Container>
        {this.state.pendingRequests ? (
          <Container className="container-background mt-5">
            <h2 className="font-weight-bold">Pending Request for Service</h2>
            {this.state.pendingRequests.length === 0 ? <p>No Pending Requests</p> : ""}
            {this.state.pendingRequests.map(request => (
              <Container className="container2-background mb-2">
                <h3>{request.title}</h3>
                <p>
                  {request.content.substring(0, 500)} ... <Button color="link">read more</Button>
                </p>
                {request.no_of_items ? (
                  <p>
                    <strong>No of Items: </strong>
                    <a>{request.no_of_items}</a>
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <strong>By: {request.user_name}</strong>
                </p>
                <button className="btn btn-info mr-2">View Details</button>
                <button className="btn btn-danger" onClick={() => this.toggle_delete(request._id)}>
                  Cancel Request
                </button>
                {this.state.toggle_delete === true && request._id === this.state.toggle_delete_id ? (
                  <div className="mt-2">
                    <p>Are you sure?</p>
                    <button className="btn btn-danger mr-2" onClick={() => this.cancelRequest(request._id)}>
                      Yes
                    </button>
                    <button className="btn btn-primary" onClick={() => this.toggle_delete("")}>
                      No
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </Container>
            ))}
            {this.state.pendingRequests.length === 5 ? <button className="btn btn-primary mt-2">View All</button> : ""}
          </Container>
        ) : (
          <p>No Pending Requests</p>
        )}
      </div>
    );
  }
}

export default HomeBusinessOwner;
