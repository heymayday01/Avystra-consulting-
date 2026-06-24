import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import leadRoutes from './server/routes/leadRoutes.js';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy for secure headers and rate limiting when behind a reverse proxy (e.g. Cloud Run)
  app.set('trust proxy', 1);

  // Add production middlewares
  app.use(compression()); // Gzip compression
  app.use(helmet({
    contentSecurityPolicy: false, // Turned off for dev compatibility; customize for strict production
    crossOriginEmbedderPolicy: false,
  })); // Security headers

  // SEO & DUPLICATE CONTENT RISK PREVENTION: Block indexing of staging, localhost, and *.run.app URLs
  app.use((req, res, next) => {
    const host = req.get('host') || '';
    if (host.includes('run.app') || host.includes('staging') || host.includes('localhost')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
  });

  // Rate Limiting for endpoints to prevent abuse
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply rate limiter to all API routes
  app.use('/api', apiLimiter);

  // Parse JSON and urlencoded request bodies
  app.use(express.json({ limit: '10kb' })); // Limit body payload to 10kb
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Graceful MongoDB connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('[MongoDB] Connected successfully to the cloud database cluster.');
    } catch (err) {
      console.error('[MongoDB Error] Connection failed. Using local storage fallback. Error:', err.message);
    }
  } else {
    console.log('[MongoDB Info] MONGODB_URI environment variable is not defined. Using local file storage fallback.');
  }

  // API Routes
  app.use('/api/leads', leadRoutes);

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected (local_fallback)'
    });
  });

  // Serve static assets natively if present in root, such as the requested images
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  
  // Also try searching in the root directory for uploaded image assets
  app.get('/image_:file.jpg', (req, res) => {
    const filename = `image_${req.params.file}.jpg`;
    const searchPaths = [
      path.join(process.cwd(), filename),
      path.join(process.cwd(), 'assets', filename),
      path.join(process.cwd(), 'public', filename)
    ];
    for (const p of searchPaths) {
      if (fs.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    // If the image files do not physically exist, we can handle it cleanly or let the client handle it via state/gradients.
    return res.status(404).send('Not Found');
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Vite] Development server integration active.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Express] Production serving active.');
  }

  // Global Error Handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[Unhandled Server Error]:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Core] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Core Startup Error]:', err);
});
