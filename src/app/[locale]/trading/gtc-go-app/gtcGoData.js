import { APP_STORE_HREF, GOOGLE_PLAY_HREF, GTC_GO_APP_DOWNLOAD_HREF, CLIENT_PORTAL_HREF } from "@/lib/gtcGoAppLinks";

export { CLIENT_PORTAL_HREF };

export const gtcGoData = {
  hero: {
    logo: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp",
    icon: "/new-design/Trading/f-logo.svg",
    tagline: "TRUSTED | REGULATED | GLOBAL",
    title: "Trade Anytime, Anywhere with GTC Go",
    description: "Fast execution. Smart tools. Full control.",
    supportTitle: "Customer Support",
    supportLabel: "24/7 live assistance",
    executionLabel: "Execution 38 ms · No requotes",
    phoneAlt: "GTC Go mobile app",
    phoneImage: "/trading/app/app-banner.png",
    backgroundImage: "/new-design/Trading/banner-gtc-go.webp",
    appStoreHref: APP_STORE_HREF,
    googlePlayHref: GOOGLE_PLAY_HREF,
  },

  downloadStrip: {
    icon: "/new-design/Trading/f-logo.svg",
    description:
      "GTC Go is your gateway to a complete trading ecosystem — designed for traders, investors, and partners who demand control, speed, and flexibility — all in one secure platform.",
    qrSrc: "/app/qrcode.webp",
    appStoreHref: APP_STORE_HREF,
    googlePlayHref: GOOGLE_PLAY_HREF,
  },

  featureCards: {
    intro: {
      icon: "/new-design/Trading/f-logo.svg",
      description:
        "Forex, gold, oil, indices, metal and more — 7+ trading markets accessible from a single, unified watchlist. Real-time quotes, instant fills, professional order types.",
      qrSrc: "/app/qrcode.webp",
      appStoreHref: APP_STORE_HREF,
      googlePlayHref: GOOGLE_PLAY_HREF,
    },
    left: {
      image: "/new-design/Trading/go-img-one.webp",
      logo: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp",
      title: "One app. Every asset class.",
      description:
        "Forex, gold, oil, indices, metal and more — 7+ trading markets accessible from a single, unified watchlist. Real-time quotes, instant fills, professional order types.",
    },
    right: {
      image: "/new-design/Trading/go-img-two.webp",
    },
  },

  multiDevice: {
    title: "Not just mobile — your professional trading workstation.",
    description:
      "Four pillars. One app. From order entry to portfolio oversight, GTC Go ships the tools professionals expect — refined for the rhythm of a thumb.",
    secondaryDescription:
      "GTC Go is available on both iOS and Android, supporting iOS 12 and above and Android 8 and above. Manage positions, track live charts, and place orders from a single secure account — synced across every device.",
    ctaLabel: "Open Account",
    ctaHref: "/trading/open-live-account",
    footnote:
      "Prefer working across several screens? The desktop version is designed for multi-monitor setups.",
    defaultPlatform: "windows",
    devicesImage: "/new-design/Trading/gtc-new-img-3.webp",
    platforms: [
      { key: "windows", label: "Windows", icon: "windows", href: CLIENT_PORTAL_HREF },
      { key: "macos", label: "MacOS", icon: "mac", href: CLIENT_PORTAL_HREF },
      { key: "linux", label: "Linux", icon: "linux", href: CLIENT_PORTAL_HREF },
      { key: "ios", label: "iOS", icon: "mac", href: GTC_GO_APP_DOWNLOAD_HREF },
      { key: "android", label: "Android", icon: "android", href: GTC_GO_APP_DOWNLOAD_HREF },
      { key: "webtrader", label: "WebTrader", icon: "web", href: CLIENT_PORTAL_HREF },
    ],
  },

  showcase: {
    eyebrow: "Built for serious traders",
    title: "Everything you need. Nothing you don't.",
    description:
      "Four pillars. One app. From order entry to portfolio oversight, GTC Go ships the tools professionals expect — refined for the rhythm of a thumb.",
    promo: {
      title: "Trade. Anywhere. Anytime.",
      description:
        "Global markets in the palm of your hand. One tap. One swipe.",
    },
    screens: [
      { src: "/new-design/Trading/one.svg", alt: "GTC Go market watchlist" },
      { src: "/new-design/Trading/two.svg", alt: "GTC Go order entry screen" },
      { src: "/new-design/Trading/three.svg", alt: "GTC Go account management" },
      { src: "/new-design/Trading/four.svg", alt: "GTC Go copy trading" },
      { src: "/new-design/Trading/five.svg", alt: "GTC Go chart and quotes" },
    ],
    columns: [
      {
        id: "col-1",
        direction: "up",
        duration: 38,
        offset: 0,
        items: [
          { type: "screen", screenIndex: 0, src: "/new-design/Trading/one.svg", alt: "GTC Go market watchlist" },
          { type: "promo", title: "Get Started in Minutes.", description: " Link an existing account or open a new one — simple steps, full control over how you begin." },
          { type: "screen", screenIndex: 1, src: "/new-design/Trading/two.svg", alt: "GTC Go order entry screen" },
          { type: "promo", title: "Trade in Real Time.", description: "Live Buy/Sell pricing, flexible lot sizing, and instant execution — place your trade exactly when you're ready." },
          { type: "screen", screenIndex: 2, src: "/new-design/Trading/three.svg", alt: "GTC Go account management" },
          { type: "promo", title: "All Markets. One App.", description: " Track metals, energy, forex, indices, stocks and futures side by side — real-time prices, always within reach." },
        ],
      },
      {
        id: "col-2",
        direction: "down",
        duration: 44,
        offset: -56,
        items: [
          { type: "promo", title: "Trade in Real Time.", description: "Live Buy/Sell pricing, flexible lot sizing, and instant execution — place your trade exactly when you're ready." },
          { type: "screen", screenIndex: 1, src: "/new-design/Trading/two.svg", alt: "GTC Go order entry screen" },
          { type: "promo", title: "All Markets. One App.", description: " Track metals, energy, forex, indices, stocks and futures side by side — real-time prices, always within reach." },
          { type: "screen", screenIndex: 2, src: "/new-design/Trading/three.svg", alt: "GTC Go account management" },
          { type: "promo", title: "Explore Copy Trading.", description: " Browse strategy providers and choose the ones that fit your goals — you decide what to follow, and when to stop." },
          { type: "screen", screenIndex: 3, src: "/new-design/Trading/four.svg", alt: "GTC Go copy trading" },
        ],
      },
      {
        id: "col-3",
        direction: "up",
        duration: 50,
        offset: -28,
        items: [
          { type: "screen", screenIndex: 2, src: "/new-design/Trading/three.svg", alt: "GTC Go account management" },
          { type: "promo", title: "All Markets. One App.", description: " Track metals, energy, forex, indices, stocks and futures side by side — real-time prices, always within reach." },
          { type: "screen", screenIndex: 3, src: "/new-design/Trading/four.svg", alt: "GTC Go copy trading" },
          { type: "promo", title: "Explore Copy Trading.", description: " Browse strategy providers and choose the ones that fit your goals — you decide what to follow, and when to stop." },
          { type: "screen", screenIndex: 4, src: "/new-design/Trading/five.svg", alt: "GTC Go chart and quotes" },
          { type: "promo", title: "Read the Market, Your Way.", description: " Live candlestick charts and instant quotes help you study price action before you decide." },
        ],
      },
      {
        id: "col-4",
        direction: "down",
        duration: 46,
        offset: -72,
        items: [
          { type: "promo", title: "Explore Copy Trading.", description: " Browse strategy providers and choose the ones that fit your goals — you decide what to follow, and when to stop." },
          { type: "screen", screenIndex: 3, src: "/new-design/Trading/four.svg", alt: "GTC Go copy trading" },
          { type: "promo", title: "Read the Market, Your Way.", description: " Live candlestick charts and instant quotes help you study price action before you decide." },
          { type: "screen", screenIndex: 4, src: "/new-design/Trading/five.svg", alt: "GTC Go chart and quotes" },
          { type: "promo", title: "Get Started in Minutes.", description: " Link an existing account or open a new one — simple steps, full control over how you begin." },
          { type: "screen", screenIndex: 0, src: "/new-design/Trading/one.svg", alt: "GTC Go market watchlist" },
        ],
      },
      {
        id: "col-5",
        direction: "up",
        duration: 42,
        offset: -40,
        items: [
          { type: "screen", screenIndex: 4, src: "/new-design/Trading/five.svg", alt: "GTC Go chart and quotes" },
          { type: "promo", title: "Read the Market, Your Way.", description: " Live candlestick charts and instant quotes help you study price action before you decide." },
          { type: "screen", screenIndex: 0, src: "/new-design/Trading/one.svg", alt: "GTC Go market watchlist" },
          { type: "promo", title: "Get Started in Minutes.", description: " Link an existing account or open a new one — simple steps, full control over how you begin." },
          { type: "screen", screenIndex: 1, src: "/new-design/Trading/two.svg", alt: "GTC Go order entry screen" },
          { type: "promo", title: "All Markets. One App.", description: " Track metals, energy, forex, indices, stocks and futures side by side — real-time prices, always within reach." },
        ],
      },
    ],
  },

  categories: {
    eyebrow: "The Difference",
    title: "Not just mobile — your professional trading workstation.",
    description:
      "GTC Go is a full trading terminal designed for the small screen — with no compromise on tools or execution.",
    tagline: "TRUSTED | REGULATED | GLOBAL",
    logo: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp",
    timelineImage: "/new-design/Trading/timeline.png",
    tree: [
      {
        key: "products",
        label: "Products",
        children: [
          {
            key: "forex",
            label: "Forex",
            children: [{ key: "major", label: "Major / Minor / Exotic" }],
          },
          { key: "energy", label: "Energy & Metals" },
          { key: "shares", label: "Shares / Crypto / Futures CFDs" },
        ],
      },
      {
        key: "accounts",
        label: "Accounts",
        children: [
          { key: "demo", label: "Demo Account" },
          {
            key: "usc",
            label: "USC Account",
            children: [{ key: "cent", label: "Cent-Based" }],
          },
          { key: "usd", label: "USD Account" },
        ],
      },
      {
        key: "platform",
        label: "Platform",
        children: [{ key: "gtcApp", label: "GTC App" }],
      },
      {
        key: "services",
        label: "Services",
        children: [
          { key: "deposit", label: "Deposit" },
          {
            key: "withdrawal",
            label: "Withdrawal",
            children: [{ key: "kyc", label: "KYC & Support" }],
          },
        ],
      },
    ],
  },

  bottomCta: {
    eyebrow: "Get The App",
    titleLine1: "Let trading",
    titleLine2: "live alongside you.",
    description:
      "One download. Half a minute. A market that travels at the speed of your life.",
    features: [
      "7+ trading markets",
      "Live tick-by-tick quotes",
      "One-tap deposits & withdrawals",
      "50+ technical indicators",
      "Custom price & pattern alerts",
    ],
    supportTitle: "Customer Support",
    supportLabel: "24/7 live assistance",
    executionLabel: "Supports iOS 12+ · Android 8+",
    phoneAlt: "GTC Go app",
    appStoreHref: APP_STORE_HREF,
    googlePlayHref: GOOGLE_PLAY_HREF,
    phoneImage: "/trading/app/app-banner.png",
    backgroundImage: "/new-design/Trading/gtc-new-last-2.png",
  },
};
