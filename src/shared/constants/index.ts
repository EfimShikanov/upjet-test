export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 5,
} as const;

export const API_CONSTANTS = {
  DEFAULT_TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3,
  DEBOUNCE_DELAY: 300,
} as const;

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
