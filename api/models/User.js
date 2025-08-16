const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
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
        // Password reset (hashed token + expiration)
        resetPasswordToken: {
            type: String,
            default: null,
            index: true,
        },
        resetPasswordExpires: {
            type: Date,
            default: null,
        },
        profilePic: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/924/924874.png",
        },
        desc: {
            type: String,
            default: "Hey there! I'm new around here...",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
