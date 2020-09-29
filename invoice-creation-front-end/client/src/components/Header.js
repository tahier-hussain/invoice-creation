import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Modal, ModalHeader, ModalBody, NavItem, NavLink, Container } from "reactstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    isOpen: false,
    userDetails: ""
  };

  componentDidMount() {
    if (localStorage.getItem("user-details")) {
      this.setState({
        userDetails: JSON.parse(localStorage.getItem("user-details"))
      });
    }
  }

  toggle = val => {
    if (val == "drop") {
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  };

  logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-details");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="nav-bar-fixed-top">
          <Container>
            <NavbarBrand href="/home">Invoice Creation</NavbarBrand>
            <NavbarToggler onClick={() => this.toggle("drop")}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Nav className="ml-auto" navbar>
                  {this.state.userDetails.user_type === "business-owner" ? <NavLink href="/list-of-services">Buy Products</NavLink> : <NavLink>Create Product</NavLink>}
                </Nav>
                {localStorage.getItem("auth-token") ? (
                  <NavLink href="/" onClick={this.logout}>
                    Logout
                  </NavLink>
                ) : (
                  <NavLink href="/">Login</NavLink>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        {/* {localStorage.getItem("auth-token") ? (
          <div>
            {this.state.userDetails.user_type === "business-owner" ? (
              <Container>
                <h1>Business Owner: {this.state.userDetails.name}</h1>
              </Container>
            ) : (
              <Container>
                <h1>Vendor: {this.state.userDetails.name}</h1>
              </Container>
            )}
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}

export default Header;
