const express = require("express");

const {
  getStaff,
  getAvailableStaff,
  getStaffById,
  createStaff,
  updateStaff,
  updateAvailability,
  deleteStaff,
} = require("../controllers/staff.controller");

const authenticate =
  require("../middlewares/auth.middleware");

const adminOnly =
  require("../middlewares/admin.middleware");

const router =
  express.Router();


// =====================================================
// CUSTOMER
// =====================================================

// Only active + AVAILABLE staff
router.get(
  "/available",
  getAvailableStaff
);


// =====================================================
// ADMIN
// =====================================================

// All active staff
router.get(
  "/",
  authenticate,
  adminOnly,
  getStaff
);

// One staff member
router.get(
  "/:id",
  authenticate,
  adminOnly,
  getStaffById
);

// Create
router.post(
  "/",
  authenticate,
  adminOnly,
  createStaff
);

// Update
router.put(
  "/:id",
  authenticate,
  adminOnly,
  updateStaff
);

// Update availability
router.patch(
  "/:id/availability",
  authenticate,
  adminOnly,
  updateAvailability
);

// Delete / deactivate
router.delete(
  "/:id",
  authenticate,
  adminOnly,
  deleteStaff
);


module.exports = router;