/**
 * Renders a JSON-LD structured data <script> tag.
 *
 * Mounted from the root layout's <head> via `PageJsonLd`, so structured data
 * lands in <head>. This depends on `htmlLimitedBots: /.*` in next.config.js
 * forcing blocking (non-streamed) metadata for every request — without that,
 * Next's streaming-metadata mechanism conflicts with this hand-written
 * <head> and pushes its contents into <body> instead. Route → schema
 * mapping lives in `src/lib/schema/resolvePageSchema.js`.
 *
 * `<` is escaped so a schema string can never break out of the script tag.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
