const db = require("../models");
const User = db.User;
const Session = db.Session;

// function to sign up a new user with username and password
async function signUpUser(req, password, username) {
  console.log("Received request body:", req.body);

  try {
    // create a new user record in the database
    const newUser = await User.create({ username, password });
    console.log("New User:", newUser.toJSON());

    // store session record in the database
    req.session.authenticated = true;
    req.session.user_id = newUser.id;
    
    await Session.update ({user_id: newUser.id}, {where: {sid: req.session.id}});
    console.log("Session ID:", req.session.id);
    console.log ("User ID:", req.session.user_id);

    console.log("User registered:", newUser);
    return {success: true};

  } catch (error) {
    console.log("Error:", error);
    return {success: false, error: error};
  }
}

module.exports = {
  signUpUser,
}