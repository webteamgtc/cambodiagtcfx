/** @type {import('next').NextConfig} */

// Locale URL segments used by legacy redirects (current + historical global locales).
const SITE_LOCALES = ["km-intl", "en-intl", "km", "en"];
const LEGACY_BASE_LOCALES = [
  "ar", "zh", "zh-tw", "ms", "tr", "ur", "hi", "id",
  "fr", "es", "pt", "vi", "tl", "th", "ru", "ps", "it", "uz",
];
const LEGACY_REGION_CODES = ["ae", "in", "intl", "ru", "vi", "uz", "za", "vu", "mu"];
const LEGACY_LOCALE_PREFIXES = [
  ...SITE_LOCALES,
  ...LEGACY_BASE_LOCALES,
  ...LEGACY_BASE_LOCALES.filter((code) => code !== "zh-tw").flatMap((base) =>
    LEGACY_REGION_CODES.map((region) => `${base}-${region}`)
  ),
  ...LEGACY_REGION_CODES.map((region) => `en-${region}`),
];
const LOCALE_GROUP = Array.from(new Set(LEGACY_LOCALE_PREFIXES)).join("|");

// Old (pre-restructure) path -> current canonical path.
// Covers legacy Google-indexed URLs that now 404 after the structure change.
const LEGACY_REDIRECTS = [
  // Company (flat -> /company/*)
  ["/about-us", "/company/about-us"],
  ["/why-gtc-group", "/company/why-gtc-group"],
  ["/global-presence", "/company/global-presence"],
  ["/regulations", "/company/regulations"],
  ["/careers", "/company/careers"],
  ["/contact-us", "/company/contact-us"],
  ["/awards", "/company/awards"],
  ["/dynamic-leverage", "/company/dynamic-leverage"],
  ["/events-and-exhibitions", "/company/events-and-exhibitions"],
  ["/faqs", "/company/faqs"],

  // Trading (flat -> /trading/*)
  ["/delete", "/trading/delete"],
  ["/open-account", "/live-account-application"],
  ["/margin-bonus", "/trading/margin-bonus"],
  ["/deposit", "/trading/deposit"],
  ["/account-types", "/trading/account-types"],
  ["/mt4-platform", "/trading/mt4-platform"],
  ["/mt5-platform", "/trading/mt5-platform"],
  ["/gtc-go-app", "/trading/gtc-go-app"],
  ["/vps-hosting-services", "/trading/vps-hosting-services"],
  ["/pamm-account", "/trading/pamm-account"],
  ["/mam-account", "/trading/mam-account"],
  ["/swap-update", "/trading/swap-update"],
  ["/compensation-fund", "/trading/compensation-fund"],
  ["/free-demo-account", "/trading/free-demo-account"],
  ["/margin-bonus", "/trading/margin-bonus"],
  ["/swap-free-trading", "/trading/swap-free-trading"],


  // Markets (flat -> /markets/*)
  ["/forex", "/markets/forex"],
  ["/indices", "/markets/indices"],
  ["/commodities", "/markets/commodities"],
  ["/cfd-energy", "/markets/energy"],
  ["/precious-metals", "/markets/metals"],
  ["/economic-calendar", "/markets/economic-calendar"],
  ["/market-overview", "/markets"],

  // News
  ["/earnings-calendar", "/gtc-news/earnings-calendar"],
  ["/gtc-news/knowledge-to-learn", "/knowledge-to-learn"],

  // Legal (flat -> /legal/*)
  ["/cookie-policy", "/legal/cookie-policy"],
  ["/privacy-policy", "/legal/privacy-policy"],
   ["/privacy", "/legal/privacy-policy"],
  ["/terms-and-conditions", "/legal/terms-and-conditions"],
  ["/terms", "/legal/terms-and-conditions"],
  ["/kyc-compliance-policy", "/legal/kyc-compliance-policy"],
  ["/deposit-and-refund-policy", "/legal/deposit-and-refund-policy"],
  ["/restricted-countries", "/legal/restricted-countries"],
  ["/website-disclaimer", "/legal/website-disclaimer"],
  ["/risk-disclosure", "/legal/risk-disclosure"],
  ["/swap-free-terms-and-conditions", "/legal/swap-free-terms-and-conditions"],
  ["/legal-policies-client-agreements", "/legal/legal-documents"],
  ["/liquidity-provider","/knowledge-to-learn/liquidity-technology"],

  ["/legal","/legal/legal-documents"],
  
  ["/compensation-fund","/trading/compensation-fund"],
  ["/webinar-with-gtcfx","/"],
  ["/home2", "/"],
  // Retired pages -> closest relevant page (no direct equivalent)
  ["/download-app", "/trading/gtc-go-app"],
  ["/tutorial-videos", "/knowledge-to-learn"],
  ["/copy-trading", "/trading/pamm-account"],
  ["/glossary-faqs", "/knowledge-to-learn/trading-glossary"],
  ["/islamic-accounts", "/trading/swap-free-trading"],
  ["/liquidity-technology", "/company"],
  ["/liquidity-providers", "/company"],
  ["/introductory-broker", "/"],
  ["/affiliate-program", "/"],
  ["/withdrawal-policy", "/legal/deposit-and-refund-policy"],
  ["/customer-due-diligence-policy", "/legal/kyc-compliance-policy"],
  ["/client-agreement-MU", "/legal/website-disclaimer"],
  ["/client-agreement-VU", "/legal/website-disclaimer"],
];

const nextConfig = {
  // Pin the file-tracing root to this project so Next.js doesn't walk up the
  // directory tree while tracing serverless function dependencies.
  htmlLimitedBots: /.*/,
  outputFileTracingRoot: __dirname,

  // Keep serverless functions under Vercel's 250MB uncompressed limit.
  // A dynamic readFileSync (credential lookup) makes Next's file tracer
  // conservatively pull the whole project root into every function bundle —
  // which swept in the entire .git history (~177MB) and public/ assets (~142MB)
  // and pushed /api/platform-guide past 1GB. These are never needed at runtime.
  outputFileTracingExcludes: {
    "*": [
      "**/.git/**",
      "public/**",
      ".next/cache/**",
      "node_modules/@swc/**",
      "node_modules/esbuild/**",
      "node_modules/@esbuild/**",
      "node_modules/webpack/**",
      "node_modules/terser/**",
    ],
  },
  async redirects() {
    const out = [];

    for (const [from, to] of LEGACY_REDIRECTS) {
      // Default locale (no prefix)
      out.push({ source: from, destination: to, permanent: true });
      // All other locales, preserving the locale prefix
      out.push({
        source: `/:locale(${LOCALE_GROUP})${from}`,
        destination: `/:locale${to}`,
        permanent: true,
      });
    }

    return out;
  },
 images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gtcfx-bucket.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.gtcfx.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
