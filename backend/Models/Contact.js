const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [50, "Name shuld have less than 50 characters"],
  },
  address: {
    type: String,
    required: true,
    maxLength: [50, "Address shuld have less than 50 characters"],
  },
  phone: {
    type: Number,
    required: true,
    min: [
      8,
      ,
      "Phone number shuld have more than 8 digits and less than 12 digits",
    ],
    max: 12,
  },
  email: {
    type: String,
    required: true,
    maxLength: [50, "Email shuld have less than 50 characters"],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
