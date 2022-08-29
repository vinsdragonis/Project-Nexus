const mongoose = require("mongoose");
const User = require("./User");
const Vote = require("./Vote");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        },
        votes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);