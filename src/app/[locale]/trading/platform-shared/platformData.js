// ─── Shared URLs ────────────────────────────────────────────────────────────
export const REGISTER_HREF = "/live-account-application";
export const CLIENT_PORTAL_HREF = "https://client.gtcfx.com";
export const CONTACT_HREF = "/company/contact-us";

export const DOWNLOAD_LINKS = {
  windows: "https://download.terminal.free/cdn/web/gtc.global.sa/mt4/gtcglobalsa4setup.exe",
  mac: "https://download.terminal.free/cdn/web/gtc.global.sa/mt4/gtcglobalsa4setup.exe",
  linux: "https://download.terminal.free/cdn/web/gtc.global.sa/mt4/gtcglobalsa4setup.exe",
  ios: "https://download.terminal.free/cdn/mobile/mt4/ios",
  android: "https://download.terminal.free/cdn/web/gtc.global.sa/mt4/gtcglobalsa4setup.exe",
  webtrader: "#",
};

export const DOWNLOAD_LINKS_MT5  = {
  windows: "https://download.terminal.free/cdn/web/gtc.global.trade/mt5/gtcglobaltrade5setup.exe",
  mac: "https://download.terminal.free/cdn/web/gtc.global.trade/mt5/gtcglobaltrade5setup.exe",
  linux: "https://download.terminal.free/cdn/web/gtc.global.trade/mt5/gtcglobaltrade5setup.exe",
  ios: "https://download.terminal.free/cdn/mobile/mt5/ios",
  android: "https://download.terminal.free/cdn/web/gtc.global.trade/mt5/gtcglobaltrade5setup.exe",
};

