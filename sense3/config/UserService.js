// UserService.js
import API from './api';

export const createUser = async (username, userData) => {
    try {
      // username is unique and can be used as a key
      const response = await API.put(`/users/${username}.json`, JSON.stringify(userData));
      return { user: response.data };
    } catch (error) {
      console.error('Error creating user:', error);
      return { error: error.response ? error.response.data : 'An error occurred' };
    }
};

export const getUser = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}.json`);
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

