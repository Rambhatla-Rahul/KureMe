const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🟢 Connected to MongoDB');
  } catch (error) {
    console.error('🔴 MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
