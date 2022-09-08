const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Vote = require("../models/Vote");
var sanitize = require('mongo-sanitize');

// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        let user = await User.findOneAndUpdate({_id: sanitize(req.body.user)}, {$push: {posts: newPost}});
        res.status(200).json(savedPost);
    } catch (err) {
        // res.status(500).json(err);
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {
                        new: true
                    }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        // console.log(post.user);
        if (post.user.username === req.body.username) {
            try {
                await post.delete();
                await User.findOneAndUpdate({username: sanitize(req.body.username)}, {$pull: {posts: post._id}});
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(['user', 'votes']);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        
        if (username) {
            posts = await Post.find({ username }).populate('user');
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            }).populate('user');
        } else {
            posts = await Post.find().populate('user');
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPVOTE A POST
router.post("/upvote", async (req, res) => {
    let currentVotes = await Post.findById(sanitize(req.body.post)).populate('votes');
    currentVotes = currentVotes.votes;

    let alreadyVoted = (vote) => vote.user == req.body.user;

    if(currentVotes.some(alreadyVoted)){
        let message = {
            error: "duplicate entry"
        }
        res.status(400).json(message);
    }else{
        let newVote = new Vote(req.body);
        await newVote.save();
        const thePost = await Post.findOneAndUpdate({_id: sanitize(req.body.post)}, {$push: {votes: newVote}});
        const theUser = await User.findOneAndUpdate({_id: sanitize(req.body.user)}, {$push: {votes: newVote}});
        res.status(200).json(newVote);
    }
})

module.exports = router;
