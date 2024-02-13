const db = require('../models');
const User = db.User;

// function to sign up a new user with username and password
async function signUpUser(req, username, password) {
  console.log('Received request body:', req.body);

  try {
    // create a new user record in the database
    const newUser = await User.create({ username, password });
    console.log('New User:', newUser.toJSON());

    // store session record in the database
    req.session.authenticated = true;
    req.session.user_id = newUser.id;

    console.log('Session ID:', req.session.id);
    console.log ('User ID:', req.session.user_id);

    console.log('User registered:', newUser);
    return {success: true};

  } catch (error) {
    console.log('Error:', error);
    return {success: false, error: error};
  }
}

// function to login existing user with username and password
async function loginUser(req, username, password) {
  console.log('Received request body:', req.body);

  try {
    // find the user record in the database
    const user = await User.findOne({ where: { username: username } });
    console.log('User:', user.toJSON());

    // if the user record is found, compare the password
    if (user && user.password === password) {
      console.log('User authenticated:', user);
      req.session.authenticated = true;
      req.session.user_id = user.id;
      console.log('Session ID:', req.session.id);
      console.log ('User ID:', req.session.user_id);
      return {success: true};

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