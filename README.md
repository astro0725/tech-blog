# Tech Blog
A CMS-style platform for developers to publish, edit, and comment on blog posts, built using MVC architecture with Handlebars.js, Sequelize, and express-session.

## Disclaimer
The website is no longer live, but the code is fully functional. You can clone the repository and run the application locally to test all the features.

## Table of Contents
- [Description](#Description)
- [Features](#Features)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)

## Description
The Tech Blog application is a platform for developers to share their thoughts on tech-related topics, with features similar to WordPress. Users can create an account, write blog posts, edit and delete their posts, and leave comments on others’ posts. This project is a demonstration of full-stack development using the Model-View-Controller (MVC) paradigm.

## Technologies 
- Node.js
- Express.js
- Sequelize (for MySQL database interactions)
- Handlebars.js (templating engine)
- bcrypt (for password hashing)
- express-session (for user authentication)
- MySQL

Installation
- Clone the repository:
`git clone https://github.com/astro0725/tech-blog.git`
- Navigate to the project directory:
`cd tech-blog`
- Install the necessary dependencies:
`npm install`
- Create a .env file in the root directory and add the following environment variables with your MySQL credentials:
```
DB_NAME='tech_blog_db'
DB_USER='your-mysql-username'
DB_PASSWORD='your-mysql-password'
```
- Log in to MySQL and create the database:
```
mysql -u root -p
SOURCE db/schema.sql;
```
- Start the application with nodemon:
`nodemon start`

## Usage
Once the application is running, you can access it locally at http://localhost:3001, or the desired port you put in your .env file. The website includes the following features:
- Sign Up / Log In: Users can create accounts, log in, and manage their blog posts.
- Create Blog Posts: After logging in, users can create new blog posts from the dashboard.
- Edit / Delete Posts: Users can update or delete their own blog posts.
- Comments: Users can comment on blog posts while logged in, and comments will display the creator’s username and timestamp.
- Session Management: Users are automatically logged out after a set idle time.

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) <br/>
This project is licensed under the MIT license. For more details, see [this link](https://opensource.org/licenses/MIT).
