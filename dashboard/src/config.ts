import axios from 'axios';

// Create an instance of Axios with custom settings
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your actual API base URL
  timeout: 10000, // Optional: you can set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // You can add more default headers here if needed
  },
});

export default apiClient;
