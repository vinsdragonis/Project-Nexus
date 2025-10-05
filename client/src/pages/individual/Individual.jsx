import React, { useState, useCallback } from 'react';

// Existing Imports
import Sidebar from '../../components/sidebar/Sidebar';
// CORRECTED: Ensure this path matches your directory name (e.g., 'individualPost')
import IndividualPost from '../../components/indvidualPost/IndividualPost'; 
import Categories from '../../components/categories/Categories';
import './individual.css';
// CORRECTED: Import from the 'comments' folder
import CommentsList from '../../components/comment/CommentsList'; 


export default function Individual() {
    const [postData, setPostData] = useState(null); 
    
    const handlePostLoaded = useCallback((data) => {
        setPostData(data);
    }, []);

    return (
        // This outer div will use Flexbox in CSS to establish the column layout
        <div className="individual">
            
            {/* 1. MAIN CONTENT COLUMN (Post + Categories + Comments) */}
            <div className="individual-main-content">
                
                <Categories /> 

                <IndividualPost onPostLoaded={handlePostLoaded} /> 
                
                {/* Comments Section is rendered only after post data is available */}
                {postData && postData._id && (
                    <div className="comments-section-wrapper">
                        <CommentsList postId={postData._id} />
                    </div>
                )}
            </div>
            
            {/* 2. SIDEBAR COLUMN */}
            <div className="individual-sidebar-area">
                 <Sidebar />
            </div>
        </div>
    );
}
