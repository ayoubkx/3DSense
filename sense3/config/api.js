import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dsense-8baa5-default-rtdb.firebaseio.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
