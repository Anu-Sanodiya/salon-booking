const mongoose = require("mongoose");

const { Schema } = mongoose;

/* =========================================================
   USER

   Roles:
   - ADMIN
   - SUPPORT
   - CUSTOMER
========================================================= */

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "SUPPORT", "CUSTOMER"],
      default: "CUSTOMER",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   SERVICE CATEGORY

   Example:
   - Hair Services
   - Hair Care
   - Waxing
   - Skin Services
========================================================= */

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   SERVICE PRICING OPTION

   Used when one service has multiple pricing options.

   Example:

   Extensions
   - Short       ₹799
   - Long        ₹1199

   Acrylic Nails
   - Basic       ₹2000
   - Premium     ₹2500

   Home price can be null if home service is not configured.
========================================================= */

const pricingOptionSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    salonPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    homePrice: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  {
    _id: true,
  }
);


/* =========================================================
   SERVICE

   All service information comes from MongoDB.

   Admin can:
   - Create service
   - Update service
   - Delete service
   - Change salon price
   - Change home price
   - Enable/disable home service
   - Enable/disable service
   - Mark service as popular
========================================================= */

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 30,
      min: 1,
    },

    // Price when customer visits salon
    salonPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Price when salon provides service at customer's home
    // null = home price has not been configured
    homePrice: {
      type: Number,
      default: null,
      min: 0,
    },

    image: {
      type: String,
      default: "",
    },

    popular: {
      type: Boolean,
      default: false,
    },

    // Whether customer can select home service
    homeServiceAvailable: {
      type: Boolean,
      default: false,
    },

    // Soft enable/disable
    isActive: {
      type: Boolean,
      default: true,
    },

    // Multiple pricing options
    options: [pricingOptionSchema],
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   STAFF
========================================================= */

const staffSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },

    designation: {
      type: String,
      default: "Stylist",
    },

    // Services this staff member can perform
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },

    homeServiceAvailable: {
      type: Boolean,
      default: false,
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   CUSTOMER ADDRESS

   Used for HOME_SERVICE appointments.
========================================================= */

const addressSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    addressLine: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   APPOINTMENT

   Stores customer booking information.

   Service Type:
   - AT_SALON
   - HOME_SERVICE

   Status:
   - PENDING
   - CONFIRMED
   - IN_PROGRESS
   - COMPLETED
   - CANCELLED
   - NO_SHOW
========================================================= */

const appointmentSchema = new Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },

        // Store service name at booking time
        // so historical booking data remains intact
        serviceName: {
          type: String,
          required: true,
        },

        // Price actually charged at booking time
        price: {
          type: Number,
          required: true,
        },

        duration: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    serviceType: {
      type: String,
      enum: ["AT_SALON", "HOME_SERVICE"],
      default: "AT_SALON",
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    // Required only for home service
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
        "NO_SHOW",
      ],
      default: "PENDING",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   PAYMENT

   Supports:
   - Razorpay
   - Cash
   - UPI
   - Card

   Status:
   - PENDING
   - SUCCESS
   - FAILED
   - REFUNDED
========================================================= */

const paymentSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["RAZORPAY", "CASH", "UPI", "CARD"],
      default: "RAZORPAY",
    },

    razorpayOrderId: {
      type: String,
      default: null,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   SUPPORT CONVERSATION

   Customer can communicate with support regarding
   appointment confirmation, timing, etc.
========================================================= */

const conversationSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    supportAgent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   CHAT MESSAGE
========================================================= */

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   REVIEW
========================================================= */

const reviewSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   MODELS
========================================================= */

const User = mongoose.model("User", userSchema);

const Category = mongoose.model("Category", categorySchema);

const Service = mongoose.model("Service", serviceSchema);

const Staff = mongoose.model("Staff", staffSchema);

const Address = mongoose.model("Address", addressSchema);

const Appointment = mongoose.model("Appointment", appointmentSchema);

const Payment = mongoose.model("Payment", paymentSchema);

const Conversation = mongoose.model("Conversation", conversationSchema);

const Message = mongoose.model("Message", messageSchema);

const Review = mongoose.model("Review", reviewSchema);


/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  User,
  Category,
  Service,
  Staff,
  Address,
  Appointment,
  Payment,
  Conversation,
  Message,
  Review,
};