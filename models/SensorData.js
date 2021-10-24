const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema(
  {
  air: {
    type: Number,
  },
  ldr: {
    type: Number,
  },
  soil: {
    type: Number,
  },
  temperature_humidity: {
    type: Number,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("SensorData", SensorDataSchema);