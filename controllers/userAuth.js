const db = require("../models");
const User = db.User;
// const Session = db.Session;

// function to sign up a new user with username and password
async function signUpUser(req, username, password) {
  console.log("Received request body:", req.body);

  try {
    // create a new user record in the database
    const newUser = await User.create({ username, password });
    console.log("New User:", newUser.toJSON());

    // store session record in the database
    req.session.authenticated = true;
    req.session.user_id = newUser.id;

    console.log("Session ID:", req.session.id);
    console.log ("User ID:", req.session.user_id);

    console.log("User registered:", newUser);
    return {success: true};

  } catch (error) {
    console.log("Error:", error);
    return {success: false, error: error};
  }
}

async function loginUser(req, username, password) {
  console.log("Received request body:", req.body);

  try {
    // find the user record in the database
    const user = await User.findOne({ where: { username: username } });
    console.log("User:", user.toJSON());

    // if the user record is found, compare the password
    if (user && user.password === password) {
      console.log("User authenticated:", user);
      req.session.authenticated = true;
      req.session.user_id = user.id;
      console.log("Session ID:", req.session.id);
      console.log ("User ID:", req.session.user_id);
      return {success: true};

    } else {
      console.log("User not authenticated");
      return {success: false, error: "Invalid username or password"};
    }

  } catch (error) {
    console.log("Error:", error);
    return {success: false, error: error};
  }
}

module.exports = {
  signUpUser,
  loginUser,
}