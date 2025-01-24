import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Add your other config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'img.youtube.com',
        port:'',
        pathname:'**'
      }
    ],
    domains:['img.youtube.com']
  }
};

export default nextConfig;
