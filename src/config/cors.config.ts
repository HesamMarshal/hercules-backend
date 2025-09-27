// src/config/cors.config.ts
export const corsConfig = {
  origin: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : [
        'http://localhost:8081',
        'exp://127.0.0.1:8081',
        'exp://localhost:8081',
        'http://localhost:3000',
      ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-KEY',
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
