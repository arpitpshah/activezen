import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addMessage, getMessageById, getMessages, likeMessage, dislikeMessage, replyToMessage, deleteMessage, editMessage } from '../controllers/messageController.js';

const router = express.Router();

// Route for posting a new message
router.route('/').post(protect, addMessage);

// Route for getting all messages
router.route('/').get(protect, getMessages);

// Routes for liking, disliking, replying, editing, and deleting a message
router.route('/:id')
    .get(getMessageById)
    .put(protect, editMessage)
    .delete(protect, deleteMessage);

router.route('/:id/like').put(protect, likeMessage);
router.route('/:id/dislike').put(protect, dislikeMessage);
router.route('/:id/reply').post(protect, replyToMessage);

export default router;
