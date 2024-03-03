// import API from '../../api.js';
// async function createUser(username, email, password) {
//   try {
//     // First, check if the username already exists
//     const existingUserResponse = await API.get(`/users/${username}.json`);
//     const existingUserData = existingUserResponse.data;

//     // If the username exists, return an error
//     if (existingUserData) {
//       return { error: 'Username is already taken' };
//     }

//     // If the username doesn't exist, create the new user
//     const response = await API.put(`/users/${username}.json`, {
//       email: email,
//       password: password,
//     });
//     if (response.data) {
//       return { user: response.data };
//     } else {
//       // Handle the case where the user wasn't properly created
//       return { error: 'User could not be created' };
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return { error: error.message || 'An error occurred' };
//   }
// }

// export { createUser };

import API from '../../api.js';
async function createUser(req, userData) {
  try {
    const username = req.body.username;
    // First, check if the username already exists
    const existingUserResponse = await API.get(`/users/${username}.json`);
    const existingUserData = existingUserResponse.data;

    // If the username exists, return an error
    if (existingUserData) {
      return { error: 'Username is already taken' };
    }

    // If the username doesn't exist, create the new user
    const response = await API.put(`/users/${username}.json`, {
      email: req.body.email,
      password: req.body.password,
    });
    if (response.data) {
      return { user: response.data };
    } else {
      // Handle the case where the user wasn't properly created
      return { error: 'User could not be created' };
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: error.message || 'An error occurred' };
  }
}

export { createUser };
