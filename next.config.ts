import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Keep in sync with lib/language-from-url.ts (next.config cannot use the @ alias).
const SUPPORTED_LANG = "en|hi|bn|ta";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  images: {
    // Next.js 16 blocks optimizing images from private IPs (localhost/127.0.0.1)
    // unless this is enabled. Required for local Laravel image URLs in development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "backend-cityquest.runtime-solutions.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "apib.tv9events.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cmsnew.tv9events.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return {
      // Proxy language path → same app with ?lang= (URL in the browser stays /travel9/en).
      // Next.js prefixes source/destination with basePath (/travel9 or /city-quest).
      beforeFiles: [
        {
          source: `/:lang(${SUPPORTED_LANG})`,
          destination: `/?lang=:lang`,
        },
        {
          source: `/:lang(${SUPPORTED_LANG})/:path*`,
          destination: `/:path*?lang=:lang`,
        },
      ],
      afterFiles: [
        {
          source: "/api/:path*",
          destination: `${apiBaseUrl}/:path*`,
        },
      ],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
