// next.config.mjs
/** @type {import('next').NextConfig} */
const allowedDevOrigins = [
  'http://localhost:3000',               // dev
  'https://mulyonogpt.mhai.my.id',      // prod
];

const nextConfig = {
  async headers() {
    return [
      {
        // Terapkan untuk semua route API
        source: '/api/:path*',
        headers: allowedDevOrigins.map(origin => ({
          key: 'Access-Control-Allow-Origin',
          value: origin, // nanti kita akan handle dynamic origin via middleware kalau perlu
        })),
      },
    ];
  },
};

export default nextConfig;
