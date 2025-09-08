import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // No basePath needed for samuelalake.github.io (root domain)
  transpilePackages: ['@primer/react'],
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;
