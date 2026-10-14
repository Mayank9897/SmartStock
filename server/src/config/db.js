import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartstock';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000, // Quick timeout to handle offline gracefully
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${mongoUri}.`);
    console.warn(`[Database Info] Application will run in resilient local mock-data mode.`);
    return null;
  }
};

export default connectDB;

