const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../models/user");

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

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user)
      return res.json({
        status: 400,
        msg: "User does not exist "
      });

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          status: 400,
          msg: "Invalid Credentials"
        });

      jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: 200,
          token,
          users: {
            id: user.id,
            name: user.name,
            email: user.email,
            user_type: user.user_type,
            profile_picture: user.profile_picture,
            description: user.description,
            address: user.address,
            message: "Logged in successfully"
          }
        });
      });
    });
  });
};
