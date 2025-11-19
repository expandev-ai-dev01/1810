import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from '@/config';
import { errorMiddleware, notFoundMiddleware } from '@/middleware';
import apiRoutes from '@/routes';
import { logger } from '@/utils/logger';

const app: Application = express();

// Security and Utility Middleware
app.use(helmet());
app.use(cors(config.api.cors));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorMiddleware);

// Server Startup
const server = app.listen(config.api.port, () => {
  logger.info(`Server running on port ${config.api.port} in ${process.env.NODE_ENV} mode`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default server;
