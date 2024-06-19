import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import logToCloudWatch from './utils/cloudwatchLogger.js'; // Make sure this path is correct

dotenv.config();

// Logging Database Connection
connectDB().then(() => logToCloudWatch('Database Connection', { status: 'success' }))
            .catch((error) => logToCloudWatch('Database Connection Error', { error: error.message }));

const app = express();
app.use(cors());
app.use(express.json());

// Logging Middleware for Incoming Requests
app.use((req, res, next) => {
    logToCloudWatch('Incoming Request', { method: req.method, url: req.url });
    next();
});

app.get('/', (req, res) => {
    res.send('API is running.....');
    logToCloudWatch('Root Endpoint Hit', {});
});

// Route Middlewares
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);

// Not Found Middleware
app.use(notFound);

// Error Handler Middleware - Enhanced with Logging
app.use((error, req, res, next) => {
    logToCloudWatch('Unhandled Error', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
    });
    errorHandler(error, req, res, next);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    logToCloudWatch('Server Start', { status: 'success', port, mode: process.env.NODE_ENV });
});
