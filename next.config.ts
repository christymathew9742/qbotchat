// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//  // reactStrictMode: false, // Disable React Strict Mode (useful for debugging hydration issues)

//   // Experimental features (remove reactRoot as it's not needed in recent versions)
//   // experimental: {
//   //   // Add other experimental settings here if needed
//   // },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  swcMinify: true, // Uses SWC for faster builds
  distDir: 'build',
};

module.exports = nextConfig;








