import { ApiResponse } from '../types';

export const formatResponse = (
  code: number,
  status: 'success' | 'error',
  message: string,
  data?: any
): ApiResponse => {
  return {
    metadata: {
      code,
      status,
      message,
    },
    data,
  };
};

export const successResponse = (message: string, data?: any, code: number = 200) => {
  return formatResponse(code, 'success', message, data);
};

export const errorResponse = (message: string, code: number = 400) => {
  return formatResponse(code, 'error', message);
};
