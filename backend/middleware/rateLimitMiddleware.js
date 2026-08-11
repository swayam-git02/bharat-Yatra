// Simple in-memory rate limiter for itinerary generation
const requestCounts = new Map();

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 10 * 60 * 1000);

const itineraryRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
  const maxRequests = options.max || 10; // max 10 itinerary generations per 15 mins

  return (req, res, next) => {
    const identifier = req.user?.id ? `user_${req.user.id}` : `ip_${req.ip || req.socket.remoteAddress}`;
    const now = Date.now();

    let record = requestCounts.get(identifier);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs
      };
      requestCounts.set(identifier, record);
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message: `Too many itinerary requests. Please try again in ${Math.ceil(retryAfterSeconds / 60)} minutes.`
      });
    }

    record.count += 1;
    requestCounts.set(identifier, record);
    next();
  };
};

module.exports = { itineraryRateLimiter };
