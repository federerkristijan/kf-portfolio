import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog cover images live in Supabase storage.
    remotePatterns: [
      { protocol: "https", hostname: "aobucvrcozotzpcrdeof.supabase.co" },
    ],
  },
};

export default nextConfig;
