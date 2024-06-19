import mongoose from "mongoose";
import logToCloudWatch from '../utils/cloudwatchLogger.js'; // Ensure the path is correct

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        logToCloudWatch('MongoDB Connection Successful', { host: conn.connection.host });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        logToCloudWatch('MongoDB Connection Error', { error: error.message });
        process.exit(1);
    }
};

export default connectDB;
