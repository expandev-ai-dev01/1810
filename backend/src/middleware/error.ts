import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/response';
import { logger } from '@/utils/logger';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Database custom errors (51000+)
  if (err.number && err.number >= 51000) {
    return res.status(400).json(errorResponse(err.message, 'BUSINESS_RULE_ERROR'));
  }

  // Zod Validation Errors
  if (err.name === 'ZodError') {
    return res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', err.errors));
  }

  // Default error
  res.status(500).json(errorResponse('Internal Server Error', 'INTERNAL_ERROR'));
}
