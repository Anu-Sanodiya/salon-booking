const express = require("express");

const {
  register,
  login,
  getMe,
} = require("../controllers/auth.controller");

const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();


// Public
router.post("/register", register);
router.post("/login", login);


// Protected
router.get("/me", authenticate, getMe);


module.exports = router;