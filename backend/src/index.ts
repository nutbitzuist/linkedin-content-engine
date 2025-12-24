import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { postsRouter } from './routes/posts.js';
import { templatesRouter } from './routes/templates.js';
import { aiRouter } from './routes/ai.js';
import { authRouter } from './routes/auth.js';
import { linkedinRouter } from './routes/linkedin.js';
import { analyticsRouter } from './routes/analytics.js';
import { schedulerRouter, initScheduler } from './services/scheduler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/linkedin', linkedinRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/scheduler', schedulerRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize scheduler and start server
initScheduler().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize scheduler:', err);
  // Start server anyway
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} (scheduler disabled)`);
  });
});
