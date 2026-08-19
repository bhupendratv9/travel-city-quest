declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_API_BASE_URL:string;
    NEXT_PUBLIC_BACK_END_URL: string
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_BASE_PATH?: string;
    /** Comma-separated CMS hostnames in API image_url (e.g. cmsnew.tv9events.com). */
    NEXT_PUBLIC_CMS_IMAGE_HOSTS?: string;
    /** @deprecated Use NEXT_PUBLIC_CMS_IMAGE_HOSTS — hostname is extracted if set. */
    NEXT_PUBLIC_CMS_IMAGE_ORIGIN?: string;
    /** Public path prefix shown in browser, e.g. /media */
    NEXT_PUBLIC_IMAGE_PROXY_PREFIX?: string;
    /** Server-only: where /media/* is fetched from (must match real file host). */
    CMS_IMAGE_ORIGIN?: string;
  }
}