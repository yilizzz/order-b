const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bossRoutes = require("./routes/boss");
const clientRoutes = require("./routes/client");
const paymentRoutes = require("./routes/payment");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected !");
  } catch (err) {
    console.log("MongoDB Connection Failed");
    console.error(err);
  }
};
connectDB();

app.use((req, res, next) => {
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

app.use(express.json());

app.use("/boss", bossRoutes);
app.use("/client", clientRoutes);
app.use("/payment", paymentRoutes);

// Define a function to normalize the port value
const normalizePort = (val) => {
  // Parse the value as an integer
  const port = parseInt(val, 10);
  if (!isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// Get the port value from the environment variable PORT or use 3001 as a default
const port = normalizePort(process.env.PORT) || 3001;

app.get("/", (req, res) => {
  res.send("Order me!");
});

app.listen(port, () => {
  console.log(`Order app running`);
});
