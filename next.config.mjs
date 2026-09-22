import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root — there is an unrelated lockfile further up the tree.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
