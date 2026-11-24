const { Staff } = require("../models/model");


// =====================================================
// GET ALL STAFF
// ADMIN ONLY
// Returns AVAILABLE + BUSY + OFF
// =====================================================

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({
      isActive: true,
    }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      data: staff,
    });

  } catch (error) {
    console.error("Get staff error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch staff",
    });
  }
};


// =====================================================
// GET AVAILABLE STAFF
// CUSTOMER
// Returns only AVAILABLE + active staff
// =====================================================

const getAvailableStaff = async (req, res) => {
  try {
    const staff = await Staff.find({
      isActive: true,
      availability: "AVAILABLE",
    }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      data: staff,
    });

  } catch (error) {
    console.error(
      "Get available staff error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch available staff",
    });
  }
};


// =====================================================
// GET ONE STAFF MEMBER
// ADMIN
// =====================================================

const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(
      req.params.id
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: staff,
    });

  } catch (error) {
    console.error("Get staff error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch staff",
    });
  }
};


// =====================================================
// CREATE STAFF
// ADMIN
// =====================================================

const createStaff = async (req, res) => {
  try {
    const {
      name,
      role,
      phone,
      email,
      image,
      rating,
      availability,
      services,
    } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "Name and role are required",
      });
    }

    const staff = await Staff.create({
      name: name.trim(),
      role: role.trim(),
      phone: phone || "",
      email: email || "",
      image: image || "",
      rating: rating ?? 0,
      availability:
        availability || "AVAILABLE",
      services: services || [],
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: staff,
    });

  } catch (error) {
    console.error("Create staff error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create staff",
    });
  }
};


// =====================================================
// UPDATE STAFF
// ADMIN
// =====================================================

const updateStaff = async (req, res) => {
  try {
    const staff =
      await Staff.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: staff,
    });

  } catch (error) {
    console.error(
      "Update staff error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update staff",
    });
  }
};


// =====================================================
// UPDATE AVAILABILITY
// ADMIN
// =====================================================

const updateAvailability = async (
  req,
  res
) => {
  try {
    const { availability } =
      req.body;

    const allowed = [
      "AVAILABLE",
      "BUSY",
      "OFF",
    ];

    if (!allowed.includes(availability)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability",
      });
    }

    const staff =
      await Staff.findByIdAndUpdate(
        req.params.id,
        {
          availability,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Availability updated successfully",
      data: staff,
    });

  } catch (error) {
    console.error(
      "Update availability error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update availability",
    });
  }
};


// =====================================================
// DELETE STAFF
// ADMIN
// Soft delete
// =====================================================

const deleteStaff = async (req, res) => {
  try {
    const staff =
      await Staff.findByIdAndUpdate(
        req.params.id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Staff removed successfully",
    });

  } catch (error) {
    console.error(
      "Delete staff error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to remove staff",
    });
  }
};


module.exports = {
  getStaff,
  getAvailableStaff,
  getStaffById,
  createStaff,
  updateStaff,
  updateAvailability,
  deleteStaff,
};