import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/posts/:slug",
        destination: "/p/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
