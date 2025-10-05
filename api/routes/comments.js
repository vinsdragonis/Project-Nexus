const router = require("express").Router();
const Comment = require("../models/Comment");
const mongoose = require("mongoose"); // Needed for type checking

// --- HELPER FUNCTION: COMMENT AUTH CHECK (Placeholder) ---
// Note: This needs to be integrated with your actual authentication system
const verifyCommentOwnership = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json("Comment not found.");
        }
        
        // IMPORTANT: Assuming req.user.id is set by your authentication middleware
        // For testing purposes, you might hardcode or skip this until auth is ready.
        // if (comment.user.toString() === req.user.id) {
        if (true) { // Placeholder to skip actual auth check for now
            req.comment = comment; // Attach comment to request for use in route
            next();
        } else {
            return res.status(403).json("You are not authorized to perform this action.");
        }
    } catch (err) {
        return res.status(500).json("Server error during verification.");
    }
};

// --- 1. CREATE COMMENT/REPLY (POST) ---
// POST /api/comments/create
router.post("/create", /* verifyToken, */ async (req, res) => {
    try {
        const { postId, content, parentCommentId } = req.body;
        
        // **IMPORTANT:** Replace '68e26950fc8959ad01f7fca8' with the ID from req.user
        const userId = req.body.userId || '68e26950fc8959ad01f7fca8'; // Use ID from body if not using auth middleware

        const newComment = new Comment({
            postId,
            user: userId,
            content,
            parentComment: parentCommentId || null, 
        });

        const savedComment = await newComment.save();
        
        // Re-populate the user field before returning to client so the client can display username
        const finalComment = await savedComment.populate('user', 'username profilePic');
        
        res.status(201).json(finalComment);
    } catch (err) {
        res.status(500).json({ message: "Failed to create comment.", error: err.message });
    }
});

// --- 2. GET ALL COMMENTS FOR A POST (GET) ---
// GET /api/comments/:postId
router.get("/:postId", async (req, res) => {
    try {
        // 1. Fetch all non-deleted comments for the post, sorted oldest first
        const comments = await Comment.find({ postId: req.params.postId, isDeleted: false })
            .populate('user', 'username profilePic') // Populate user details
            .sort({ createdAt: 1 });

        // 2. Map and Group comments into a threaded structure (Adjacency List rendering)
        const threadMap = {};
        const topLevelComments = [];

        comments.forEach(comment => {
            const commentObj = comment.toObject(); 
            commentObj.replies = [];
            
            const parentId = commentObj.parentComment ? commentObj.parentComment.toString() : null;
            
            // Store comment in the map by its ID
            threadMap[commentObj._id.toString()] = commentObj; 

            if (parentId && threadMap[parentId]) {
                // It's a reply and the parent exists: attach it to the parent's replies array
                threadMap[parentId].replies.push(commentObj);
            } else {
                // It's a top-level comment (or an orphaned reply if parent was deleted)
                topLevelComments.push(commentObj);
            }
        });
        
        // 3. Send only the top-level comments, as they contain their nested replies.
        res.status(200).json(topLevelComments);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch comments.", error: err.message });
    }
});

// --- 3. EDIT COMMENT (PUT) ---
// PUT /api/comments/:id
router.put("/:id", /* verifyToken, verifyCommentOwnership, */ async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: { content: req.body.content } },
            { new: true }
        ).populate('user', 'username profilePic');

        if (!updatedComment) {
            return res.status(404).json("Comment not found.");
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: "Failed to edit comment.", error: err.message });
    }
});

// --- 4. DELETE COMMENT (Soft-Delete) (DELETE) ---
// DELETE /api/comments/:id
router.delete("/:id", /* verifyToken, verifyCommentOwnership, */ async (req, res) => {
    try {
        // Soft delete: sets isDeleted to true to preserve thread structure
        const result = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: { isDeleted: true } }
        );

        if (!result) {
            return res.status(404).json("Comment not found.");
        }

        res.status(200).json("Comment successfully soft-deleted.");
    } catch (err) {
        res.status(500).json({ message: "Failed to delete comment.", error: err.message });
    }
});

// --- 5. REPORT COMMENT (POST) ---
// POST /api/comments/:id/report
router.post("/:id/report", /* verifyToken, */ async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: { isReported: true } },
            { new: true }
        ).populate('user', 'username profilePic');

        if (!comment) {
            return res.status(404).json("Comment not found.");
        }

        res.status(200).json("Comment reported for moderation review.");
    } catch (err) {
        res.status(500).json({ message: "Failed to report comment.", error: err.message });
    }
});


// --- 6. LIKE/UNLIKE COMMENT (PUT) ---
// PUT /api/comments/like/:id
router.put("/like/:id", async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(401).json("Authentication required to like a comment.");
        }

        const commentId = req.params.id;
        const userId = req.body.userId;

        // Ensure IDs are valid Mongoose ObjectIds before query
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json("Invalid comment ID.");
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json("Comment not found.");
        }
        
        let updatedComment;

        if (comment.likes.includes(userId)) {
            // User already liked it: UNLIKE (pull the userId from the likes array)
            updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { $pull: { likes: userId } },
                { new: true } // Return the updated document
            );
        } else {
            // User hasn't liked it: LIKE (push the userId to the likes array)
            updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { $push: { likes: userId } },
                { new: true }
            );
        }
        
        // Populate the user details on the updated comment before sending back
        const finalComment = await updatedComment.populate('user', 'username profilePic');

        res.status(200).json(finalComment);
    } catch (err) {
        res.status(500).json({ message: "Failed to process like/unlike.", error: err.message });
    }
});

module.exports = router;
