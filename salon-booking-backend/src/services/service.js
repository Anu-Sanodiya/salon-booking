const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/model");

// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       role: user.role,
//       email: user.email,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//     }
//   );
// };

// // =========================
// // ADMIN REGISTER
// // =========================
// const registerAdmin = async ({ name, email, phone, password }) => {
//   // Check existing user
//   const existingUser = await User.findOne({
//     email: email.toLowerCase(),
//   });

//   if (existingUser) {
//     throw new Error("User with this email already exists");
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 12);

//   // Create admin
//   const admin = await User.create({
//     name,
//     email: email.toLowerCase(),
//     phone,
//     password: hashedPassword,
//     role: "ADMIN",
//     isActive: true,
//   });

//   return {
//     id: admin._id,
//     name: admin.name,
//     email: admin.email,
//     phone: admin.phone,
//     role: admin.role,
//   };
// };


// // =========================
// // ADMIN LOGIN
// // =========================
// const loginAdmin = async ({ email, password }) => {
//   const admin = await User.findOne({
//     email: email.toLowerCase(),
//   });

//   if (!admin) {
//     throw new Error("Invalid email or password");
//   }

//   // Make sure this user is an admin
//   if (admin.role !== "ADMIN") {
//     throw new Error("Access denied. Admin account required");
//   }

//   // Check active status
//   if (!admin.isActive) {
//     throw new Error("Admin account is inactive");
//   }

//   // Compare password
//   const isPasswordValid = await bcrypt.compare(
//     password,
//     admin.password
//   );

//   if (!isPasswordValid) {
//     throw new Error("Invalid email or password");
//   }

//   // Generate JWT
//   const token = generateToken(admin);

//   return {
//     token,
//     user: {
//       id: admin._id,
//       name: admin.name,
//       email: admin.email,
//       phone: admin.phone,
//       role: admin.role,
//     },
//   };
// };

// module.exports = {
//   registerAdmin,
//   loginAdmin,
// };



const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// ==========================================
// ADMIN REGISTER
// ==========================================

const registerAdmin = async ({
  name,
  email,
  phone,
  password,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    phone,
    password: hashedPassword,
    role: "ADMIN",
    isActive: true,
  });

  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    role: admin.role,
  };
};


// ==========================================
// ADMIN LOGIN
// ==========================================

const loginAdmin = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const admin = await User.findOne({
    email: normalizedEmail,
  });

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  if (admin.role !== "ADMIN") {
    throw new Error("You are not authorized to access the admin panel");
  }

  if (!admin.isActive) {
    throw new Error("Admin account is inactive");
  }

  const passwordValid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(admin);

  return {
    token,
    user: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
    },
  };
};


module.exports = {
  registerAdmin,
  loginAdmin,
};