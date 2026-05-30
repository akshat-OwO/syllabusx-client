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
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
                pathname: "**",
            },
        ],
    },
};

module.exports = withPWA(nextConfig);

initOpenNextCloudflareForDev();
