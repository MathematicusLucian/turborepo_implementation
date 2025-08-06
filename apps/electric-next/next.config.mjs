/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: {
      serverComponentsExternalPackages: ["@electric-sql/pglite"],
    },
  },
  reactStrictMode: false,
  // turbopack: {
  // root: path.join(__dirname, '..'),
  //   // ...
  // },
};

export default nextConfig;
