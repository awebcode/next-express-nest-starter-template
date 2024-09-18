import { Metadata, type Viewport } from "next";
export const defaultSEOdata: Metadata = {
  title: "Next.js Starter - Asikur Rahman",
  description: "Default Description",
  keywords: ["default", "keywords"],
  openGraph: {
    title: "Next.js Starter - Asikur Rahman",
    description: "Default Description",
    url: "https://nextjs.org",
    siteName: "Next.js",
    locale: "en",
    type: "website",
  },
  twitter: {
    title: "Next.js Starter - Asikur Rahman",
    description: "Default Description",
    card: "summary_large_image",
    site: "@vercel",
    creator: "@vercel",
  },
  appleWebApp: {
    title: "Next.js Starter - Asikur Rahman",
    capable: true,
    statusBarStyle: "default",
  },
  facebook: {
    appId: "123456789",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: "all",
  },
  icons: [
    {
      url: "https://nextjs.org/og.png",
      type: "image/png",
      sizes: "512x512",
    },
    {
      url: "https://nextjs.org/og.png",
      type: "image/png",
      sizes: "512x512",
    },
  ],
  applicationName: "Next.js",
  authors: [
    { name: "Vercel", url: "https://vercel.com" },
    { name: "Next.js", url: "https://nextjs.org" },
  ],
  verification: {
    google: "google-site-verification=1234567890",
    yandex: "yandex-verification=1234567890",
    yahoo: "y_key=1234567890",
  },

  manifest: "https://nextjs.org/manifest.webmanifest",
  appLinks: {
    web: [{ url: "https://nextjs.org", should_fallback: true }],
  },
  creator: "Asikur Rahman",
  category: "ecommerce",
};
// default viewport data
export const defaultViewPort: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#ffffff",
  minimumScale: 1,
  interactiveWidget: "resizes-content",
};
