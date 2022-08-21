require("dotenv").config()
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const http = require('http');
const request = require('require')

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id}).sort({date: -1});
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});    

//GET ALL POST EXCEPT THE USER'S

 request.get('https://shrouded-basin-56205.herokuapp.com/api/posts', (res) => {
    res.setEncoding('utf8');
    res.on('error', console.log)
    res.on('data', function (body) {
        console.log(body)
 })
    })
module.exports = router;