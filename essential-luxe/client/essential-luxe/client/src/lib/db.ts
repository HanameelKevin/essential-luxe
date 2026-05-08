import mongoose from 'mongoose';

// Global cache to prevent multiple connections in development (hot-reload)
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseConnection || {};
}

let isConnected = false;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return mongoose;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('❌ Critical Error: MONGODB_URI is not defined in environment variables.');
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

    isConnected = true;
    console.log('✅ MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    // Retry logic could be implemented here
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('🔌 MongoDB Disconnected');
  }
};
