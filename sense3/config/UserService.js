
import API from './api';

export const createUser = async (username, userData) => {
  try {
      // First, check if the username already exists
      const existingUserResponse = await API.get(`/users/${username}.json`);
      const existingUserData = existingUserResponse.data;

      // If the username exists, return an error
      if (existingUserData) {
          return { error: 'Username is already taken' };
      }

      // If the username doesn't exist, create the new user
      const response = await API.put(`/users/${username}.json`, JSON.stringify(userData));
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
};


export const getUser = async (username) => {
  try {
    const response = await API.get(`/users/${username}.json`);
    console.log('User data:', response.data);
    // Handle success
    return response.data; // or handle as needed
  } catch (error) {
    console.error('Error fetching user:', error);
    // Handle error
  }
};
export const loginUser = async (username, password) => {
    try {
        // Fetch user data by username (key)
        const response = await API.get(`/users/${username}.json`);
        const userData = response.data;
  
        // Check if user data was returned
        if (!userData) {
            return { error: 'User not found' };
        }
  
        // Check if the passwords match
        if (userData.password === password) {
            // Passwords match. Log the user in.
            return { user: userData };
        } else {
            // Passwords do not match.
            return { error: 'Invalid password' };
        }
    } catch (error) {
        // Handle potential errors
        return { error: error.message };
    }
};

