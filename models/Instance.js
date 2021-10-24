const mongoose = require("mongoose");

const InstanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    last_updated: {
      type: Date  
    },
    sensor_data: {
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
    sensor_data_array: [{
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
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instance", InstanceSchema);