const commonHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const configs = {
  development: {
    "Access-Control-Allow-Origin": "*",
    ...commonHeaders,
  },

  production: {
    // "Access-Control-Allow-Origin": "https://yourdomain.com",
    ...commonHeaders,
  },
};

const env = process.env.NODE_ENV || "development";

export const headers = configs[env];
