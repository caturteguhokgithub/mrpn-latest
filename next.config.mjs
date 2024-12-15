/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone",
    output: "export",
    // basePath: "/fe",
    // assetPrefix: "https://mrpn.bappenas.go.id/fe",
    // basePath: "/fe-staging",
    // assetPrefix: "https://mrpn.bappenas.go.id/fe-staging",
    reactStrictMode: false,
    crossOrigin: 'anonymous',
    images: {
        unoptimized:true,
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
};

export default nextConfig;
