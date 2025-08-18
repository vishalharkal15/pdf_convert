/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests in development
  allowedDevOrigins: ['10.77.29.53'],
  
  // Optimize hydration
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configure Turbopack (now stable)
  turbopack: {
    // Enable optimizations
  },
  
  // Configure webpack for better PDF handling
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': false, // Prevent accidental imports
    };
    return config;
  },
};

module.exports = nextConfig;
