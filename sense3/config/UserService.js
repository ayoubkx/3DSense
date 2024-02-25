// UserService.js
import API from './api';

export const createUser = async (userId, userData) => {
    try {
      const response = await API.put(`/users/${userId}.json`, JSON.stringify(userData));
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
      // Attempt to fetch user data by username
      const response = await API.get(`/users.json?orderBy="username"&equalTo="${username}"`);
      const users = response.data;
  
      // Check if users were returned
      if (!users || Object.keys(users).length === 0) {
        return { error: 'User not found' };
      }
  
      // Extract user data. 
      const userId = Object.keys(users)[0];
      const userData = users[userId];
  
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