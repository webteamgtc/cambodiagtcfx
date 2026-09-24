export const REGISTER_HREF = "/live-account-application";

export const HERO_STATS = [
  { key: "leverage", value: "2", label: "Account Types" },
  { key: "spreads", value: "7+", label: "Trading Markets" },
  { key: "instruments", value: "0.0", label: "Min. Spread (Pips)" },
  { key: "support", value: "1:2000", label: "Max. Leverage" },
];

export const CTA_STATS = [
  { key: "years", value: "14+ years", label: "Serving traders" },
  { key: "accounts", value: "50K+", label: "Active accounts" },
  { key: "volume", value: "$2B+", label: "Monthly volume" },
  { key: "rating", value: "4.8 / 5", label: "Client rating" },
];

/** Order: Standard (recommended) · ECN */
export const ACCOUNT_TYPES = [
  {
    key: "standard",
    icon: "standard",
    featured: true,
    badge: "Recommended",
    featureCount: 16,
    swapFreeAvailable: true,
  },
  {
    key: "ecn",
    icon: "ecn",
    featured: false,
    featureCount: 19,
    swapFreeAvailable: false,
  },
  // {
  //   key: "pro",
  //   icon: "pro",
  //   featured: false,
  //   featureCount: 18,
  //   swapFreeAvailable: false,
  // },
];

export const COMPARISON_FOOTNOTES = ["asterisk", "doubleAsterisk", "tripleAsterisk"];

export const TIER_DETAILS = [
  {
    key: "ecn",
    accountLabel: "ACCOUNT 01 / ECN",
    tierNumber: "01",
    tierName: "ECN",
    bg: "bg-transparent",
    code: "ECN",
    headline: "Raw market access.",
    headlineHighlight: "Zero-pip spreads.",
    description:
      "For experienced and active traders — scalpers, algorithmic systems, EAs — where every fractional pip and millisecond counts.",
    highlights: [
      {
        icon: "depth",
        title: "True market depth pricing",
        description:
          "Direct liquidity from tier-1 providers, no dealing desk.",
      },
      {
        icon: "spread",
        title: "Spreads from 0.0 pips",
        description:
          "Trade at the rawest interbank pricing available.",
      },
      {
        icon: "manager",
        title: "Sub-30ms execution",
        description:
          "Built for high-frequency strategies that can't tolerate slippage.",
      },
    ],
    stats: [
      { value: "$3000", label: "Min deposit" },
      { value: "0.0pip", label: "From" },
    ],
    story:
      "My EA runs on ECN. The raw spread and fast fills made the upgrade worth it within the first week.",
    cardImage: "/new-design/Trading/ecn-new.png",
  },
  {
    key: "standard",
    accountLabel: "ACCOUNT 02 / STANDARD",
    tierNumber: "02",
    tierName: "STANDARD",
    bg: "bg-transparent",
    code: "STD",
    headline: "Start simple,",
    headlineHighlight: "scale steady.",
    description:
      "Built for everyday trading — no minimum deposit, zero commission, and the full GTCFX platform from day one.",
    highlights: [
      {
        icon: "wallet",
        title: "Low entry, $0 minimum",
        description:
          "Test the waters without overcommitting capital.",
      },
      {
        icon: "chart",
        title: "Commission-free trading",
        description:
          "Spread-only pricing — predictable and easy to understand.",
      },
      {
        icon: "platform",
        title: "Full platform access",
        description:
          "MT4, MT5, web and mobile — the same as our VIP traders.",
      },
    ],
    story:
      "I started with $200 on Standard. Three months in, I'd learned enough to move to ECN.",
    stats: [
      { value: "$0", label: "Min deposit" },
      { value: "0.0pip", label: "From" },
    ],
    recommended: false,
    cardImage: "/new-design/Trading/std-new.png",
  },
  // {
  //   key: "pro",
  //   accountLabel: "ACCOUNT 03 / PRO",
  //   tierNumber: "03",
  //   tierName: "PRO",
  //   bg: "bg-transparent",
  //   code: "Pro",
  //   headline: "Tighter conditions.",
  //   headlineHighlight: "Serious volume.",
  //   description:
  //     "For experienced traders who want lower spreads and transparent commission — a step up from Standard without full ECN requirements.",
  //   highlights: [
  //     {
  //       icon: "spread",
  //       title: "Spreads from 0.6 pips",
  //       description:
  //         "Tighter average spreads with a transparent $3 commission per standard lot.",
  //     },
  //     {
  //       icon: "commission",
  //       title: "Enhanced execution",
  //       description:
  //         "Priority routing and enhanced liquidity for active traders moving meaningful volume.",
  //     },
  //     {
  //       icon: "bolt",
  //       title: "Market analysis & tools",
  //       description:
  //         "Market analysis plus free advanced trading tools and signals to support your strategy.",
  //     },
  //   ],
  //   stats: [
  //     { value: "$100", label: "Min deposit" },
  //     { value: "1.0pip", label: "From" },
  //   ],
  //   story:
  //     "Pro gave me tighter spreads without the ECN minimum — the sweet spot for my daily trading volume.",
  //   cardImage: "/new-design/Trading/ecn-new.png",
  // },
];

