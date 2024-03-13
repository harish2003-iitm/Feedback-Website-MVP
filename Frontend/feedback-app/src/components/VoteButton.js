import React, { useState } from 'react';
import axios from 'axios';

function VoteButton({ feedbackId }) {
    const [votes, setVotes] = useState(0);

    const handleUpvote = () => {
        axios.post(`http://localhost:3000/api/votes`, { FeedbackID: feedbackId, Upvote: true })
            .then(response => {
                // Assuming the backend returns the total votes after the vote is added
                setVotes(response.data.totalVotes);
            })
            .catch(error => console.error('There was an error posting the vote:', error));
    };

    return (
        <div>
            <button onClick={handleUpvote}>Upvote</button>
            <span>{votes}</span>
        </div>
    );
}

export default VoteButton;
