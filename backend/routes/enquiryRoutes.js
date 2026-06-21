import express from 'express';
import rateLimit from 'express-rate-limit';
import { submitEnquiry } from '../controllers/enquiryController.js';

const router = express.Router();

// Rate limiter for contact form submissions:
// Restrict each IP to a configurable limit (default 5 in production, 100 in dev) per 15-minute window
const isProd = process.env.NODE_ENV === 'production';
const maxLimit = parseInt(process.env.RATE_LIMIT_MAX || (isProd ? '5' : '100'), 10);

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: maxLimit,
  message: {
    success: false,
    message: 'Too many contact requests from this IP address. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/enquiry
router.post('/', enquiryLimiter, submitEnquiry);

export default router;
