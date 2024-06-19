import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import logToCloudWatch from '../utils/cloudwatchLogger.js'; // Adjust the import path as necessary

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password,recaptchaToken } = req.body;
    logToCloudWatch('Auth User Attempt', { email });
    if (!await validateCaptcha(recaptchaToken)) {
        res.status(400).json({ message: 'CAPTCHA validation failed' });
    }
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        logToCloudWatch('Auth User Success', { userId: user._id });
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            location: user.location,
            interests: user.interests,
            dietaryPreferences: user.dietaryPreferences,
            goals: user.goals,
            token: generateToken(user._id)
        });
    }else{
        logToCloudWatch('Auth User Failed', { email });
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { email } = req.body;
    logToCloudWatch('Register User Attempt', { email });
    
    const userExist = await User.findOne({ email });

    if(userExist){
        logToCloudWatch('Register User Failed - User Exists', { email });
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create(req.body);

    if(user){
        logToCloudWatch('Register User Success', { userId: user._id });
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            location: user.location,
            interests: user.interests,
            dietaryPreferences: user.dietaryPreferences,
            goals: user.goals,
            token: generateToken(user._id)
        });
    }else{
        logToCloudWatch('Register User Failed - Invalid Data', { email });
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    logToCloudWatch('Get User Profile Attempt', { userId: req.user._id });
    
    const user = await User.findById(req.user._id);

    if(user){
        logToCloudWatch('Get User Profile Success', { userId: user._id });
        res.json(user);
    }else{
        logToCloudWatch('Get User Profile Failed - Not Found', { userId: req.user._id });
        res.status(401);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    logToCloudWatch('Update User Profile Attempt', { userId: req.user._id });
    const user = await User.findById(req.user._id);

    if(user){
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.interests=req.body.interests;
        // Add additional fields as necessary
        const updatedUser = await user.save();
        logToCloudWatch('Update User Profile Success', { userId: updatedUser._id });

        res.json(updatedUser);
    }else{
        logToCloudWatch('Update User Profile Failed - Not Found', { userId: req.user._id });
        res.status(401);
        throw new Error('User not found');
    }
});

async function validateCaptcha(token) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', // You can specify the Content-Type header here
        },
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('CAPTCHA validation error:', error);
      return false;
    }
}


export { authUser, registerUser, getUserProfile, updateUserProfile };
