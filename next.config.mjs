import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Payload is treated as a server-only package
  experimental: {
    serverMinification: true,
  },
  serverExternalPackages: ['payload'],
  webpack: (config, { isServer }) => {
    // Only include certain packages on the server
    if (!isServer) {
      // Don't bundle server-only packages on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
      };
    }
    return config;
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
