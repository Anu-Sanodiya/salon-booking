const {
  Booking,
  Service,
  Staff,
} = require("../models/model");


// =====================================================
// CREATE BOOKING
// =====================================================

const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      staffId,
      customerName,
      customerPhone,
      customerEmail,
      date,
      time,
      location,
      notes,
    } = req.body;


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (
      !serviceId ||
      !staffId ||
      !customerName ||
      !customerPhone ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Service, staff, customer details, date, time and location are required",
      });
    }


    // -----------------------------------------------
    // FIND SERVICE
    // -----------------------------------------------

    const service =
      await Service.findOne({
        _id: serviceId,
        isActive: true,
      });


    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }


    // -----------------------------------------------
    // FIND STAFF
    // -----------------------------------------------

    const staff =
      await Staff.findOne({
        _id: staffId,
        isActive: true,
        availability: "AVAILABLE",
      });


    if (!staff) {
      return res.status(400).json({
        success: false,
        message:
          "Selected staff member is not available",
      });
    }


    // -----------------------------------------------
    // CALCULATE PRICE
    // -----------------------------------------------

    let price = service.salonPrice;


    if (location === "HOME") {

      if (
        service.homePrice === null ||
        service.homePrice === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Home service is not available for this service",
        });
      }

      price = service.homePrice;
    }


    // -----------------------------------------------
    // CHECK SLOT
    // -----------------------------------------------

    const existingBooking =
      await Booking.findOne({
        staffId,
        date,
        time,
        status: {
          $in: [
            "PENDING",
            "CONFIRMED",
          ],
        },
      });


    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked for this professional",
      });
    }


    // -----------------------------------------------
    // CREATE BOOKING
    // -----------------------------------------------

    const booking =
      await Booking.create({
        serviceId,
        staffId,

        customerName,
        customerPhone,
        customerEmail:

          customerEmail || "",

        date,
        time,

        location,

        notes:
          notes || "",

        price,

        status: "PENDING",

        paymentStatus:
          "PENDING",
      });


    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "Appointment created successfully",

      data: booking,
    });

  } catch (error) {

    console.error(
      "Create booking error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create appointment",
    });
  }
};


module.exports = {
  createBooking,
};