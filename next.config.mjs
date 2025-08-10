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
	  swcMinify: true,
  // This can help with serverless deployment

  output: 'standalone',
};

export default nextConfig;
