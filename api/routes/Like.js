const router = require('express').Router();
const Like = require('../models/Like');
const mongoose = require('mongoose');

//like a post or comment
router.post('/togglelike', async (req, res) => {
    try {
        const { userId, postId } = req.body;
        if (!userId || !postId) {
            return res.status(400).json("User ID and Post/Comment ID are required.");
        }
        // check if the like already exists
        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            return res.status(200).json("Like removed successfully.");
        }
        // create a new like
        const newLike = new Like({
            user: userId,
            post: postId
        });
        await newLike.save();
        res.status(201).json("Post/Comment liked successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;