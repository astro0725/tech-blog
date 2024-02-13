-- Creates database if it doesn't exist
CREATE DATABASE IF NOT EXISTS tech_development;

-- Select the newly created database
USE tech_development;

-- User Table
CREATE TABLE IF NOT EXISTS `User` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

-- Post Table
CREATE TABLE IF NOT EXISTS `Post` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `body` TEXT NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

-- Comment Table
CREATE TABLE IF NOT EXISTS `Comment` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `body` TEXT NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

-- Session Table
CREATE TABLE IF NOT EXISTS `Sessions` (
    `sid` VARCHAR(255) PRIMARY KEY,
    `user_id` INT NOT NULL,
    `expires` DATETIME NOT NULL,
    `data` TEXT NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);
