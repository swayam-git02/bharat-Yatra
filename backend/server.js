const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const circuitRoutes = require('./routes/circuitRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const tripRoutes = require('./routes/tripRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://bharat-yatra-1-y320.onrender.com',
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root Health-check Route for Render Deployment & Health Monitors
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bharat Yatra Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bharat Yatra API server is online and running!',
    timestamp: new Date().toISOString()
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/festivals', festivalRoutes);
app.use('/api/spiritual-circuits', circuitRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/itinerary', itineraryRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Bharat Yatra Backend Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Allowed Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

server.timeout = 120000; // 2 minutes timeout for AI Google Search Grounding

