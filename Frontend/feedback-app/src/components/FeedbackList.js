import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentList from './CommentList'; // Ensure this path is correct
import VoteButton from './VoteButton'; // Ensure this path is correct

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/feedback')
            .then(response => {
                setFeedbacks(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div>
            <h1>Feedback</h1>
            <ul>
                {feedbacks.map(feedback => (
                    <li key={feedback.FeedbackID}> {/* Change this to li for proper list item structure */}
                        <h2>{feedback.Title}</h2>
                        <p>{feedback.Description}</p>
                        <CommentList feedbackId={feedback.FeedbackID} />
                        <VoteButton feedbackId={feedback.FeedbackID} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackList;
