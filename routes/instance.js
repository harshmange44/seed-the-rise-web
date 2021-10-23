const router = require("express").Router();
import { initializeApp } from "firebase/app";
const Instance = require("../models/Instance");
const SensorData = require("../models/SensorData");
const firebaseConfig = {
  apiKey: "AIzaSyA8ZKf8npZI2y1EnHgMsbBv38Cow6y6amc",
  authDomain: "seed-the-rise.firebaseapp.com",
  projectId: "seed-the-rise",
  storageBucket: "seed-the-rise.appspot.com",
  messagingSenderId: "570317396666",
  appId: "1:570317396666:web:939cbe767f24a43ff1c083",
  measurementId: "G-D6J7KY78GD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//INSERT SENSOR DATA (UPDATE NEW)
router.post("/:id", async (req, res) => {
  try {
    const sensorData = req.body.SensorData;
    const inst = await firebaseApp.firestore().collection('instances').doc(req.params.id).update({
      sensor_data_array: firebaseApp.firestore.FieldValue.arrayUnion(sensorData),
      sensor_data: sensorData,
      last_updated: new Date()
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE INSTANCE
router.put("/:id", async (req, res) => {
  try {
    const sensorData = req.body.SensorData;
    const inst = await firebaseApp.firestore().collection('instances').doc(req.params.id).update({
      sensor_data_array: firebaseApp.firestore.FieldValue.arrayUnion(sensorData),
      sensor_data: sensorData,
      last_updated: new Date()
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE INSTANCE
router.delete("/:id", async (req, res) => {
  try {
    const inst = await firebaseApp.firestore().collection('instances').doc(req.params.id).delete();

  } catch (err) {
    res.status(500).json(err);
  }
});

//GET INSTANCE
router.get("/:id", async (req, res) => {
  try {
    const inst = await firebaseApp.firestore().collection('instances').doc(req.params.id).get();
    
    res.status(200).json(inst.data());
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LAST SENSOR DATA
router.get("/:id/sensordata", async (req, res) => {
  try {
    const inst = await firebaseApp.firestore().collection('instances').doc(req.params.id).get();
    const sensor_data = inst.data().sensor_data;
    res.status(200).json(sensor_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SENSOR DATA ARRAY
router.get("/:id/pastsensordata", async (req, res) => {
  try {
    const inst = await firebaseApp.firestore().collection('instances').doc(req.params.id).get();
    const sensor_data_arr = [];
    sensor_data_arr = [...inst.data().sensor_data_array];
    res.status(200).json(sensor_data_arr);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL INSTANCES
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   try {
//     let posts;
//     if (username) {
//       posts = await Post.find({ username });
//     } else if (catName) {
//       posts = await Post.find({
//         categories: {
//           $in: [catName],
//         },
//       });
//     } else {
//       posts = await Post.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
