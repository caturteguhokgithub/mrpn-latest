/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // output: "standalone",

  // basePath: "/fe",
  // assetPrefix: "https://mrpn.bappenas.go.id/fe",

  // basePath: "/fe-staging",
  // assetPrefix: "https://mrpn.bappenas.go.id/fe-staging",

  reactStrictMode: false,
  crossOrigin: "anonymous",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },

  async headers() {
    return [
      {
        source: "/api/:path*", // apply CORS to API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // or a specific origin like "https://example.com"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