export const PLATFORMS_TOOLS = [
  {
    key: "mt4",
    title: "MetaTrader 4",
    description: "The industry standard. Robust EAs and indicators.",
    footer: "All accounts",
    icon: "chart",
    href: "/trading/mt4-platform",
  },
  {
    key: "mt5",
    title: "MetaTrader 5",
    description: "Multi-asset. Faster execution. Modern timeframes.",
    footer: "All accounts",
    icon: "layout",
    href: "/trading/mt5-platform",
  },
  {
    key: "webtrader",
    title: "WebTrader",
    description: "No download required. Trade from any browser.",
    footer: "All accounts",
    icon: "globe",
    href: "/trading/gtc-go-app",
  },
  {
    key: "signals",
    title: "Signals & Analysis",
    description: "Daily market commentary, signals, & research desk.",
    footer: "ECN & Pro",
    icon: "signal",
    href: "/markets",
  },
  {
    key: "vps",
    title: "Free VPS Hosting",
    description: "Run EAs 24/7 with ultra-low latency to our servers.",
    footer: "ECN",
    icon: "vps",
    href: "/trading/vps-hosting-services",
  },
  {
    key: "api",
    title: "API Access",
    description: "Direct programmatic access for institutional flow.",
    footer: "All accounts",
    icon: "api",
    href: "/company/contact-us",
  },
  {
    key: "support",
    title: "24/7 Support",
    description: "Multilingual desk available whenever markets are open.",
    footer: "All accounts",
    icon: "support",
    href: "/company/contact-us",
  },
  {
    key: "manager",
    title: "Dedicated Manager",
    description: "A single point of contact who knows your trading.",
    footer: "ECN",
    icon: "manager",
    href: "/company/contact-us",
  },
];

export const ONBOARDING_STEPS = [
  {
    key: "conditions",
    step: "STEP 01",
    title: "Trading Conditions",
    description: "Spreads, swaps, leverage and margin requirements.",
    icon: "conditions",
  },
  {
    key: "management",
    step: "STEP 02",
    title: "Account Management",
    description: "Profile updates, password resets and settings.",
    icon: "management",
  },
  {
    key: "security",
    step: "STEP 03",
    title: "Account Security",
    description: "2FA, suspicious activity and protection tips.",
    icon: "security",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Can I open multiple account types simultaneously?",
    answer:
      " Yes. Many traders run a Standard account for everyday trading alongside an ECN account for short-term and algorithmic strategies. You can manage all of them under a single client portal.",
  },
 
  {
    question: "How do I apply for swap-free trading?",
    answer:
      "To activate swap-free status on your Standard account, contact our support team via Live Chat or email at support@gtcfx.com. Your eligibility will be reviewed and swap-free status activated once confirmed. Administrative fees may apply after the applicable grace period — see our Swap-Free Terms & Conditions for full details.",
  },
  {
    question: "What's included with the VIP account?",
    answer:
      " VIP is built for high-volume traders and institutional clients, with a $10,000 minimum deposit. It includes tighter commission pricing at $2 per lot, a dedicated account manager for execution support and reporting, priority support with withdrawals handled from a queue that goes ahead of standard accounts, and free VPS hosting for low-latency automated trading.",
  },
  {
    question: "Is there a demo account available for every tier?",
    answer:
      "Yes. You can try a risk-free demo before committing to any live account tier — demo access isn't limited to a specific account type, so you can explore the platform and trading conditions before choosing which live account fits your strategy.",
  },
];
