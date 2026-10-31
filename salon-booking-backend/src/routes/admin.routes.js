const express = require("express");

const adminController = require("../controllers/admin.controller");
const authenticate = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");

const router = express.Router();


// Public admin authentication
router.post(
  "/register",
  adminController.register
);

router.post(
  "/login",
  adminController.login
);


// Protected admin route
router.get(
  "/me",
  authenticate,
  adminOnly,
  adminController.me
);


module.exports = router;