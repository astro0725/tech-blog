-- Creates database if it doesn't exist
CREATE DATABASE IF NOT EXISTS tech_development;

-- Select the newly created database
USE tech_development;

-- User Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Session Table
CREATE TABLE IF NOT EXISTS Sessions (
    sid VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id INT, 
    expires DATETIME NOT NULL,
    data TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) 
);

-- Post Table
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id)
);

-- Comment Table
CREATE TABLE IF NOT EXISTS Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT, 
    body TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts (id),
    FOREIGN KEY (user_id) REFERENCES Users (id)
);
