const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(` MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(` MongoDB connection error: ${error.message}`);
    console.error("Full error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
