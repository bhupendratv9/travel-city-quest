import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const cmsImageOrigin = (
  process.env.CMS_IMAGE_ORIGIN || "https://cmsnew.tv9events.com"
).replace(/\/+$/, "");
const imageProxyPrefix = (
  process.env.NEXT_PUBLIC_IMAGE_PROXY_PREFIX || "/media"
)
  .replace(/\/+$/, "")
  .replace(/^\//, "");

function buildPublicImageRemotePattern() {
  const publicBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (!publicBase) return null;

  try {
    const origin = new URL(publicBase);
    const pathBase = (basePath || "").replace(/\/+$/, "");
    const mediaPath = pathBase
      ? `${pathBase}/${imageProxyPrefix}/**`
      : `/${imageProxyPrefix}/**`;

    return {
      protocol: origin.protocol.replace(":", "") as "http" | "https",
      hostname: origin.hostname,
      ...(origin.port ? { port: origin.port } : {}),
      pathname: mediaPath,
    };
  } catch {
    return null;
  }
}

function isLocalPublicBase(): boolean {
  const publicBase = process.env.NEXT_PUBLIC_BASE_URL || "";
  try {
    const hostname = new URL(publicBase).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

const publicImageRemotePattern = buildPublicImageRemotePattern();

// Keep in sync with lib/language-from-url.ts (next.config cannot use the @ alias).
const SUPPORTED_LANG = "en|hi|bn|ta";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  images: {
    // Next.js 16 blocks optimizing images from private IPs (localhost/127.0.0.1)
    // unless this is enabled. Required for local Laravel image URLs in development.
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === "development" || isLocalPublicBase(),
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
      ...(publicImageRemotePattern ? [publicImageRemotePattern] : []),
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
          source: `/${imageProxyPrefix}/:path*`,
          destination: `${cmsImageOrigin}/:path*`,
        },
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
