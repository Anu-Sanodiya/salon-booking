require("dotenv").config();

const connectDB = require("../config/db");
const { Service } = require("../models/model");

const services = [
  // =========================
  // HAIR SERVICES
  // =========================

  {
    name: "Hair Wash",
    category: "Hair Services",
    description: "Professional hair wash service",
    duration: 30,
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    popular: false,
    isActive: true,
  },

  {
    name: "Hair Dryer",
    category: "Hair Services",
    description: "Professional hair drying and styling",
    duration: 30,
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    popular: false,
    isActive: true,
  },

  {
    name: "Hair Wash + Dryer",
    category: "Hair Services",
    description: "Hair wash followed by professional drying",
    duration: 45,
    salonPrice: 600,
    homePrice: null,
    homeServiceAvailable: false,
    popular: false,
    isActive: true,
  },

  {
    name: "Hair Cut",
    category: "Hair Services",
    description: "Professional hair cut",
    duration: 45,
    salonPrice: 800,
    homePrice: null,
    homeServiceAvailable: false,
    popular: true,
    isActive: true,
  },

  {
    name: "Hair Cut Advance",
    category: "Hair Services",
    description: "Advanced professional haircut",
    duration: 60,
    salonPrice: 1000,
    homePrice: null,
    homeServiceAvailable: false,
    popular: true,
    isActive: true,
  },

  {
    name: "Hair Styling",
    category: "Hair Services",
    description: "Professional hair styling",
    duration: 45,
    salonPrice: 800,
    homePrice: null,
    homeServiceAvailable: false,
    popular: false,
    isActive: true,
  },

  // =========================
  // COLOR SERVICES
  // =========================

  {
    name: "Global Hair Color",
    category: "Color Services",
    duration: 120,
    salonPrice: 1399,
    homePrice: null,
    homeServiceAvailable: false,
    popular: true,
    isActive: true,
  },

  {
    name: "With Ammonia",
    category: "Color Services",
    duration: 120,
    salonPrice: 1599,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Ammonia Free",
    category: "Color Services",
    duration: 120,
    salonPrice: 1800,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Touch-up Ammonia",
    category: "Color Services",
    duration: 90,
    salonPrice: 700,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Touch-up Ammonia Free",
    category: "Color Services",
    duration: 90,
    salonPrice: 900,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Color Toning",
    category: "Color Services",
    duration: 90,
    salonPrice: 1800,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Balayage",
    category: "Color Services",
    duration: 180,
    salonPrice: 3499,
    homePrice: null,
    homeServiceAvailable: false,
    popular: true,
    isActive: true,
  },

  {
    name: "French Balayage",
    category: "Color Services",
    duration: 180,
    salonPrice: 3999,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Global Hair Color Fashion Shade",
    category: "Color Services",
    duration: 150,
    salonPrice: 3000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Highlights",
    category: "Color Services",
    duration: 180,
    salonPrice: 3999,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Highlight One Strip",
    category: "Color Services",
    duration: 60,
    salonPrice: 199,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Ombre Hair Color",
    category: "Color Services",
    duration: 180,
    salonPrice: 4500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // NAIL ART
  // =========================

  {
    name: "Gel Nails",
    category: "Nail Art",
    duration: 60,
    salonPrice: 399,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Extensions",
    category: "Nail Art",
    duration: 90,
    salonPrice: 799,
    homePrice: null,
    homeServiceAvailable: false,
    options: [
      {
        label: "Basic",
        salonPrice: 799,
        homePrice: null,
      },
      {
        label: "Premium",
        salonPrice: 1199,
        homePrice: null,
      },
    ],
    isActive: true,
  },

  {
    name: "Acrylic Nails",
    category: "Nail Art",
    duration: 120,
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    options: [
      {
        label: "Basic",
        salonPrice: 2000,
        homePrice: null,
      },
      {
        label: "Premium",
        salonPrice: 2500,
        homePrice: null,
      },
    ],
    isActive: true,
  },

  {
    name: "Feet Nails Gel",
    category: "Nail Art",
    duration: 90,
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    options: [
      {
        label: "Basic",
        salonPrice: 2000,
        homePrice: null,
      },
      {
        label: "Premium",
        salonPrice: 2500,
        homePrice: null,
      },
    ],
    isActive: true,
  },

  {
    name: "Feet Nails Extension",
    category: "Nail Art",
    duration: 90,
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // MANICURE & PEDICURE
  // =========================

  {
    name: "Manicure",
    category: "Manicure-Pedicure",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Pedicure",
    category: "Manicure-Pedicure",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Manicure Spa",
    category: "Manicure-Pedicure",
    salonPrice: 1199,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Pedicure Spa",
    category: "Manicure-Pedicure",
    salonPrice: 1499,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Foot Reflexology",
    category: "Manicure-Pedicure",
    salonPrice: 2499,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // THREADING
  // =========================

  {
    name: "Eyebrow",
    category: "Threading",
    salonPrice: 50,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Forehead",
    category: "Threading",
    salonPrice: 25,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Upper Lips",
    category: "Threading",
    salonPrice: 25,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Face",
    category: "Threading",
    salonPrice: 150,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // WAXING
  // =========================

  {
    name: "Face",
    category: "Waxing",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Hand",
    category: "Waxing",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Half Legs",
    category: "Waxing",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Legs",
    category: "Waxing",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Under Arms",
    category: "Waxing",
    salonPrice: 100,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Half Back",
    category: "Waxing",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Back",
    category: "Waxing",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Stomach",
    category: "Waxing",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Bikini Waxing",
    category: "Waxing",
    salonPrice: 1500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Body",
    category: "Waxing",
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // BRAZILIAN WAX
  // =========================

  {
    name: "Face",
    category: "Brazilian Wax",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Under Arms",
    category: "Brazilian Wax",
    salonPrice: 150,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Upper Lips",
    category: "Brazilian Wax",
    salonPrice: 50,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Cheeks",
    category: "Brazilian Wax",
    salonPrice: 50,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Chin",
    category: "Brazilian Wax",
    salonPrice: 50,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Neck",
    category: "Brazilian Wax",
    salonPrice: 100,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // LIPO WAX
  // =========================

  {
    name: "Full Hand",
    category: "Lipo Wax",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Half Legs",
    category: "Lipo Wax",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Legs",
    category: "Lipo Wax",
    salonPrice: 1000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Half Back",
    category: "Lipo Wax",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Back",
    category: "Lipo Wax",
    salonPrice: 600,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Under Arms",
    category: "Lipo Wax",
    salonPrice: 150,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Stomach",
    category: "Lipo Wax",
    salonPrice: 550,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Body",
    category: "Lipo Wax",
    salonPrice: 3500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // HAIR CARE
  // =========================

  {
    name: "Hair Spa",
    category: "Hair Care",
    salonPrice: 1000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Moroccan Deep Spa",
    category: "Hair Care",
    salonPrice: 1299,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Repairs Treatment",
    category: "Hair Care",
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Protein Hair Spa Advance",
    category: "Hair Care",
    salonPrice: 1500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Head Massage",
    category: "Hair Care",
    salonPrice: 600,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Head Massage + Wash",
    category: "Hair Care",
    salonPrice: 1500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // HAIR TEXTURE
  // =========================

  {
    name: "Smoothing",
    category: "Hair Texture",
    salonPrice: 3000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Protein Treatment",
    category: "Hair Texture",
    salonPrice: 4000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Smooth Therapy",
    category: "Hair Texture",
    salonPrice: 4000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Flora Active",
    category: "Hair Texture",
    salonPrice: 3500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Keratin Treatment",
    category: "Hair Texture",
    salonPrice: 3500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Rebounding",
    category: "Hair Texture",
    salonPrice: 5000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Hair Perming",
    category: "Hair Texture",
    salonPrice: 8000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Hair Botox Treatment",
    category: "Hair Texture",
    salonPrice: 4500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Nanoplastia Treatment",
    category: "Hair Texture",
    salonPrice: 4999,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Straightening",
    category: "Hair Texture",
    salonPrice: 3499,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Elastin Treatment",
    category: "Hair Texture",
    salonPrice: 4500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Collagen Protein Treatment",
    category: "Hair Texture",
    salonPrice: 4000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // D-TAN & BLEACH
  // =========================

  {
    name: "Face",
    category: "D-Tan & Bleach",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Back Half",
    category: "D-Tan & Bleach",
    salonPrice: 200,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Half",
    category: "D-Tan & Bleach",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Hands",
    category: "D-Tan & Bleach",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Half Legs",
    category: "D-Tan & Bleach",
    salonPrice: 350,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Stomach",
    category: "D-Tan & Bleach",
    salonPrice: 200,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Full Body",
    category: "D-Tan & Bleach",
    salonPrice: 2500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // SKIN SERVICES
  // =========================

  {
    name: "Basic Clean-Up",
    category: "Skin Services",
    salonPrice: 700,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Advance Clean-Up",
    category: "Skin Services",
    salonPrice: 1000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Premium Clean-Up",
    category: "Skin Services",
    salonPrice: 1200,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Basic Facial",
    category: "Skin Services",
    salonPrice: 1500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Advance Facial",
    category: "Skin Services",
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Premium Facial",
    category: "Skin Services",
    salonPrice: 2500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Basic Treatment",
    category: "Skin Services",
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Advance Treatment",
    category: "Skin Services",
    salonPrice: 3000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Premium Treatment",
    category: "Skin Services",
    salonPrice: 3500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // SLIDER PACKAGES
  // =========================

  {
    name: "Basic Makeup-Saree Draping",
    category: "Slider Packages",
    salonPrice: 1500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Makeup-Hair Style-Draping",
    category: "Slider Packages",
    salonPrice: 2000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Makeup-Hair Style-Draping-Lashes",
    category: "Slider Packages",
    salonPrice: 3000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Makeup-Hair Style-Draping-Lashes Premium",
    category: "Slider Packages",
    salonPrice: 4000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Makeup-Hair Style-Draping-Lashes & Lens",
    category: "Slider Packages",
    salonPrice: 5000,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  // =========================
  // HAIR CUT SERVICES
  // =========================

  {
    name: "U Cut",
    category: "Hair Cut Services",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Straight Cut",
    category: "Hair Cut Services",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Split Ends Trimming",
    category: "Hair Cut Services",
    salonPrice: 200,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Layer Cut",
    category: "Hair Cut Services",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Step Cut",
    category: "Hair Cut Services",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Butterfly Cut",
    category: "Hair Cut Services",
    salonPrice: 600,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Bob/Lob",
    category: "Hair Cut Services",
    salonPrice: 600,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Wolf/Mullet",
    category: "Hair Cut Services",
    salonPrice: 700,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Front/Curtain Bangs",
    category: "Hair Cut Services",
    salonPrice: 400,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Mens Classic Hair Cut",
    category: "Hair Cut Services",
    salonPrice: 300,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Hair Cut + Beard Combo",
    category: "Hair Cut Services",
    salonPrice: 500,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },

  {
    name: "Kids Cut under 12",
    category: "Hair Cut Services",
    salonPrice: 200,
    homePrice: null,
    homeServiceAvailable: false,
    isActive: true,
  },
];


const seedServices = async () => {
  try {
    await connectDB();

    // Optional:
    // Remove existing services before inserting.
    await Service.deleteMany({});

    const insertedServices = await Service.insertMany(services);

    console.log(
      `✅ ${insertedServices.length} services inserted successfully`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Service seeding failed:", error);
    process.exit(1);
  }
};

seedServices();