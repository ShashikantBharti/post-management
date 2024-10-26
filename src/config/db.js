import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(`${MONGO_URI}/${DB_NAME}`, {
      waitQueueTimeoutMS: 5000,
    });
    console.log('Mongo Db Connected');
  } catch (error) {
    console.error(error.message);
  }
};
