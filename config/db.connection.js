const mongoose = require('mongoose');
require("dotenv").config()
const {MONGODB_URI} = process.env
console.log("Connected to: "+ MONGODB_URI)

mongoose.connect(MONGODB_URI)

mongoose.connection
  .on("open", () => console.log("Connected to mongoose"))
  .on("close", () => console.log("Disconnected from mongoose"))
  .on("error", (error) => console.log(error));