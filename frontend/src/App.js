import React, { useState, useEffect } from 'react';
import axios from 'axios';

// FeedbackForm component for submitting feedback
const FeedbackForm = ({ onFeedbackSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
  
// FeedbackList component for listing feedback
const FeedbackList = ({ feedbacks }) => (
    <div>
        <h2>Feedbacks</h2>
        {feedbacks.map(feedback => (
            <div key={feedback.FeedbackID}>
                <h3>{feedback.Title}</h3>
                <p>{feedback.Description}</p>
                {/* Additional feedback details */}
            </div>
        ))}
    </div>
);

// UserForm component for submitting new users
const UserForm = ({ onUserSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const user = { Name: name, Email: email, PasswordHash: passwordHash };
          await onUserSubmit(user);
          setName(''); // Reset form
          setEmail('');
          setPasswordHash('');
      } catch (error) {
          console.error('Error submitting user:', error);
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <h2>Register New User</h2>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="text" value={passwordHash} onChange={e => setPasswordHash(e.target.value)} placeholder="Password Hash" required />
          <button type="submit">Register</button>
      </form>
  );
};

// UserList component for listing users
const UserList = ({ users }) => (
  <div>
      <h2>Users List</h2>
      {users.map(user => (
          <div key={user.UserID}>
              <h3>{user.Name}</h3>
              <p>Email: {user.Email}</p>
              {/* Additional user details */}
          </div>
      ))}
  </div>
);
// CategoryForm component for submitting new categories
const CategoryForm = ({ onCategorySubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const category = { Name: name, Description: description };
          await onCategorySubmit(category);
          setName(''); // Reset form
          setDescription('');
      } catch (error) {
          console.error('Error submitting category:', error);
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <h2>Create New Category</h2>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
          <button type="submit">Create</button>
      </form>
  );
};

// CategoryList component for listing categories
const CategoryList = ({ categories }) => (
  <div>
      <h2>Categories List</h2>
      {categories.map(category => (
          <div key={category.CategoryID}>
              <h3>{category.Name}</h3>
              <p>{category.Description}</p>
              {/* Additional category details */}
          </div>
      ))}
  </div>
);

  // Fetch data from backend (omitted for brevity)

  function App() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    // Function to handle new feedback submission
    const handleFeedbackSubmit = async (feedback) => {
        try {
            const response = await axios.post('http://localhost:3000/feedbacks', feedback);
            setFeedbacks([...feedbacks, response.data]); // Add new feedback to the list
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    // Function to handle new user submission
    const handleUserSubmit = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/users', user);
            setUsers([...users, response.data]); // Add new user to the list
        } catch (error) {
            console.error('Error submitting user:', error);
        }
    };

    // Function to handle new category submission
    const handleCategorySubmit = async (category) => {
        try {
            const response = await axios.post('http://localhost:3000/categories', category);
            setCategories([...categories, response.data]); // Add new category to the list
        } catch (error) {
            console.error('Error submitting category:', error);
        }
    };

    return (
        <div className="App">
            <UserForm onUserSubmit={handleUserSubmit} />
            <UserList users={users} />
            <CategoryForm onCategorySubmit={handleCategorySubmit} />
            <CategoryList categories={categories} />
            <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
            <FeedbackList feedbacks={feedbacks} />
        </div>
    );
}

export default App;
