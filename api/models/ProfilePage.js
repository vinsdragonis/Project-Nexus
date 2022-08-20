const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
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
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ProfilePage', ProfileSchema);