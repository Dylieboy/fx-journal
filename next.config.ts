import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'], // Essential for Prisma 7 + Next.js 16
};

export default nextConfig;