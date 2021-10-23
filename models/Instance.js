const SensorData = require("./SensorData");

const InstanceModel = {
    last_updated: {
      type: Date  
    },
    sensor_data: SensorData,
    sensor_data_array: [{SensorData}]
  };

module.exports = InstanceModel;
