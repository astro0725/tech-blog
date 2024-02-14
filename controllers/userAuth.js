const db = require('../models');
const User = db.User;
const Session = db.Sessions;

async function signUpUser(req, username, password) {
  console.log("Received request body:", req.body);

  try {
    // create a new user record in the database
    const newUser = await User.create({ username, password });
    console.log("New User:", newUser.toJSON());

    // store user session data (e.g., user ID) once signed up
    req.session.authenticated = true; 
    req.session.user_id = newUser.id; 
    console.log(req.session.id);

    await Session.update({ user_id: newUser.id }, { where: { sid: req.session.id } });
    console.log("Session model:", Session);
    console.log("Session table:", Session.tableName)
    console.log("Session table fields:", Session.rawAttributes);
    console.log("Session ID:", req.session.id);
    console.log("User ID:", newUser.id); 
    console.log ('User ID passed to session:', req.session.user_id);

    // log the user info
    console.log("User registered:", newUser);
    return { success: true };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { error: "Error during sign up" };
  }
}

// function to login existing user with username and password
async function loginUser(req, username, password) {
  console.log('Received request body:', req.body);

  try {
    // attempt to find the user by username in the database
    const user = await User.findOne({ where: { username: username } });
    console.log('User:', user.toJSON());

    if (!user) {
      // user with the provided username does not exist
      return { error: "User not found." };
    }

    if (user && user.password === password) {
      console.log('User authenticated:', user);
      req.session.authenticated = true; 
      req.session.user_id = user.id; 
      console.log('Session ID:', req.session.id);
      console.log ('User ID:', req.session.user_id);

      await Session.update({ user_id: user.id }, { where: { sid: req.session.id } });
      console.log("Session model:", Session);
      console.log("Session ID:", req.session.id);
      console.log ('User ID passed to session:', req.session.user_id);

      return { success: true, user };

    } else {
      console.log('User not authenticated');
      return {success: false, error: 'Invalid username or password'};
    }

  } catch (error) {
    console.log('Error:', error);
    return {success: false, error: error};
  }
}

// logout authenticated user
async function logoutUser(req) {
  return new Promise((resolve, reject) =>{
    try{
      // check if a user session exists
      if (req.session) {
        // destroy the user's session
        req.session.destroy(err => {
          if (err) {
            console.error('Error destroying session:', err);
            reject('Error destroying session.');
          } else {
            console.log('User signed out successfully.');
            resolve({ success: true });
          }
        });
      } else {
        console.error('No active session to log out.');
        reject('No active session.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      reject('Error during logout.');
    }
  });
}

module.exports = {
  signUpUser,
  loginUser,
  logoutUser
}