import withPWA from 'next-pwa';
import type { NextConfig } from "next";

declare module 'next-pwa';

const nextConfig: NextConfig = {
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    manifest: "/manifest.json"
  },
  // ...other config options
};

export default withPWA(nextConfig);
