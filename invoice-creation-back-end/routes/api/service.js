const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/serviceRequest.js");
const auth = require("../../middleware/auth");

router.post("/add", auth, serviceController.create);

router.get("/get-requests-pending-user", auth, serviceController.getRequestsPendingUser);

router.post("/accept-request", auth, serviceController.acceptRequest);

router.get("/get-requests-not-accepted", auth, serviceController.getRequestsNotAcceptedUser);

router.get("/get-accepted-requests-per-user", auth, serviceController.getAcceptedRequestsPerUser);

router.delete("/delete-request", auth, serviceController.delete);

// router.post("/accept-service-request", serviceController.acceptServiceRequest);

module.exports = router;
