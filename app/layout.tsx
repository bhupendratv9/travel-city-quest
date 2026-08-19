import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/QueryProvider";
import NavigationHistoryTracker from "@/components/providers/NavigationHistoryTracker";
import LanguageFromUrlSync from "@/components/providers/LanguageFromUrlSync";
import MotionProvider from "@/components/providers/MotionProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import AnalyticsScripts from "@/components/providers/AnalyticsScripts";

const siteUrl = "https://www.tv9hindi.com/city-quest";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "City Quest by Travel9: रोज़ाना ट्रैवल Quiz गेम खेलें और पॉइंट्स कमाएँ | TV9 भारतवर्ष",
  description:
    "Travel9 का रोज़ाना City Quest खेलें और शहरों, मशहूर जगहों के बारे में अपनी जानकारी परखें, सही जवाब चुनकर पॉइंट्स कमाएँ TV9 भारतवर्ष पर.",
  keywords: [
    "City Quest",
    "travel quiz",
    "ट्रैवल Quiz गेम",
    "city game",
    "travel game",
    "Travel9",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    title:
      "City Quest by Travel9: रोज़ाना ट्रैवल Quiz गेम खेलें और पॉइंट्स कमाएँ | TV9 भारतवर्ष",
    description:
      "Travel9 का रोज़ाना City Quest खेलें और शहरों, मशहूर जगहों के बारे में अपनी जानकारी परखें, सही जवाब चुनकर पॉइंट्स कमाएँ TV9 भारतवर्ष पर.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-poppins")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-MG95PSH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AnalyticsScripts />
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <QueryProvider>
            <AuthProvider>
              <MotionProvider>
                <Suspense fallback={null}>
                  <LanguageFromUrlSync />
                  <NavigationHistoryTracker />
                </Suspense>
                {children}
                <Toaster
                  expand={false}
                  position="bottom-right"
                  richColors={true}
                />
              </MotionProvider>
            </AuthProvider>
          </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
