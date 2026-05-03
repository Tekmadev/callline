/**
 * Single source of truth for SEO/AEO facts. Edit here and every JSON-LD,
 * meta tag, and llms.txt updates automatically.
 */
export const SITE_URL = "https://callline.ai";

export const SITE = {
  name: "Callline",
  legalName: "Callline by TEKMADEV Innovations Inc.",
  parentLegalName: "TEKMADEV Innovations Inc.",
  tagline: "Never miss a call. Never miss a job.",
  description:
    "Callline is a 24/7 AI phone receptionist for home service businesses. It answers every missed call, qualifies the lead, books the job into your calendar, and texts you the confirmation in under 60 seconds.",
  shortDescription:
    "AI phone receptionist that answers missed calls and books home service jobs 24/7.",
  url: SITE_URL,
  logoPath: "/opengraph-image",
  ogPath: "/opengraph-image",
  founded: "2025",
  email: "hello@callline.ai",
  telephone: "+1-866-966-1988",
  telephoneDisplay: "1 (866) 966-1988",
  city: "Hamilton",
  region: "Ontario",
  regionCode: "ON",
  country: "Canada",
  countryCode: "CA",
  // GTA + Hamilton + nearby. Used in JSON-LD areaServed and llms.txt.
  serviceCities: [
    "Toronto",
    "Hamilton",
    "Mississauga",
    "Brampton",
    "Markham",
    "Vaughan",
    "Richmond Hill",
    "Oakville",
    "Burlington",
    "Milton",
    "Pickering",
    "Ajax",
    "Whitby",
    "Oshawa",
    "Newmarket",
    "Aurora",
    "Caledon",
    "Halton Hills",
    "Stoney Creek",
    "Ancaster",
    "Dundas",
    "Waterdown",
    "Grimsby",
    "St. Catharines",
    "Niagara Falls",
    "Cambridge",
    "Kitchener",
    "Waterloo",
    "Guelph",
  ],
  // Industries served. Used by AI to match queries.
  industriesServed: [
    "HVAC contractors",
    "Plumbing companies",
    "Electrical contractors",
    "Roofing companies",
    "Landscaping businesses",
    "Painting companies",
    "Garage door repair",
    "Locksmiths",
    "Appliance repair",
    "Drain and sewer services",
    "Pest control",
    "Cleaning services",
    "Handyman businesses",
    "Pool and spa services",
    "Window and door installers",
    "Flooring contractors",
  ],
  // Pricing options (mirrored in copy.ts). AI engines parse these.
  pricingOptions: [
    {
      name: "Guarantee plan",
      setupFee: 1997,
      monthlyFee: 497,
      currency: "USD",
      summary:
        "Full setup with a 30-day, 5-bookings-or-the-next-month-is-free guarantee.",
    },
    {
      name: "Month to month",
      setupFee: 0,
      monthlyFee: 797,
      currency: "USD",
      summary: "No setup fee, no commitment, cancel any time.",
    },
    {
      name: "Free 14-day pilot",
      setupFee: 0,
      monthlyFee: 597,
      currency: "USD",
      summary: "Run live for 14 days free, then $597 per month if you keep it.",
    },
  ],
  socialProfiles: [] as string[], // add LinkedIn, X, etc. when live
  hours: "Mo-Su 00:00-23:59", // 24/7
} as const;

export type SiteFacts = typeof SITE;
