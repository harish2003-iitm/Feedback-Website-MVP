import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/feedback/new" element={<FeedbackForm />} />
                    {/* React Router v6 uses the `element` prop to render components */}
                    {/* <Route path="/feedback/user" element={<UserFeedbacks />} />
                    <Route path="/feedback/:id" element={<FeedbackDetail />} /> */}
                    <Route path="/" element={<FeedbackList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
