/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: process.cwd(), // Use absolute path
  },
  transpilePackages: [
    // Add any local packages that should be transpiled
  ],
  images: {
    domains: [
      // Add domains for images here
      'images.unsplash.com',
    ],
  },
  
  // Optional: Configure environment variables
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
  
  // Add rewrites for API proxying if needed
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig; 