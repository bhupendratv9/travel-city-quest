const DEFAULT_PROXY_PREFIX = "/media";

/** Hostnames the API may use in image_url — all rewrite to /media/... */
const DEFAULT_CMS_HOSTNAMES = ["cmsnew.tv9events.com", "new-cms.tv9events.com"];

function stripTrailingSlashes(value: string): string {
  let result = value.trim();
  while (result.endsWith("/")) {
    result = result.slice(0, -1);
  }
  return result;
}

function getProxyPrefix(): string {
  const raw = process.env.NEXT_PUBLIC_IMAGE_PROXY_PREFIX || DEFAULT_PROXY_PREFIX;
  const trimmed = raw.trim() || DEFAULT_PROXY_PREFIX;
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return stripTrailingSlashes(withLeading);
}

function hostnameFromOrigin(value: string): string | null {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

function getCmsHostnames(): Set<string> {
  const hosts = new Set<string>(DEFAULT_CMS_HOSTNAMES);

  const list = process.env.NEXT_PUBLIC_CMS_IMAGE_HOSTS;
  if (list) {
    for (const part of list.split(",")) {
      const host = part.trim();
      if (host) hosts.add(host);
    }
  }

  const legacyOrigin = process.env.NEXT_PUBLIC_CMS_IMAGE_ORIGIN;
  if (legacyOrigin) {
    const host = hostnameFromOrigin(legacyOrigin);
    if (host) hosts.add(host);
  }

  return hosts;
}

/**
 * Maps CMS absolute URLs to same-origin proxy paths for `<Image src>`.
 * Always returns a relative path (`/city-quest/media/...`) so no host
 * (localhost, news9live, tv9hindi) appears in `_next/image?url=`.
 * NEXT_PUBLIC_BASE_URL is intentionally not used here.
 */
export function toPublicImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    if (!getCmsHostnames().has(parsed.hostname)) {
      return url;
    }

    const basePath = stripTrailingSlashes(process.env.NEXT_PUBLIC_BASE_PATH || "");
    const proxyPath = `${getProxyPrefix()}${parsed.pathname}${parsed.search}`;

    return `${basePath}${proxyPath}`;
  } catch {
    return url;
  }
}
