import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import './comments.css';

const CommentsList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch comments from the backend
    const fetchComments = useCallback(async () => {
        try {
            setLoading(true);
            
            // CRITICAL FIX: Use the full base URL with /api prefix
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/comments/${postId}` 
            );
            
            // The API is expected to return a nested structure (top-level comments with replies inside)
            setComments(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch comments:", err);
            setLoading(false);
        }
    }, [postId]);
    
    // Initial fetch to load comments when the component mounts or postId changes
    useEffect(() => {
        if(postId) {
            fetchComments();
        }
    }, [fetchComments, postId]); 

    // Handler to update the comments list after a successful POST (both new comment and reply)
    // We trigger a full re-fetch to ensure the nested structure is always accurate.
    const handleSuccess = () => {
        fetchComments();
    };
    
    // Handler for handling client-side removal after successful DELETE
    // Triggers a full re-fetch to update the list state.
    const handleDelete = () => {
        fetchComments(); 
    };

    if (loading) {
        return <div className="commentsList-loading">Loading comments...</div>;
    }

    return (
        <div className="commentsList-container">
            <h3 className="commentsList-header">Comments ({comments.length})</h3>
            
            {/* Top-level Comment Input */}
            <CommentInput 
                postId={postId} 
                onSuccess={handleSuccess} 
                parentCommentId={null} // Designates this as the main comment input
            />

            {/* Render the list of top-level comments (which contain their threads recursively) */}
            <div className="commentsList-threads">
                {comments.length === 0 ? (
                    <p className="commentsList-no-comments">Be the first to comment!</p>
                ) : (
                    comments.map((comment) => (
                        <CommentItem 
                            key={comment._id} 
                            comment={comment} 
                            postId={postId}
                            onReplySuccess={handleSuccess} // Replies trigger a list refresh
                            onDelete={handleDelete} // Deletes also trigger a list refresh
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentsList;
