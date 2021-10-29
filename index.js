const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const instanceRoute = require("./routes/instance");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded(
    { extended:true }
))

app.use("/api/instances", instanceRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running...")
});
