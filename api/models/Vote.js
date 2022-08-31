const mongoose = require("mongoose");
const Post = require("./Post");
const User = require("./User");

const VoteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        type: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Vote', VoteSchema);