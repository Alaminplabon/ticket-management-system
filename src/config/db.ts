import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI not found in environment variables.');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
