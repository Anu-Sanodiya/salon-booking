// const express = require("express");

// const serviceController = require("../controllers/service.controller");

// const authenticate = require("../middlewares/auth.middleware");
// const adminOnly = require("../middlewares/admin.middleware");

// const router = express.Router();


// // ==========================================
// // CUSTOMER
// // ==========================================

// router.get(
//   "/",
//   serviceController.getServices
// );

// router.get(
//   "/:id",
//   serviceController.getService
// );


// // ==========================================
// // ADMIN
// // ==========================================

// router.post(
//   "/",
//   authenticate,
//   adminOnly,
//   serviceController.createService
// );

// router.put(
//   "/:id",
//   authenticate,
//   adminOnly,
//   serviceController.updateService
// );

// router.delete(
//   "/:id",
//   authenticate,
//   adminOnly,
//   serviceController.deleteService
// );


// module.exports = router;



const express = require("express");
const serviceController = require("../controllers/service.controller");

const authenticate = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");

const router = express.Router();

// Public routes
router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getService);
console.log("service routes called")
// Admin routes
router.post(
  "/",
  authenticate,
  adminOnly,
  serviceController.createService
);

router.put(
  "/:id",
  authenticate,
  adminOnly,
  serviceController.updateService
);

router.delete(
  "/:id",
  authenticate,
  adminOnly,
  serviceController.deleteService
);

module.exports = router;