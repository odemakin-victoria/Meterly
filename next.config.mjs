/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

	 images: {
    domains: ["optiweb.optimusbank.com"], // External image domains
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during build
  },
  output: "standalone", // ✅ Required for hosting on IIS
};

export default nextConfig;
