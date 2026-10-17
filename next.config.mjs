/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Images des articles servies par le CDN Sanity
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  serverExternalPackages: ["node-ical"],
};

export default nextConfig;
