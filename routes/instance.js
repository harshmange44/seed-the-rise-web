const router = require("express").Router();
const Instance = require("../models/Instance");
const SensorData = require("../models/SensorData");

//INSERT SENSOR DATA (UPDATE NEW)
router.post("/:id", async (req, res) => {

  const air = req.body.air;
  const soil = req.body.soil;
  const ldr = req.body.ldr;
  const temperature_humidity = req.body.temperature_humidity;
  
  const retrievedSensorData = {
    air: air,
    soil: soil,
    ldr: ldr,
    temperature_humidity: temperature_humidity
  };

  const newInst = new Instance({
      last_updated: new Date(),
      name: req.params.id,
      sensor_data: retrievedSensorData,
      sensor_data_array: [retrievedSensorData]
  });
  try {
    const savedInst = await newInst.save();
    res.status(200).json(savedInst);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE INSTANCE
router.put("/:id", async (req, res) => {
      try {
        const air = req.body.air;
        const soil = req.body.soil;
        const ldr = req.body.ldr;
        const temperature_humidity = req.body.temperature_humidity;
        const inst = await Instance.find({name: req.params.id});

        const updatedInst = await Instance.findByIdAndUpdate(
          inst._id,
          {
            $set: {
              last_updated: new Date(),
              sensor_data: req.body,
            }
          },
          { new: true }
        );
        res.status(200).json(updatedInst);
      } catch (err) {
        res.status(500).json(err);
      }

});

//DELETE INSTANCE
router.delete("/:id", async (req, res) => {
  try {
    const inst = await Instance.find({name: req.params.id});
    await inst.delete();
    res.status(200).json("Instance has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET INSTANCE
router.get("/:id", async (req, res) => {
  try {    
    const inst = await Instance.find({name: req.params.id});
    res.status(200).json(inst);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LAST SENSOR DATA
router.get("/sensordata/:id", async (req, res) => {
  try {
    const sensor_data = await Instance.findOne({name: req.params.id}, {sensor_data: 1});
    res.status(200).json(sensor_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SENSOR DATA ARRAY
router.get("/pastsensordata/:id/", async (req, res) => {
  try {
    const sensor_data_array = await Instance.findOne({name: req.params.id}, {sensor_data_array: 1});
    res.status(200).json(sensor_data_array);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
