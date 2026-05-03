import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

/**
 * AEO-friendly robots policy.
 *
 * We explicitly allow the major AI crawlers so Callline shows up in
 * ChatGPT browsing, ChatGPT Search, Perplexity, Google AI Overviews,
 * Apple Intelligence, and Claude search. The site has no private routes,
 * so a blanket allow is intentional.
 */

const ALLOW_BOTS = [
  // Generic
  "*",
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google AI products
  "Google-Extended",
  "GoogleOther",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Common Crawl (feeds many model training sets and search indexes)
  "CCBot",
  // Microsoft / Copilot
  "Bingbot",
  // Meta AI
  "FacebookBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  // You.com, Phind, others
  "YouBot",
  "PhindBot",
  // Bytedance (Doubao)
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_BOTS.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
