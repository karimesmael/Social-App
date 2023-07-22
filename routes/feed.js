const express = require("express");
const { check } = require("express-validator");
const isAuth = require("../middlware/is-auth");
const feedController = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  check("title").trim().isLength({ min: 5 }),
  check("content").isLength({ min: 10 }),
  feedController.createPost
);

router.get("/post/:postId", isAuth, feedController.getPost);

router.delete("/post/:postId", isAuth, feedController.deletePost);

router.put("/post/:postId", isAuth, feedController.updatePost);

module.exports = router;
