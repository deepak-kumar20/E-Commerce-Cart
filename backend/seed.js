const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Note: This project fetches products from FakeStore API
// So we don't need to seed products in MongoDB
// This file is kept for potential future use or testing

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected!");

    console.log(
      "No seeding required - products are fetched from FakeStore API"
    );
    console.log(" Cart and Order data will be stored in MongoDB");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
