const mongoose = require("mongoose");
const Post = require("./Post");
const Vote = require("./Vote");

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/924/924874.png",
        },
        desc: {
            type: String,
            default: "Hey there! I'm new around here...",
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        votes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);