import mongoose from 'mongoose';

const replySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName:{
        type: String,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        trim: true, // Remove whitespace
        maxlength: [500, 'Reply cannot be more than 500 characters'] // Max length validation
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true // Efficient querying by user
    },
    content: {
        type: String,
        required: true,
        trim: true, // Remove whitespace
        maxlength: [1000, 'Message cannot be more than 1000 characters'] // Max length validation
    },
    replies: [replySchema], // Nested replies
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
