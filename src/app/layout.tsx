import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import { SITE, SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name}. ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.parentLegalName, url: SITE_URL }],
  creator: SITE.parentLegalName,
  publisher: SITE.parentLegalName,
  category: "Business Software",
  keywords: [
    "AI receptionist",
    "AI phone answering service",
    "missed call answering",
    "AI call answering",
    "AI for home service businesses",
    "24/7 answering service",
    "AI booking assistant",
    "virtual receptionist",
    "AI dispatcher",
    "home service software",
    "HVAC answering service",
    "plumber AI receptionist",
    "electrician answering service",
    "roofing answering service",
    "landscaping answering service",
    "GTA answering service",
    "Toronto AI receptionist",
    "Hamilton AI receptionist",
    "Mississauga answering service",
    "Ontario AI phone receptionist",
    "Callline",
    "Callline.ai",
    "TEKMADEV",
  ],
  openGraph: {
    title: `${SITE.name}. ${SITE.tagline}`,
    description: SITE.shortDescription,
    url: SITE_URL,
    siteName: SITE.name,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: SITE.ogPath,
        width: 1200,
        height: 630,
        alt: `${SITE.name}. ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}. ${SITE.tagline}`,
    description: SITE.shortDescription,
    images: [SITE.ogPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": "/",
      "en-US": "/",
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Hamilton, Ontario, Canada",
    "geo.position": "43.2557;-79.8711",
    ICBM: "43.2557, -79.8711",
    "business:contact_data:street_address": SITE.city,
    "business:contact_data:locality": SITE.city,
    "business:contact_data:region": SITE.regionCode,
    "business:contact_data:country_name": SITE.country,
    "business:contact_data:phone_number": SITE.telephoneDisplay,
    "business:contact_data:email": SITE.email,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${fraunces.variable} ${interTight.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-full bg-bone text-ink antialiased">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
