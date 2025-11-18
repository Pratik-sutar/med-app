/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ✅ Use standalone for dynamic routes
  images: { unoptimized: true },
};

module.exports = nextConfig;
