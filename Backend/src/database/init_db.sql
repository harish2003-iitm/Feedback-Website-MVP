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
