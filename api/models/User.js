const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
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
            default: "https://upload.wikimedia.org/wikipedia/en/archive/b/b1/20210811085633%21Portrait_placeholder.png",
        },
        desc: {
            type: String,
            default: "Hey there! I'm new around here...",
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);