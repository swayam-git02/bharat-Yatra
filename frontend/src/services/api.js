import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bharat_yatra_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Auth Expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('bharat_yatra_token');
      localStorage.setItem('bharat_yatra_is_logged_in', 'false');
    }
    return Promise.reject(error);
  }
);

export default api;

// API Service Helper Methods
export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('bharat_yatra_token', res.data.token);
    }
    return res.data;
  },
  register: async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    if (res.data.token) {
      localStorage.setItem('bharat_yatra_token', res.data.token);
    }
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  }
};

export const destinationService = {
  getAll: async (params) => {
    const res = await api.get('/destinations', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/destinations/${id}`);
    return res.data;
  }
};

export const tripService = {
  saveTrip: async (tripData) => {
    const res = await api.post('/trips', tripData);
    return res.data;
  },
  getUserTrips: async () => {
    const res = await api.get('/trips');
    return res.data;
  },
  deleteTrip: async (tripId) => {
    const res = await api.delete(`/trips/${tripId}`);
    return res.data;
  }
};

export const wishlistService = {
  getWishlist: async () => {
    const res = await api.get('/wishlist');
    return res.data;
  },
  add: async (destinationId) => {
    const res = await api.post('/wishlist', { destinationId });
    return res.data;
  },
  remove: async (destinationId) => {
    const res = await api.delete(`/wishlist/${destinationId}`);
    return res.data;
  }
};

export const itineraryService = {
  generateItinerary: async (params) => {
    const res = await api.post('/itinerary/generate', params, { timeout: 120000 });
    return res.data;
  }
};
