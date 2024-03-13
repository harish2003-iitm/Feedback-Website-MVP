import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentList({ feedbackId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/comments/${feedbackId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => console.error('There was an error fetching the comments:', error));
    }, [feedbackId]);

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.CommentID}>
                        <p>{comment.CommentText}</p>
                        {/* You can add more details like commenter's name, date, etc. */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentList;
