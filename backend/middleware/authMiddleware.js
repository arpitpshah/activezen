import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import logToCloudWatch from '../utils/cloudwatchLogger.js'; // Make sure this path is correct

const protect = asyncHandler(async (req, res, next) => {
    let token;

    logToCloudWatch('API Access Attempt', { path: req.path });

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user){
                logToCloudWatch('Token Validation Failed', { reason: 'Invalid token, user not found', token });
                res.status(401);
                throw new Error('Invalid token');
            }

            logToCloudWatch('Token Validation Success', { userId: req.user._id });
            next();
        } catch (error) {
            logToCloudWatch('Token Validation Error', { error: error.message });
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if(!token){
        logToCloudWatch('API Access Denied', { reason: 'No token provided', path: req.path });
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };
