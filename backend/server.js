import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload Route
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Thread Security backend service is operational.',
    timestamp: new Date().toISOString(),
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`  Thread Security Backend Server Started`);
  console.log(`  Port: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/health`);
  console.log(`========================================`);
});
