const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' || 'Comment',
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);