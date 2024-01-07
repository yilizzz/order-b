const mongoose = require("mongoose");

module.exports = connectDB;

function connectDB() {
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
}