// ─── MT4 Data ────────────────────────────────────────────────────────────────
export const MT4 = {
  slug: "mt4-platform",
  i18nKey: "mt4PlatformPage",
  platform: "MT4",
  fullName: "MetaTrader 4",
  badge: "MetaTrader 4 · Live Markets Open",
  heroHeading: "MT4 — The Trader's Choice worldwide.",
  heroSub:
    "Powerful charting, automated strategies, and lightning-fast execution — the world's most trusted trading platform, engineered by GTCFX for serious traders.",
  heroBannerSrc: "/new-design/Trading/mtbanner.svg",
  downloadLabel: "Download MT4",
  stats: [
    { value: "30+", label: "Built-in technical indicators" },
    { value: "9", label: "Timeframes from M1 to MN" },
    { value: "4", label: "Pending order types for any strategy" },
    { value: "EA", label: "Full Expert Advisor auto-trading support" },
  ],
  heroTrustItems: [
    { label: "4.8/5 Trader rating" },
    { label: "7+ Trading Markets" },
    { label: "0.0 Spreads from" },
  ],
  capabilities: [
    {
      num: "01",
      tag: "Advanced Charting",
      heading: "Read the market like a professional desk.",
      sub: "Three chart types, nine timeframes, and over thirty built-in indicators — paired with unlimited custom templates and analytical objects for technical traders who think in detail.",
      bullets: [
        { bold: "30+ indicators", rest: "including RSI, MACD, Bollinger Bands, Ichimoku Cloud, Fibonacci suite." },
        { bold: "9 timeframes", rest: "from M1 scalping up to monthly macro perspective." },
        { bold: "Custom templates & profiles", rest: "— save your workspace, restore it in one click." },
        { bold: "Multi-chart layouts", rest: "or true multi-asset, multi-timeframe analysis." },
      ],
      imgSrc: "/trading/mt4-second.webp",
      imgAlt: "Advanced charting on MT4",
      imgRight: true,
    },
    {
      num: "02",
      tag: "Automated Trading",
      heading: "Let algorithms do the night shift.",
      sub: "Native MQL4 support means you can deploy your own Expert Advisors, import community-built systems, or copy signals from verified traders — all running 24 hours a day on GTCFX's low-latency infrastructure.",
      bullets: [
        { bold: "MQL4 language", rest: "— full IDE for writing, compiling and debugging custom EAs." },
        { bold: "Strategy Tester", rest: "— backtest against years of tick data before going live." },
        { bold: "Signal subscription", rest: "— copy verified trader portfolios with one click." },
        { bold: "VPS hosting available", rest: "— keep your strategy online 24/7 without interruption." },
      ],
      imgSrc: "/trading/mt2.webp",
      imgAlt: "Automated trading on MT4",
      imgRight: false,
    },
    {
      num: "03",
      tag: "Flexible Order Types",
      heading: "Every strategy has its own execution.",
      sub: "From instant market entries to multi-step pending strategies, MT4 supports the four order types every serious trader needs — plus advanced features like trailing stops that adapt as the market moves in your favor.",
      bullets: [
        { bold: "Market Order", rest: "— instant execution at the best available price." },
        { bold: "Limit Order", rest: "— buy below or sell above current market price." },
        { bold: "Stop Order", rest: "— trigger entry on breakouts in either direction." },
        { bold: "Trailing Stop", rest: "— protect profits as the trade moves your way." },
      ],
      imgSrc: "/trading/mt3.webp",
      imgAlt: "Order types on MT4",
      imgRight: true,
    },
    {
      num: "04",
      tag: "Multi-Asset Markets",
      heading: "Trade the entire market on one screen.",
      sub: "Forex, indices, commodities, crypto, shares — over 200 instruments live in a single MT4 terminal. Switch between asset classes without ever leaving the platform.",
      bullets: [
        { bold: "FX Majors, Minors & Exotics", rest: "— 60+ currency pairs with deep liquidity." },
        { bold: "Global Indices", rest: "— S&P 500, NASDAQ, DAX, Nikkei and more." },
        { bold: "Commodities", rest: "— gold, silver, oil, natural gas." },
        { bold: "Shares", rest: "— BTC, ETH, plus single-stock CFDs." },
      ],
      imgSrc: "/trading/mt4.webp",
      imgAlt: "Multi-asset market watch on MT4",
      imgRight: false,
    },
    {
      num: "05",
      tag: "One-Click Trading",
      heading: "From signal to fill — in a single click.",
      sub: "Speed isn't a luxury when markets move in milliseconds. Enable one-click mode and your order goes straight to market — entries, exits, position adjustments, all at the speed of decision.",
      bullets: [
        { bold: "Single-click execution", rest: "including RSI, MACD, Bollinger Bands, Ichimoku Cloud, Fibonacci suite." },
        { bold: "Close All / Close Profitable", rest: "position management in one action." },
        { bold: "Live P&L monitoring", rest: "with floating profit tracked tick-by-tick." },
        { bold: "Drag-to-modify", rest: "stops and limits directly on the chart." },
      ],
      imgSrc: "/trading/mt5.webp",
      imgAlt: "One-click trading on MT4",
      imgRight: true,
    },
  ],
  downloads: [
    {
      platform: "Windows",
      version: "v4.0 · 8.4 MB",
      description: "The full desktop experience — multi-monitor, multi-chart, every MT4 feature unlocked.",
      icon: "windows",
      cta: "Download",
      href: DOWNLOAD_LINKS.windows,
      external: false,
    },
    {
      platform: "Mac OS",
      version: "Universal · M1/M2/M3",
      description: "Native Apple Silicon build for blazing-fast performance on macOS Sonoma+.",
      icon: "mac",
      cta: "Download",
      href: DOWNLOAD_LINKS.mac,
      external: false,
    },
    {
      platform: "iOS",
      version: "App Store · iPhone & iPad",
      description: "Native iPhone & iPad app with Face ID security and Apple Watch alerts.",
      icon: "ios",
      cta: "App Store →",
      href: DOWNLOAD_LINKS.ios,
      external: true,
    },
    {
      platform: "Android",
      version: "Google Play · Phone & Tablet",
      description: "Full-featured Android client with biometric login and push notifications.",
      icon: "android",
      cta: "Google Play →",
      href: DOWNLOAD_LINKS.android,
      external: true,
    },
  ],
  edge: {
    eyebrow: "Why GTCFX MT4",
    heading1: "The same platform.",
    heading2: "A better edge.",
    sub: "MT4 is the platform. GTCFX is the infrastructure underneath it — tier-1 liquidity providers, redundant equinix data centers in NY, London and Tokyo, and a support team who actually trade.",
    stats: [
      { value: "0.0 pip", label: "Ultra-low spreads", desc: "Tighter than most institutional desks — starting at 0.0 pip on EURUSD with raw spread accounts." },
      { value: "38 ms", label: "Lightning execution", desc: "Average fill speed of 38 milliseconds across our equinix-colocated execution nodes." },
      { value: "100%", label: "No re-quotes", desc: "Pure STP/ECN model. Your order goes to liquidity — no dealer-desk intervention, ever." },
      { value: "24/7", label: "Multilingual support", desc: "Real traders, real time — by chat, phone, email across 15+ languages while markets are open." },
    ],
  },
  steps: {
    eyebrow: "Get Started",
    heading1: "Three steps.",
    heading2: "One trader.",
    sub: "From sign-up to your first live trade in under fifteen minutes. No paperwork shuffles, no opaque approvals — just real markets, opened.",
    items: [
      { num: 1, title: "Open Account", desc: "Register online in 3 minutes. Verify your ID, fund your wallet, and your trading account is live — same day.", tag: "~ 3 min · online" },
      { num: 2, title: "Download MT4", desc: "Pick your platform — Windows, Mac, iOS, Android, or use WebTrader. Same login works across all five.", tag: "~ 2 min · install" },
      { num: 3, title: "Login & Trade", desc: "Enter your GTCFX server credentials, set up your charts and indicators, and place your first trade.", tag: "Markets · Live" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading1: "Questions?",
    heading2: "Asked. Answered.",
    sub: "The most common questions traders ask before downloading MT4 on GTCFX. Don't see yours? Our team is one click away — 24 hours a day during market hours.",
    items: [
      {
        q: "What is MetaTrader 4?",
        a: "MT4 is the global standard for retail FX and CFD trading — built around netting, MQL4, and the largest community of EAs and indicators on earth. MT5 is multi-market (adds stocks and futures), supports hedging, and uses MQL5. Most retail traders pick MT4 for its mature ecosystem; pros sometimes use both.",
      },
      { q: "Does MT4 support automated trading (Expert Advisors)?", a: "Yes. The GTCFX MT4 mobile app for iOS and Android includes full charting, order management, and real-time alerts." },
      { q: "Which devices is MT4 available on?", a: "Automated trading carries the same market risk as manual trading. Always backtest on a demo account before going live." },
      { q: "Is MT4 suitable for beginners?", a: "Copy the .ex4 or .mq4 file into the MQL4/Indicators folder inside the MT4 data directory, then restart the platform." },
      { q: "How do I download and install MT4?", a: "Yes — open a free demo account with virtual funds from the client portal. No deposit required." },
     ],
  },
  cta: {
    eyebrow: "Ready when you are",
    heading: "Download MT4.\nBegin your trading journey.",
    sub: "The world's most trusted trading platform. The execution infrastructure built for serious traders. One free download stands between you and the markets.",
    primaryLabel: "Download MT4 — Free",
    secondaryLabel: "Open Live Account →",
    footnote: "Demo also available · no card required",
    downloadLink: "https://download.terminal.free/cdn/web/gtc.global.sa/mt4/gtcglobalsa4setup.exe",
  },
};

// ─── MT5 Data ─────────────────────────────────────────────────────────────────
export const MT5 = {
  ...MT4,
  slug: "mt5-platform",
  i18nKey: "mt5PlatformPage",
  platform: "MT5",
  fullName: "MetaTrader 5",
  badge: "MetaTrader 5 · Live Markets Open",
  heroHeading: "MT5 — The Next Generation Platform.",
  heroSub:
    "More asset classes, deeper analytics, and native hedging — the evolution of MetaTrader engineered by GTCFX for multi-market professional traders.",
  downloadLabel: "Download MT5",
  stats: [
    { value: "38+", label: "Built-in technical indicators" },
    { value: "21", label: "Timeframes from M1 to MN" },
    { value: "6", label: "Pending order types for any strategy" },
    { value: "EA", label: "MQL5 Expert Advisor auto-trading support" },
  ],
  heroTrustItems: [
    { label: "4.9/5 Trader rating" },
    { label: "7+ Trading Markets" },
    { label: "0.0 Spreads from" },
  ],
  capabilities: [
    {
      ...MT4.capabilities[0],
      tag: "Advanced Charting",
      heading: "Read the market like a professional desk.",
      bullets: [
        { bold: "38+ indicators", rest: "including all MT4 indicators plus additional oscillators and volume tools." },
        { bold: "21 timeframes", rest: "from M1 scalping up to monthly macro perspective." },
        { bold: "Custom templates & profiles", rest: "— save your workspace, restore it in one click." },
        { bold: "Multi-chart layouts", rest: "or true multi-asset, multi-timeframe analysis." },
      ],
    },
    {
      ...MT4.capabilities[1],
      tag: "Automated Trading",
      heading: "MQL5 — the most powerful EA language.",
      sub: "MQL5 offers object-oriented programming, faster backtesting engine, and direct access to the MQL5 community marketplace with thousands of ready-to-deploy EAs.",
      bullets: [
        { bold: "MQL5 language", rest: "— full OOP support for writing institutional-grade EAs." },
        { bold: "Strategy Tester", rest: "— multi-currency, multi-asset backtesting in one session." },
        { bold: "Signal subscription", rest: "— copy verified trader portfolios with one click." },
        { bold: "VPS hosting available", rest: "— keep your strategy online 24/7 without interruption." },
      ],
    },
    {
      ...MT4.capabilities[2],
      tag: "Flexible Order Types",
      heading: "Six order types for every strategy.",
      sub: "MT5 expands on MT4's order types with two additional pending order types — Buy Stop Limit and Sell Stop Limit — giving you even more precision in complex execution strategies.",
      bullets: [
        { bold: "Market Order", rest: "— instant execution at the best available price." },
        { bold: "Limit Order", rest: "— buy below or sell above current market price." },
        { bold: "Stop Order", rest: "— trigger entry on breakouts in either direction." },
        { bold: "Buy/Sell Stop Limit", rest: "— a pending order that converts to a limit at trigger." },
      ],
    },
    {
      ...MT4.capabilities[3],
      tag: "Multi-Asset Markets",
      heading: "Stocks, Futures, Forex — one terminal.",
      sub: "MT5 adds native stock trading and futures instruments alongside forex and CFDs — all in a single terminal with unified margin and portfolio view.",
      bullets: [
        { bold: "FX Majors, Minors & Exotics", rest: "— 60+ currency pairs with deep liquidity." },
        { bold: "Global Indices & Stocks", rest: "— S&P 500, NASDAQ, DAX and individual equities." },
        { bold: "Commodities", rest: "— gold, silver, oil, natural gas." },
        { bold: "Crypto & Futures", rest: "— BTC, ETH, plus futures instruments." },
      ],
    },
    {
      ...MT4.capabilities[4],
      tag: "One-Click Trading",
      heading: "From signal to fill — in a single click.",
      sub: "MT5's enhanced one-click trading panel includes depth of market (DOM) view alongside your charts — giving you full order-book transparency at the moment of execution.",
      bullets: [
        { bold: "Single-click execution", rest: "with optional depth of market view for precise entries." },
        { bold: "Close All / Close Profitable", rest: "position management in one action." },
        { bold: "Live P&L monitoring", rest: "with floating profit tracked tick-by-tick." },
        { bold: "Drag-to-modify", rest: "stops and limits directly on the chart." },
      ],
    },
  ],
  downloads: [
    {
      platform: "Windows",
      version: "v4.0 · 8.4 MB",
      description: "The full desktop experience — multi-monitor, multi-chart, every MT4 feature unlocked.",
      icon: "windows",
      cta: "Download",
      href: DOWNLOAD_LINKS_MT5.windows,
      external: false,
    },
    {
      platform: "Mac OS",
      version: "Universal · M1/M2/M3",
      description: "Native Apple Silicon build for blazing-fast performance on macOS Sonoma+.",
      icon: "mac",
      cta: "Download",
      href: DOWNLOAD_LINKS_MT5.mac,
      external: false,
    },
    {
      platform: "iOS",
      version: "App Store · iPhone & iPad",
      description: "Native iPhone & iPad app with Face ID security and Apple Watch alerts.",
      icon: "ios",
      cta: "App Store →",
      href: DOWNLOAD_LINKS_MT5.ios,
      external: true,
    },
    {
      platform: "Android",
      version: "Google Play · Phone & Tablet",
      description: "Full-featured Android client with biometric login and push notifications.",
      icon: "android",
      cta: "Google Play →",
      href: DOWNLOAD_LINKS_MT5.android,
      external: true,
    },
  ],
  edge: {
    eyebrow: "Why GTCFX MT5",
    heading1: "The same platform.",
    heading2: "A better edge.",
    sub: "MT5 is the platform. GTCFX is the infrastructure underneath it — tier-1 liquidity providers, redundant equinix data centers in NY, London and Tokyo, and a support team who actually trade.",
    stats: MT4.edge.stats,
  },
  steps: {
    ...MT4.steps,
    items: [
      { num: 1, title: "Open Account", desc: "Register online in 3 minutes. Verify your ID, fund your wallet, and your trading account is live — same day.", tag: "~ 3 min · online" },
      { num: 2, title: "Download MT5", desc: "Pick your platform — Windows, Mac, iOS, Android, or use WebTrader. Same login works across all five.", tag: "~ 2 min · install" },
      { num: 3, title: "Login & Trade", desc: "Enter your GTCFX server credentials, set up your charts and indicators, and place your first trade.", tag: "Markets · Live" },
    ],
  },
  faq: {
    ...MT4.faq,
    eyebrow: "FAQ",
    sub: "The most common questions traders ask before downloading MT5 on GTCFX. Don't see yours? Our team is one click away — 24 hours a day during market hours.",
    items: [
      {
        q: "What is MetaTrader 5?",
        a: "MetaTrader 5 (MT5) is the newer, more advanced successor to MT4, offering an expanded set of order types, additional timeframes, a built-in economic calendar, and support for a broader range of asset classes beyond forex — including stocks, commodities, and indices, depending on your broker's offering.",
      },
      { q: "What's the difference between MT4 and MT5?", a: "MT5 offers more built-in technical indicators and timeframes, a more advanced strategy tester with multi-threaded backtesting, an integrated economic calendar, and support for hedging and netting account modes. MT4 remains popular for its simplicity, lighter resource use, and the largest existing library of community EAs and indicators. Neither platform is strictly better — the right choice depends on whether you prioritize MT4's simplicity and EA ecosystem or MT5's broader toolset and multi-asset support." },
      { q: "Can I run Expert Advisors on MT5?", a: "Yes. MT5 supports Expert Advisors written in MQL5, which is not directly compatible with MQL4 code — EAs and custom indicators built for MT4 generally need to be rewritten or converted to work on MT5." },
      { q: "Does MT5 support hedging?", a: "Yes. MT5 supports both netting and hedging account types. With hedging mode enabled, you can hold simultaneous long and short positions on the same instrument — useful for advanced strategies like grid trading, lock-and-hedge, and multi-timeframe position management. Contact support@gtcfx.com to confirm which mode is available on your account type." },
      { q: "Which devices is MT5 available on?", a: "MT5 is available as a desktop application (Windows), a web-based version accessible from any browser without downloads, and mobile apps for iOS and Android, with real-time sync across devices." },
      { q: "Should I choose MT5 over MT4?", a: "It depends on your trading style. If you rely on a specific MT4-only EA or prefer MT4's lighter, simpler interface, MT4 may suit you better. If you want a broader range of tradable instruments, faster backtesting, or more advanced order types, MT5 is generally the stronger choice. Many traders use both simultaneously depending on the strategy" },
    ],
  },
  cta: {
    eyebrow: "Ready when you are",
    heading: "Download MT5.\nBegin your trading journey.",
    sub: "The next-generation multi-asset platform. The execution infrastructure built for serious traders. One free download stands between you and the markets.",
    primaryLabel: "Download MT5 — Free",
    secondaryLabel: "Open Live Account →",
    footnote: "Demo also available · no card required",
    downloadLink: "https://download.terminal.free/cdn/web/gtc.global.trade/mt5/gtcglobaltrade5setup.exe",
  },
};

// ─── MetaTrader Mobile App Heroes ────────────────────────────────────────────
export const MT_APP_IOS = {
  i18nKey: "mtAppIosPage",
  platform: "ios",
  title: "MetaTrader for iPhone/iPad",
  tagline: "The Trader's Choice worldwide.",
  description:
    "Stay connected to global markets anytime, anywhere with GTCFX MetaTrader on your iPhone or iPad. Enjoy seamless access to your trading account, real-time market updates, advanced charting tools, and a smooth mobile trading experience designed to help you manage your trades with confidence.",
  primaryCta: "Download MT4 iPhone/iPad",
  secondaryCta: "Download MT5 iPhone/iPad",
  primaryHref: DOWNLOAD_LINKS.ios,
  secondaryHref: DOWNLOAD_LINKS_MT5.ios,
  backgroundImage: "/new-design/Trading/ipad.png",
};

export const MT_APP_ANDROID = {
  i18nKey: "mtAppAndroidPage",
  platform: "android",
  title: "MetaTrader for Android",
  tagline: "The Trader's Choice worldwide.",
  description:
    "Stay connected to global markets anytime, anywhere with GTCFX MetaTrader on Android. Enjoy seamless access to your trading account, real-time market updates, advanced charting tools, and a smooth mobile trading experience designed to help you manage your trades with confidence.",
  primaryCta: "Download MT4 Android",
  secondaryCta: "Download MT5 Android",
  primaryHref: DOWNLOAD_LINKS.android,
  secondaryHref: DOWNLOAD_LINKS_MT5.android,
  backgroundImage: "/new-design/Trading/andriod.png",
};
