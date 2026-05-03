/**
 * Renders one or more JSON-LD blocks in a way that survives React 19 / Next 16
 * server rendering and is valid for Google, ChatGPT crawlers, and Perplexity.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
