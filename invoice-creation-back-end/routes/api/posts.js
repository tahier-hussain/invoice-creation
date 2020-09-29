const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/posts");
const auth = require("../../middleware/auth");

router.post("/add", auth, postsController.create);

router.get("/get", postsController.get);

router.get("/get-one", auth, postsController.getOne);

router.get("/get-user-posts", auth, postsController.getUserPost);

router.put("/update-post", auth, postsController.update);

router.delete("/delete-post", auth, postsController.delete);

module.exports = router;
