const router = require("express").Router();
// const firebase = require('firebase/app');
// const initializeApp = require("firebase/app");
const Instance = require("../models/Instance");
const SensorData = require("../models/SensorData");

// const firebaseConfig = {
//   apiKey: "AIzaSyA8ZKf8npZI2y1EnHgMsbBv38Cow6y6amc",
//   authDomain: "seed-the-rise.firebaseapp.com",
//   projectId: "seed-the-rise",
//   storageBucket: "seed-the-rise.appspot.com",
//   messagingSenderId: "570317396666",
//   appId: "1:570317396666:web:939cbe767f24a43ff1c083",
//   measurementId: "G-D6J7KY78GD"
// };
// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// const serviceAccount = require('../seed-the-rise-firebase-adminsdk-d6o12-2b144b7636.json');

// initializeApp({
//   credential: cert(serviceAccount)
// });

// const firebaseApp = getFirestore();

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);


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

        const updatedInst = await inst.update(
          {
            $set: {
              last_updated: new Date(),
              sensor_data: {
                air: air,
                soil: soil,
                ldr: ldr,
                temperature_humidity: temperature_humidity
              },

              $push: {
                sensor_data_array: {
                  air: air,
                  soil: soil,
                  ldr: ldr,
                  temperature_humidity: temperature_humidity
                }
              } 
            },
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
router.get("/:id/sensordata", async (req, res) => {
  try {
    const inst = await Instance.find({name: req.params.id});
    const sensor_data = inst.get('sensor_data');
    res.status(200).json(sensor_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SENSOR DATA ARRAY
router.get("/:id/pastsensordata", async (req, res) => {
  try {
    const inst = await Instance.find({name: req.params.id});
    const sensor_data_arr = [];
    sensor_data_arr = [...inst.get('sensor_data_array')];
    res.status(200).json(sensor_data_arr);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
