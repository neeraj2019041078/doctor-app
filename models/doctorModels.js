const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone no is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  website: {
    type: string,
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  specialization: {
    type: String,
    required: [true, "specialization is required"],
  },
  experience: {
    type: String,
    required: [true, "experience is required"],
  },
  feesPerConsaltation: {
    type: Number,
    required: [true, "fees is required"],
  },
  timings: {
    type: Object,
    required: [true, "work timing is required"],
  },
},{ timestamps : true});

const doctorModel = mongoose.Model("users", doctorSchema);
module.exports = doctorModel;
