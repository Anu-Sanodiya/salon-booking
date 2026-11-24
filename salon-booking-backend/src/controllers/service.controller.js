const { Service } = require("../models/model");


// ==========================================
// GET ACTIVE SERVICES
// Customer-facing API
// ==========================================

const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({
      category: 1,
      name: 1,
    });

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};


// ==========================================
// GET SINGLE SERVICE
// ==========================================

const getService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};


// ==========================================
// CREATE SERVICE
// ADMIN ONLY
// ==========================================

const createService = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      duration,
      salonPrice,
      homePrice,
      image,
      popular,
      homeServiceAvailable,
      isActive,
      options,
    } = req.body;

    if (!name || !category || salonPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category and salon price are required",
      });
    }

    const service = await Service.create({
      name: name.trim(),
      category: category.trim(),
      description: description || "",
      duration: duration || 30,
      salonPrice,
      homePrice:
        homePrice === undefined || homePrice === ""
          ? null
          : homePrice,
      image: image || "",
      popular: popular || false,
      homeServiceAvailable:
        homeServiceAvailable || false,
      isActive:
        isActive === undefined
          ? true
          : isActive,
      options: options || [],
    });
    console.log("Service created:", service);
    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};


// ==========================================
// UPDATE SERVICE
// ADMIN ONLY
// ==========================================

const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};


// ==========================================
// DELETE SERVICE
// ADMIN ONLY
// ==========================================

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(
      req.params.id
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: service,
    });
  } catch (error) {
    console.error("Delete service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};


module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};