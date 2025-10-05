import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context'; // Adjust path if necessary
import './comments.css'; 

const CommentInput = ({ postId, parentCommentId, onSuccess }) => {
    const [content, setContent] = useState('');
    const { user } = useContext(Context);
    
    // Fallback if user is not logged in (should be handled by parent component)
    if (!user) return <p className="commentInput-login-prompt">Please log in to comment.</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const newComment = {
                postId,
                userId: user._id, // Assumes your user object has an _id
                username: user.username, // Added for full context/robustness
                content,
                parentCommentId: parentCommentId || null, // Will be null for top-level
            };

            // CRITICAL FIX: Use the full base URL with /api prefix
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/comments/create`, 
                newComment
            );
            
            // Call the callback to update the parent list
            onSuccess(res.data); 
            
            setContent(''); // Clear the input field
        } catch (err) {
            // Log the full error to the console for debugging
            console.error("Error posting comment:", err); 
        }
    };

    return (
        <div className={`commentInput ${parentCommentId ? 'reply-box' : 'main-box'}`}>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder={parentCommentId ? "Write a reply..." : "Join the discussion..."}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={parentCommentId ? 2 : 3}
                    required
                />
                <button type="submit">
                    {parentCommentId ? "Reply" : "Post Comment"}
                </button>
            </form>
        </div>
    );
};

export default CommentInput;
