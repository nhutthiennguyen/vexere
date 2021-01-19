const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    licensePlate: String,
    seats: Number,
    status: String,
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
