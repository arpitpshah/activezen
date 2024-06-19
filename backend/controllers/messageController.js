import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import logToCloudWatch from '../utils/cloudwatchLogger.js';
import User from '../models/userModel.js';

// @desc    Add a new message
// @route   POST /api/messages
// @access  Private

export const addMessage = asyncHandler(async (req, res) => {
    const { content } = req.body;

    try {
        logToCloudWatch('Adding Message Start', { user: req.user._id, content });
        const message = new Message({
            user: req.user._id,
            content,
            replies: [],
            likes: [],
            dislikes: []
        });

        const createdMessage = await message.save();
        logToCloudWatch('Message Added Successfully', { messageId: createdMessage._id });
        res.status(201).json(createdMessage);
    } catch (error) {
        logToCloudWatch('Error Adding Message', { error: error.message, user: req.user._id });
        res.status(500).json({ message: 'Error adding message', error: error.message });
    }
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
export const getMessages = asyncHandler(async (req, res) => {
    try {
        logToCloudWatch('Fetching All Messages Start', {});
        const messages = await Message.find({}).populate('user', 'firstName lastName');
        logToCloudWatch('Messages Fetched Successfully', { count: messages.length });
        res.json(messages);
    } catch (error) {
        logToCloudWatch('Error Fetching Messages', { error: error.message });
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
export const getMessageById = asyncHandler(async (req, res) => {
    try {
        logToCloudWatch('Fetching Message by ID Start', { id: req.params.id });
        const message = await Message.findById(req.params.id).populate('user', 'firstName lastName');

        if (message) {
            logToCloudWatch('Message Fetched Successfully', { id: req.params.id });
            res.json(message);
        } else {
            logToCloudWatch('Message Not Found', { id: req.params.id });
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        logToCloudWatch('Error Fetching Message by ID', { error: error.message, id: req.params.id });
        res.status(500).json({ message: 'Error fetching message', error: error.message });
    }
});


// @desc    Like a message
// @route   PUT /api/messages/:id/like
// @access  Private
export const likeMessage = asyncHandler(async (req, res) => {
    try {
        logToCloudWatch('Liking a Message Start', { messageId: req.params.id, userId: req.user._id });
        const message = await Message.findById(req.params.id);

        if (!message) {
            logToCloudWatch('Message to Like Not Found', { messageId: req.params.id });
            res.status(404).json({ message: 'Message not found' });
            return;
        }

        const alreadyLiked = message.likes.includes(req.user._id);
        if (alreadyLiked) {
            message.likes.pull(req.user._id);
        } else {
            message.likes.push(req.user._id);
        }

        await message.save();
        logToCloudWatch('Message Liked Successfully', { messageId: req.params.id, liked: !alreadyLiked });
        res.json(message);
    } catch (error) {
        logToCloudWatch('Error Liking Message', { error: error.message, messageId: req.params.id });
        res.status(500).json({ message: 'Error liking message', error: error.message });
    }
});


// @desc    Dislike a message
// @route   PUT /api/messages/:id/dislike
// @access  Private
export const dislikeMessage = asyncHandler(async (req, res) => {
    try {
        logToCloudWatch('Disliking a Message Start', { messageId: req.params.id, userId: req.user._id });
        const message = await Message.findById(req.params.id);

        if (!message) {
            logToCloudWatch('Message to Dislike Not Found', { messageId: req.params.id });
            res.status(404).json({ message: 'Message not found' });
            return;
        }

        const alreadyDisliked = message.dislikes.includes(req.user._id);
        if (alreadyDisliked) {
            message.dislikes.pull(req.user._id);
        } else {
            message.dislikes.push(req.user._id);
        }

        await message.save();
        logToCloudWatch('Message Disliked Successfully', { messageId: req.params.id, disliked: !alreadyDisliked });
        res.json(message);
    } catch (error) {
        logToCloudWatch('Error Disliking Message', { error: error.message, messageId: req.params.id });
        res.status(500).json({ message: 'Error disliking message', error: error.message });
    }
});


// @desc    Reply to a message
// @route   POST /api/messages/:id/reply
// @access  Private
export const replyToMessage = asyncHandler(async (req, res) => {
    const { content } = req.body;

    try {
        logToCloudWatch('Attempting to Reply to Message', { messageId: req.params.id, replierId: req.user._id, content });
        const parentMessage = await Message.findById(req.params.id);

        if (!parentMessage) {
            logToCloudWatch('Parent Message Not Found for Reply', { messageId: req.params.id });
            res.status(404).json({ message: 'Parent message not found' });
            return;
        }

        const reply = {
            user: req.user._id,
            firstName:req.user.firstName,
            lastname:req.user.lastName,
            content,
        };

        parentMessage.replies.push(reply);
        await parentMessage.save();
        logToCloudWatch('Reply Added Successfully', { messageId: req.params.id, replyId: reply._id });
        res.status(201).json(reply);
    } catch (error) {
        logToCloudWatch('Error Replying to Message', { error: error.message, messageId: req.params.id });
        res.status(500).json({ message: 'Error replying to message', error: error.message });
    }
});


// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = asyncHandler(async (req, res) => {
    try {
        logToCloudWatch('Attempting to Delete Message', { messageId: req.params.id, userId: req.user._id });
        const message = await Message.findById(req.params.id);

        if (!message) {
            logToCloudWatch('Message to Delete Not Found', { messageId: req.params.id });
            res.status(404).json({ message: 'Message not found' });
            return;
        }

        // Add additional authorization logic here as necessary
        await Message.deleteOne({ _id: req.params.id });
        logToCloudWatch('Message Deleted Successfully', { messageId: req.params.id });
        res.json({ message: 'Message removed' });
    } catch (error) {
        logToCloudWatch('Error Deleting Message', { error: error.message, messageId: req.params.id });
        res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
});


// @desc    Edit a message
// @route   PUT /api/messages/:id
// @access  Private
export const editMessage = asyncHandler(async (req, res) => {
    try {
        logToCloudWatch('Attempting to Edit Message', { messageId: req.params.id, userId: req.user._id, newContent: req.body.content });
        const message = await Message.findById(req.params.id);

        if (!message) {
            logToCloudWatch('Message to Edit Not Found', { messageId: req.params.id });
            res.status(404).json({ message: 'Message not found' });
            return;
        }

        // Ensure the user owns the message or is an admin
        // Add additional authorization logic here as necessary
        message.content = req.body.content || message.content;
        await message.save();
        const userDetails = await fetchUserProfile(message.user);
        if (!userDetails) {
            // Handle case where userDetails might not exist
            return res.status(404).json({ message: 'User not found' });
        }

        // Adjust the message object before sending it back
        const updatedMessage = message.toObject();
        updatedMessage.user = userDetails;

        // Single point of sending response
        logToCloudWatch('Message Edited Successfully', { messageId: req.params.id, updatedContent: req.body.content });
        res.json(updatedMessage);
    } catch (error) {
        logToCloudWatch('Error Editing Message', { error: error.message, messageId: req.params.id });
        res.status(500).json({ message: 'Error editing message', error: error.message });
    }
});

const fetchUserProfile = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            return {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            };
        } else {
            return null;
        }
    } catch (error) {
        // Handle any errors that occur during fetching user
        console.error("Error fetching user profile:", error);
        return null;
    }
};

