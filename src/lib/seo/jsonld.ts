import { SITE, SITE_URL } from "./site";
import { copy } from "@/content/copy";

const ID = {
  organization: `${SITE_URL}/#organization`,
  parent: `${SITE_URL}/#parent-organization`,
  website: `${SITE_URL}/#website`,
  localBusiness: `${SITE_URL}/#localbusiness`,
  service: `${SITE_URL}/#service`,
  software: `${SITE_URL}/#software`,
  product: `${SITE_URL}/#product`,
  faq: `${SITE_URL}/#faq`,
  webpage: `${SITE_URL}/#webpage`,
  person: `${SITE_URL}/#founder`,
} as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ID.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${SITE.logoPath}`,
      width: 1200,
      height: 630,
    },
    description: SITE.description,
    foundingDate: SITE.founded,
    parentOrganization: {
      "@type": "Organization",
      "@id": ID.parent,
      name: SITE.parentLegalName,
      url: SITE_URL,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        contactType: "sales",
        areaServed: SITE.countryCode,
        availableLanguage: ["en"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          opens: "00:00",
          closes: "23:59",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      },
      {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "customer support",
        areaServed: SITE.countryCode,
        availableLanguage: ["en"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.regionCode,
      addressCountry: SITE.countryCode,
    },
    sameAs: SITE.socialProfiles,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.shortDescription,
    inLanguage: "en-CA",
    publisher: { "@id": ID.organization },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": ID.localBusiness,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    description: SITE.description,
    telephone: SITE.telephone,
    email: SITE.email,
    image: `${SITE_URL}${SITE.ogPath}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.regionCode,
      addressCountry: SITE.countryCode,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Greater Toronto Area (GTA)",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
      },
      ...SITE.serviceCities.map((city) => ({
        "@type": "City",
        name: city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Ontario",
          containedInPlace: { "@type": "Country", name: "Canada" },
        },
      })),
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    knowsAbout: SITE.industriesServed,
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": ID.software,
    name: `${SITE.name} AI Receptionist`,
    description: SITE.description,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI Phone Receptionist",
    operatingSystem: "Cloud / 24-7 phone line",
    inLanguage: ["en-CA", "en-US"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Home service business owners",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Greater Toronto Area, Hamilton, and surrounding Ontario",
      },
    },
    featureList: [
      "Answers inbound phone calls 24/7 with a natural AI voice",
      "Average answer time of 0.4 seconds",
      "Books jobs directly into your live calendar",
      "Texts the customer a confirmation",
      "Texts the business owner the lead and full transcript",
      "Knows your services, hours, pricing, and intake questions",
      "Warm transfers to a human when requested",
      "Searchable call recordings and transcripts",
      "Works alongside an existing receptionist",
    ],
    offers: SITE.pricingOptions.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.summary,
      priceCurrency: p.currency,
      price: p.monthlyFee,
      eligibleQuantity: { "@type": "QuantitativeValue", unitCode: "MON" },
    })),
    publisher: { "@id": ID.organization },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ID.service,
    name: "AI phone receptionist for home service businesses",
    serviceType: "AI answering service and appointment booking",
    description:
      "A 24/7 AI receptionist that answers missed calls for home service businesses, qualifies callers, books jobs into the owner's calendar, and texts both the customer and the owner with confirmation and transcript.",
    provider: { "@id": ID.organization },
    areaServed: [
      "Greater Toronto Area",
      "Ontario",
      ...SITE.serviceCities.slice(0, 12),
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: SITE.industriesServed.join(", "),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Callline plans",
      itemListElement: SITE.pricingOptions.map((p, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: p.name,
        description: p.summary,
        priceCurrency: p.currency,
        price: p.monthlyFee,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.monthlyFee,
          priceCurrency: p.currency,
          unitCode: "MON",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
        ...(p.setupFee > 0
          ? {
              addOn: {
                "@type": "Offer",
                name: "One-time setup",
                price: p.setupFee,
                priceCurrency: p.currency,
              },
            }
          : {}),
      })),
    },
    termsOfService: `${SITE_URL}/`,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        contactType: "sales",
      },
    },
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": ID.faq,
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function webPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": ID.webpage,
    url: SITE_URL,
    name: `${SITE.name}. ${SITE.tagline}`,
    description: SITE.description,
    inLanguage: "en-CA",
    isPartOf: { "@id": ID.website },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}${SITE.ogPath}`,
    },
    about: { "@id": ID.service },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Home service business owners in the GTA and Ontario",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "p"],
    },
  };
}

export function homePageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      localBusinessSchema(),
      softwareApplicationSchema(),
      serviceSchema(),
      faqPageSchema(),
      webPageSchema(),
    ],
  };
}
