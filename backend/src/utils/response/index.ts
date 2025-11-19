export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: any;
}

export const successResponse = <T>(data: T, metadata?: any): ApiResponse<T> => ({
  success: true,
  data,
  metadata,
});

export const errorResponse = (
  message: string,
  code: string = 'INTERNAL_ERROR',
  details?: any
): ApiResponse<null> => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
});
