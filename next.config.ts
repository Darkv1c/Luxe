import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // CSS Modules configuration  
  sassOptions: {
    includePaths: ['./src'],
  },
};

export default nextConfig;
