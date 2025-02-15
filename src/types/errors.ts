import axios from 'axios';

export interface ApiError {
  message: string;
  status?: number;
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status
    };
  }
  return {
    message: error instanceof Error ? error.message : 'An unknown error occurred'
  };
}; 