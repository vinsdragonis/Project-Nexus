// api/models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', // Assuming your Post model is named 'Post'
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming your User model is named 'User'
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        // Adjacency List for threading: links to the parent comment if it's a reply
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Self-reference
            default: null, // Top-level comments have null parent
        },
        // Engagement: Store users who liked the comment
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        // Moderation: Soft-delete flag
        isDeleted: {
            type: Boolean,
            default: false,
        },
        // Moderation: Report flag
        isReported: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true // createdAt and updatedAt
    }
);

module.exports = mongoose.model('Comment', commentSchema);