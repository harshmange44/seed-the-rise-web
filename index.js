const express = require("express");
const app = express();
const dotenv = require("dotenv");
const instanceRoute = require("./routes/instance");
const bodyParser = require("body-parser");
const path = require("path");
// const { initializeApp } = require('firebase-admin/app');
// import * as admin from "firebase-admin";
const firebase = require('firebase/app');
const initializeApp = require("firebase/app");
const getAnalytics = require("firebase/analytics");

dotenv.config();
app.use(express.json());

app.use(bodyParser.urlencoded(
    { extended:true }
))

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(firebaseApp);

// admin.initializeApp({
//   credential: admin.credential.cert({
//       projectId: process.env.PROJECT_ID,
//       privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
//       clientEmail: process.env.CLIENT_EMAIL,
//   }),
//   databaseURL: process.env.DATABASE_URL
// });

app.use("/api/instances", instanceRoute);

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running...")
});
