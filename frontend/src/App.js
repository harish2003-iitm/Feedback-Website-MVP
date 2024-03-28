import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const baseURL = 'http://localhost:3000/api';

const FeedbackForm = ({ onFeedbackSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onFeedbackSubmit({ Title: title, Description: description, UserID: userId, CategoryID: categoryId });
        setTitle('');
        setDescription('');
        setUserId('');
        setCategoryId('');
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Submit New Feedback</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
            <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required />
            <button type="submit">Submit</button>
        </form>
    );
};

const VoteButtons = ({ feedbackId, onVote }) => {
    const handleVote = (voteType) => {
        onVote(feedbackId, voteType);
    };

    return (
        <div>
            <button onClick={() => handleVote('upvote')}>Upvote</button>
            <button onClick={() => handleVote('downvote')}>Downvote</button>
        </div>
    );
};

const FeedbackList = ({ feedbacks, onSelectFeedback, onVote }) => (
    <div>
        <h2>Feedbacks</h2>
        {feedbacks.map((feedback) => (
            <div key={feedback.FeedbackID} style={{ cursor: 'pointer', padding: '10px', marginBottom: '5px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h3 onClick={() => onSelectFeedback(feedback.FeedbackID)}>{feedback.Title}</h3>
                <p>{feedback.Description}</p>
                <VoteButtons feedbackId={feedback.FeedbackID} onVote={onVote} />
            </div>
        ))}
    </div>
);

const handleVote = (feedbackId, voteType) => {
    const vote = { userId: 1, feedbackId, voteType }; // Replace 'userId: 1' with actual user ID
    axios.post(`${baseURL}/votes`, vote)
        .then((res) => {
            // Handle response, such as updating a vote count (not shown here)
            console.log('Vote recorded:', res.data);
        })
        .catch((error) => {
            console.error("Error submitting vote:", error);
        });
};

const UserForm = ({ onUserSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onUserSubmit({ Name: name, Email: email, PasswordHash: passwordHash });
        setName('');
        setEmail('');
        setPasswordHash('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register New User</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={passwordHash} onChange={(e) => setPasswordHash(e.target.value)} placeholder="Password Hash" required />
            <button type="submit">Register</button>
        </form>
    );
};

const UserList = ({ users }) => (
    <div>
        <h2>Users List</h2>
        {users.map((user) => (
            <div key={user.UserID}>
                <h3>{user.Name}</h3>
                <p>Email: {user.Email}</p>
            </div>
        ))}
    </div>
);

const CategoryForm = ({ onCategorySubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onCategorySubmit({ Name: name, Description: description });
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Feedback Category</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Category Description" required />
            <button type="submit">Create Category</button>
        </form>
    );
};

const CategoryList = ({ categories }) => (
    <div>
        <h2>Feedback Categories List</h2>
        {categories.map((category) => (
            <div key={category.CategoryID}>
                <h3>{category.Name}</h3>
                <p>{category.Description}</p>
            </div>
        ))}
    </div>
);

const ResponseForm = ({ feedbackId, onResponseSubmit }) => {
    const [responseText, setResponseText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onResponseSubmit({ feedbackId, responseText });
        setResponseText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit New Response</h2>
            <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} placeholder="Response Text" required />
            <button type="submit">Submit Response</button>
        </form>
    );
};

const ResponsesList = ({ responses }) => (
    <div>
        <h2>Responses</h2>
        {responses.map((response) => (
            <div key={response.id}>
                <p>{response.responseText}</p>
            </div>
        ))}
    </div>
);

const CommentForm = ({ feedbackId, onCommentSubmit }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onCommentSubmit(feedbackId, { CommentText: commentText });
        setCommentText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Comment</h2>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment"
                required
            />
            <button type="submit">Submit Comment</button>
        </form>
    );
};

const CommentList = ({ comments }) => (
    <div>
        <h2>Comments</h2>
        {comments.length > 0 ? (
            comments.map((comment) => (
                <div key={comment.CommentID}>
                    <p>{comment.CommentText}</p>
                </div>
            ))
        ) : (
            <p>No comments yet.</p>
        )}
    </div>
);

function App() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [responses, setResponses] = useState([]);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/feedback`).then((res) => setFeedbacks(res.data));
        axios.get(`${baseURL}/users`).then((res) => setUsers(res.data));
        axios.get(`${baseURL}/feedbackcategories`).then((res) => setCategories(res.data));
        axios.get(`${baseURL}/responses`).then((res) => setResponses(res.data));
        if (selectedFeedbackId) {
            axios.get(`${baseURL}/comments/feedback/${selectedFeedbackId}`).then((res) => setComments(res.data));
        }
    }, [selectedFeedbackId]);

    const handleFeedbackSubmit = (feedback) => {
        axios.post(`${baseURL}/feedback`, feedback)
            .then((res) => {
                setFeedbacks([...feedbacks, res.data]);
            })
            .catch((error) => {
                console.error("Error submitting feedback:", error);
            });
    };    

    const handleUserSubmit = (user) => {
        axios.post(`${baseURL}/users`, user).then((res) => {
            setUsers([...users, res.data]);
        });
    };

    const handleCategorySubmit = (category) => {
        axios.post(`${baseURL}/feedbackcategories`, category).then((res) => {
            setCategories([...categories, res.data]);
        });
    };

    const handleResponseSubmit = (response) => {
        axios.post(`${baseURL}/responses`, response).then((res) => {
            setResponses([...responses, res.data]);
        });
    };

    const handleSelectFeedback = (id) => {
        setSelectedFeedbackId(id);
    };

    const handleCommentSubmit = (feedbackId, comment) => {
        axios.post(`${baseURL}/comments`, { ...comment, FeedbackID: feedbackId })
            .then((res) => {
                setComments([...comments, res.data]);
            })
            .catch((error) => {
                console.error("Error submitting comment:", error);
            });
    };

    return (
        <div className="App">
            <h1>Feedback System</h1>
            <UserForm onUserSubmit={handleUserSubmit} />
            <UserList users={users} />
            <CategoryForm onCategorySubmit={handleCategorySubmit} />
            <CategoryList categories={categories} />
            <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
            <FeedbackList feedbacks={feedbacks} onSelectFeedback={handleSelectFeedback} onVote={handleVote} />
            {selectedFeedbackId && (
                <>
                    <ResponseForm feedbackId={selectedFeedbackId} onResponseSubmit={handleResponseSubmit} />
                    <ResponsesList responses={responses.filter(response => response.feedbackId === selectedFeedbackId)} />
                    <CommentForm feedbackId={selectedFeedbackId} onCommentSubmit={handleCommentSubmit} />
                    <CommentList comments={comments.filter(comment => comment.FeedbackID === selectedFeedbackId)} />
                </>
            )}
        </div>
    );
}

export default App;

