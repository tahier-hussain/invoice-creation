const express = require("express");
const router = express.Router();
const vendorLoginController = require("../../controllers/vendor-login");

router.post("/", vendorLoginController.login);

module.exports = router;
