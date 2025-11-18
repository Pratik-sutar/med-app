/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ Use standalone for dynamic routes
  images: { unoptimized: true },
};

module.exports = nextConfig;
