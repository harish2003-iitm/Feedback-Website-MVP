-- Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    PasswordHash VARCHAR(255)
);

-- FeedbackCategories Table
CREATE TABLE FeedbackCategories (
    CategoryID INT PRIMARY KEY,
    Name VARCHAR(255),
    Description VARCHAR(255)
);

-- Feedback Table
CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY,
    Title VARCHAR(255),
    Description VARCHAR(255),
    UserID INT,
    CategoryID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CategoryID) REFERENCES FeedbackCategories(CategoryID)
);

-- Comments Table
CREATE TABLE Comments (
    CommentID INT PRIMARY KEY,
    FeedbackID INT,
    UserID INT,
    CommentText VARCHAR(255),
    FOREIGN KEY (FeedbackID) REFERENCES Feedback(FeedbackID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Votes Table
CREATE TABLE Votes (
    VoteID INT PRIMARY KEY,
    FeedbackID INT,
    UserID INT,
    Upvote BOOLEAN,
    FOREIGN KEY (FeedbackID) REFERENCES Feedback(FeedbackID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Categories for feedback
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Adding categories and statuses to Feedback
ALTER TABLE Feedback
ADD COLUMN categoryId INT,
ADD COLUMN status VARCHAR(100),
ADD FOREIGN KEY (categoryId) REFERENCES Categories(id);

-- Votes for feedback
CREATE TABLE Votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedbackId INT,
    userId INT,
    voteType ENUM('upvote', 'downvote'),
    FOREIGN KEY (feedbackId) REFERENCES Feedback(id),
    FOREIGN KEY (userId) REFERENCES Users(id),
    UNIQUE (feedbackId, userId)  -- Ensure one vote per user per feedback
);

-- Official responses to feedback
CREATE TABLE Responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedbackId INT,
    responseText TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (feedbackId) REFERENCES Feedback(id)
);

