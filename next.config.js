const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggresiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === "development",

    workboxOptions: {
        disableDevLogs: true,
    },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
                pathname: "**",
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
        };

        if (config.name === "server") {
            config.externals = [
                ...(config.externals || []),
                "@react-pdf/renderer",
            ];
        }

        return config;
    },
};

module.exports = withPWA(nextConfig);
