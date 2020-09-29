const express = require("express");
const router = express.Router();
const vendorController = require("../../controllers/vendor-register");

router.post("/", vendorController.register);

module.exports = router;
