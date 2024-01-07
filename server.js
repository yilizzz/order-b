const express = require("express");
const server = express();
require("dotenv").config();
const path = require("path");

const bossRoutes = require("./routes/boss");
const clientRoutes = require("./routes/client");
const paymentRoutes = require("./routes/payment");
const connectDB = require("./connectDB");

const connectMongoose = new connectDB();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
server.use(express.json());

server.use("/boss", bossRoutes);
server.use("/client", clientRoutes);
server.use("/payment", paymentRoutes);
// Get the port value from the environment variable PORT or use 3001 as a default
const port = process.env.PORT || 3001;
server.get("/", (req, res) => {
  res.send("Order me!");
});

server.listen(port, () => {
  console.log(`Order app running`);
});
