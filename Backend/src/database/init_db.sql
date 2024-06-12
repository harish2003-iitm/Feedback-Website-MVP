-- Users Table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    PasswordHash VARCHAR(255)
);

-- FeedbackCategories Table
CREATE TABLE FeedbackCategories (
    CategoryID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Description VARCHAR(255)
);

-- Feedback Table
CREATE TABLE Feedback (
    FeedbackID SERIAL PRIMARY KEY,
    Title VARCHAR(255),
    Description VARCHAR(255),
    UserID INT REFERENCES Users(UserID),
    CategoryID INT REFERENCES FeedbackCategories(CategoryID)
);

-- Comments Table
CREATE TABLE Comments (
    CommentID SERIAL PRIMARY KEY,
    FeedbackID INT REFERENCES Feedback(FeedbackID),
    UserID INT REFERENCES Users(UserID),
    CommentText VARCHAR(255)
);

-- Votes Table (PostgreSQL version without ENUM)
CREATE TABLE Votes (
    id SERIAL PRIMARY KEY,
    feedbackId INT REFERENCES Feedback(FeedbackID),
    userId INT REFERENCES Users(UserID),
    voteType VARCHAR(100) CHECK (voteType IN ('upvote', 'downvote')),
    UNIQUE (feedbackId, userId)
);

-- Responses Table
CREATE TABLE Responses (
    id SERIAL PRIMARY KEY,
    feedbackId INT,
    responseText TEXT,
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (feedbackId) REFERENCES Feedback(FeedbackID)
);

