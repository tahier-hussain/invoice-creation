import React, { Component } from "react";
import Header from "./Header";

import HomeVendor from "./HomeVendor";
import HomeBusinessOwner from "./HomeBusinessOwner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.userDetails.user_type === "business-owner" ? <HomeBusinessOwner /> : <HomeVendor />}
      </div>
    );
  }
}

export default Home;
