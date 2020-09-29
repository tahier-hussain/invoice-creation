const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Vendor Model
const Vendor = require("../models/vendor");

exports.register = (req, res) => {
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/shopping-site/invoice-creation-project/invoice-creation-front-end/client/public/${file.name}`);
  }

  const { name, email, password, confirm_password, description, address, company_name } = req.body;

  console.log(req.body);

  //Simple validation
  if (!name || !email || !password || !confirm_password || !address) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }
  //Check for existing vendor
  Vendor.findOne({ email }).then(vendor => {
    if (vendor)
      return res.json({
        status: 400,
        msg: "Vendor already exists "
      });

    if (password != confirm_password) {
      return res.json({
        status: 400,
        msg: "Password Didn't match"
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        msg: "Password should be atleast 8 characters"
      });
    }

    var number = 0;
    var low_alph = 0;
    var up_alph = 0;
    var spl_char = 0;
    for (var i = 0; i < password.length; i++) {
      var ascii = password.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        number = 1;
      } else if (ascii >= 65 && ascii <= 90) {
        up_alph = 1;
      } else if (ascii >= 97 && ascii <= 122) {
        low_alph = 1;
      } else {
        spl_char = 1;
      }
    }

    if (number != 1 || low_alph != 1 || up_alph != 1 || spl_char != 1) {
      return res.json({
        status: 400,
        msg: "Password not efficient"
      });
    }

    const newVendor = new Vendor({
      name,
      email,
      password,
      description,
      address,
      company_name
    });

    if (file) {
      newVendor["profile_picture"] = file.name;
    }

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newVendor.password, salt, (err, hash) => {
        if (err) throw err;
        newVendor.password = hash;
        newVendor.save().then(vendor => {
          jwt.sign({ id: vendor.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              vendors: {
                id: vendor.id,
                name: vendor.name,
                email: vendor.email,
                user_type: vendor.user_type
              }
            });
          });
        });
      });
    });
  });
};
