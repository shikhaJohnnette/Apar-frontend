import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiProxyTarget = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_PROXY_TARGET;

    if (!apiProxyTarget) {
      throw new Error('Set NEXT_PUBLIC_API_URL to the backend origin before starting or building the app.');
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiProxyTarget.replace(/\/+$/, '')}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
