import React, { useState, useContext, useEffect } from 'react'; 
import axios from 'axios'; 
import { Context } from '../../context/Context'; 
import CommentInput from './CommentInput';
import './comments.css';

const CommentItem = ({ comment, postId, onReplySuccess, onDelete }) => {
    const { user } = useContext(Context);
    // CRITICAL: Use local state for the comment to enable UI updates (like count)
    const [localComment, setLocalComment] = useState(comment); 
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); 

    // Sync local state when the parent comment object changes (e.g., when a new reply is posted)
    useEffect(() => {
        setLocalComment(comment);
    }, [comment]);

    // Helper function to format the comment date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };
    
    // Check if the current logged-in user owns the comment
    const isOwner = user && localComment.user && localComment.user._id === user._id;

    // Check if the current user has already liked the comment
    const isLiked = user && localComment.likes.includes(user._id);

    // --- NEW: Handle Like/Unlike Logic ---
    const handleLike = async () => {
        if (!user) {
            console.log("Please log in to like a comment.");
            return;
        }

        try {
            // API call to toggle like status
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/comments/like/${localComment._id}`,
                { userId: user._id }
            );

            // Update local state with the new comment data (contains updated likes array)
            // This line is essential for updating the UI count immediately
            setLocalComment(response.data); 

        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };
    // ------------------------------------

    // Actual delete logic with API call
    const confirmDelete = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/api/comments/${localComment._id}`, // Use localComment ID
                { data: { userId: user._id } } // Send userId in the body for authorization
            );
            // On successful deletion, call the parent function to trigger a list refresh
            onDelete(); 
        } catch (err) {
            console.error("Error deleting comment:", err);
        } finally {
            setIsConfirmingDelete(false); 
        }
    };

    return (
        <div className="commentItem-container">
            <div className={`commentItem ${localComment.parentComment ? 'is-reply' : ''}`}>
                <div className="commentItem-header">
                    <img
                        className="commentItem-avatar"
                        // Use a simple placeholder for missing profile pictures
                        src={localComment.user.profilePic || 'https://placehold.co/30x30/cccccc/ffffff?text=A'} 
                        alt="User Avatar"
                    />
                    <div className="commentItem-meta">
                        <span className="commentItem-username">{localComment.user.username}</span>
                        <span className="commentItem-date">{formatDate(localComment.createdAt)}</span>
                    </div>
                </div>

                <p className="commentItem-content">{localComment.content}</p>

                <div className="commentItem-actions">
                    <button 
                        className={`action-button ${isLiked ? 'liked' : ''}`} // Apply 'liked' class if user liked it
                        onClick={handleLike} // Call the handleLike function
                    >
                        {isLiked ? 'Unlike' : 'Like'} ({localComment.likes?.length || 0})
                    </button>
                    <button 
                        className="action-button" 
                        onClick={() => setShowReplyInput(!showReplyInput)}
                        disabled={isConfirmingDelete}
                    >
                        Reply
                    </button>
                    <button className="action-button report-button" onClick={() => console.log('Report clicked')}>Report</button>
                    
                    {isOwner && !isConfirmingDelete && (
                        <>
                            <button className="action-button edit-button" onClick={() => console.log('Edit clicked')}>Edit</button>
                            {/* Trigger confirmation UI */}
                            <button className="action-button delete-button" onClick={() => setIsConfirmingDelete(true)}>Delete</button>
                        </>
                    )}
                </div>
            </div>
            
            {/* Custom Confirmation UI (Visible when isConfirmingDelete is true) */}
            {isConfirmingDelete && (
                <div className="delete-confirmation-box">
                    <p>Are you sure you want to delete this comment?</p>
                    <button className="delete-confirm-button" onClick={confirmDelete}>Confirm Delete</button>
                    <button className="delete-cancel-button" onClick={() => setIsConfirmingDelete(false)}>Cancel</button>
                </div>
            )}

            {/* Conditional Reply Input */}
            {showReplyInput && user && (
                <div className="reply-input-wrapper">
                    <CommentInput 
                        postId={postId} 
                        parentCommentId={localComment._id} 
                        // Hide reply input on successful post
                        onSuccess={() => { onReplySuccess(); setShowReplyInput(false); }}
                    />
                </div>
            )}

            {/* Recursive Rendering of Replies */}
            {localComment.replies && localComment.replies.length > 0 && (
                <div className="commentItem-replies">
                    {localComment.replies.map((reply) => (
                        <CommentItem 
                            key={reply._id} 
                            comment={reply} 
                            postId={postId} 
                            onReplySuccess={onReplySuccess}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
