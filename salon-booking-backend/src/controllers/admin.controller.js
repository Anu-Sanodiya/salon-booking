const adminService = require("../services/service");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      adminKey,
    } = req.body;

    if (!name || !email || !password || !adminKey) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password and admin key are required",
      });
    }

    // Check admin registration key
    if (adminKey !== process.env.ADMIN_REGISTER_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin registration key",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters",
      });
    }

    const admin = await adminService.registerAdmin({
      name,
      email,
      phone,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// ADMIN LOGIN
// ==========================================

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const result =
      await adminService.loginAdmin({
        email,
        password,
      });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// VERIFY ADMIN
// ==========================================

const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};


module.exports = {
  register,
  login,
  me,
};