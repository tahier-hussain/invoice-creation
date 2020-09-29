import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      gst: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = async event => {
    event.preventDefault();

    // const requestOptions = {
    //   method: "POST",
    //   url: "http://localhost:5000/api/posts/add",
    //   headers: {
    //     "x-auth-token": localStorage.getItem("auth-token"),
    //     "Content-Type": "application/json"
    //   },
    //   data: {
    //     title: this.state.title,
    //     content: this.state.content,
    //     street_name: this.state.street_name,
    //     colony: this.state.colony,
    //     city: this.state.city,
    //     state: this.state.state,
    //     country: this.state.country,
    //     gst: this.state.gst
    //   }
    // };

    axios({
      method: "POST",
      url: "http://localhost:5000/api/posts/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        title: this.state.title,
        content: this.state.content,
        gst: this.state.gst
      }
    }).then(res => {
      if (res.status == 200) {
        alert("Service has been created");
        this.props.history.push("/home");
      } else if (res.status == 400) {
        alert("Something went wrong");
        location.reload();
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container className="mb-3 mt-3">
          <Link to="/home" className="btn btn-primary">
            {"<< "}Go Back
          </Link>
        </Container>
        <Container className="border">
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>
              <h2>Create Service</h2>
            </Col>
            <Col>
              <FormGroup>
                <Label>Title</Label>
                <Input type="text" name="title" id="title" placeholder="title" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Content</Label>
                <Input type="textarea" name="content" id="content" placeholder="content" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Cost / item</Label>
                <Input type="number" name="gst" id="gst" placeholder="gst" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <Button type="submit" color="dark">
                Create
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateService;
