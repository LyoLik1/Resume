/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
    swcPlugins: [],
    optimizeCss: false, // 🔥 отключить lightningcss
  }
};

export default nextConfig;
