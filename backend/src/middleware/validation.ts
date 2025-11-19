import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { errorResponse } from '@/utils/response';

export const validationMiddleware =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
      }
      return next(error);
    }
  };
