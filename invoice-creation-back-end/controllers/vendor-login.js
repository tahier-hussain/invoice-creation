const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Vendor Model
const Vendor = require("../models/vendor");

exports.login = (req, res) => {
  console.log("Hello");
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }

  //Check for existing vendor
  Vendor.findOne({ email }).then(vendor => {
    if (!vendor)
      return res.json({
        status: 400,
        msg: "Vendor does not exist "
      });

    //Validate password
    bcrypt.compare(password, vendor.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          status: 400,
          msg: "Invalid Credentials"
        });

      jwt.sign({ id: vendor.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: 200,
          token,
          users: {
            id: vendor.id,
            name: vendor.name,
            email: vendor.email,
            user_type: vendor.user_type,
            profile_picture: vendor.profile_picture,
            description: vendor.description,
            address: vendor.description,
            message: "Logged in successfully"
          }
        });
      });
    });
  });
};
