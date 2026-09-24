/**
 * JSON-LD structured data for the pages listed in the Schema Deployment
 * Instructions (GTCFX-结构化数据优化X10 - 20260811合并版). Each export is a
 * ready-to-serialize schema.org object — pass it straight into
 * <JsonLd data={...} />.
 *
 * The organization @id (`ORG_ID`) intentionally has no trailing slash before
 * the fragment (`.../en-intl#organization`, not `.../en-intl/#organization`).
 * That's the form every non-home page's `provider`/`brand`/`publisher`
 * reference uses in the source spec, so it's kept consistent here even
 * though the full Organization node is only ever defined once (on the
 * homepage). A mismatched @id here would silently break the reference.
 */

const BASE = "https://www.gtcfx.com/en-intl";
const LOGO =
  "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp";

const ORG_ID = `${BASE}#organization`;

const SAME_AS = [
  "https://www.facebook.com/GTCFXGlobalTradeCapital",
  "https://linkedin.com/company/gtcfx-official",
  "https://www.youtube.com/channel/UCnKWakjm1b9Bm63xgwNFXHA",
  "https://www.instagram.com/gtcfxofficial/",
  "https://t.me/gtc_vip_signal",
  "https://www.tiktok.com/@gtcgroup_official",
  "https://x.com/GTC_fx",
];

// Full Organization node — only embedded on the homepage (inside WebSite's
// `publisher`). Every other page just points at it via `{ "@id": ORG_ID }`.
const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "GTCFX",
  url: BASE,
  logo: LOGO,
  sameAs: SAME_AS,
};

function breadcrumb(items, id) {
  return {
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}

// Home > <Section> > <Leaf> — the shape every non-home page uses. `section`
// doubles as the label and the path segment (Trading → /trading).
function sectionBreadcrumb(section, leafName, url) {
  return breadcrumb(
    [
      ["Home", BASE],
      [section, `${BASE}/${section.toLowerCase()}`],
      [leafName, url],
    ],
    `${url}#breadcrumb`
  );
}

// `questions` is a list of [question, answer] pairs.
function faqPage(id, questions) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: questions.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: {
        "@type": "Answer",
        text,
      },
    })),
  };
}

// `steps` is a list of [step name, step text] pairs; `position` is derived.
function howTo({ id, name, description, steps }) {
  return {
    "@type": "HowTo",
    "@id": id,
    name,
    description,
    step: steps.map(([stepName, text], i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: stepName,
      text,
    })),
  };
}

function service({
  id,
  name,
  alternateName,
  url,
  serviceType,
  description,
  category,
  offers,
}) {
  return {
    "@type": "Service",
    "@id": id,
    name,
    ...(alternateName ? { alternateName } : {}),
    url,
    serviceType,
    description,
    category,
    brand: { "@id": ORG_ID },
    ...(offers ? { offers } : {}),
  };
}

function dataset({ id, name, url, description, keywords, about }) {
  return {
    "@type": "Dataset",
    "@id": id,
    name,
    url,
    description,
    keywords,
    ...(about ? { about } : {}),
    creator: { "@id": ORG_ID },
  };
}

// ---------- Market pages (Forex / Energy / Indices / Metals / Shares /
// Crypto / Futures): BreadcrumbList + FinancialProduct ----------
function marketPage({
  path,
  slug,
  breadcrumbName,
  name,
  alternateName,
  serviceType,
  description,
  category,
}) {
  const url = `${BASE}/${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Markets", breadcrumbName, url),
      {
        "@type": "FinancialProduct",
        "@id": `${url}#${slug}-cfd-product`,
        name,
        ...(alternateName ? { alternateName } : {}),
        url,
        serviceType,
        description,
        category,
        provider: { "@id": ORG_ID },
      },
    ],
  };
}

// ---------- Home ----------
export const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Online CFD Trading with Low Spread | GTCFX",
      description:
        "Access 7+ trading markets with GTCFX, a leading CFD broker offering forex, indices, energy, metals, shares, and more. Access tight spreads & trade CFDs today.",
      publisher: ORGANIZATION,
    },
    {
      "@type": "FinancialService",
      "@id": `${BASE}/#financial-service`,
      name: "GTC Global SA (Pty) Ltd",
      legalName: "GTC Global SA (Pty) Ltd",
      url: `${BASE}/company/regulations`,
      brand: { "@id": ORG_ID },
      description:
        "GTC Global SA (Pty) Ltd is an authorised financial services provider (FSP No. 51545) licensed and regulated by the Financial Sector Conduct Authority (FSCA) in South Africa.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 Cavendish Road, Claremont",
        addressLocality: "Cape Town",
        addressRegion: "Western Cape",
        postalCode: "7708",
        addressCountry: "ZA",
      },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "CIPC Company Number",
          value: "2020/810937/07",
        },
        {
          "@type": "PropertyValue",
          propertyID: "FSCA FSP Number",
          value: "51545",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is CFD trading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CFD trading allows you to trade on the price movement of selected financial instruments without owning the underlying asset.",
          },
        },
        {
          "@type": "Question",
          name: "Which markets can I trade with GTCFX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depending on your account type and region, you may access Forex, Metals, Energy, Indices, Commodities, Shares, Crypto CFDs and Futures CFDs.",
          },
        },
        {
          "@type": "Question",
          name: "What is leverage in trading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Leverage allows you to control a larger trading position with a smaller amount of capital. It can increase both potential gains and potential losses.",
          },
        },
        {
          "@type": "Question",
          name: "How do spreads and commissions work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The spread is the difference between the bid and ask price. Some account types may also apply a commission per trade or per lot.",
          },
        },
        {
          "@type": "Question",
          name: "What is margin and how is it calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Margin is the amount required to open and maintain a trading position. It depends on the instrument, position size, leverage and market conditions.",
          },
        },
      ],
    },
  ],
};

// ---------- Market pages ----------
export const FOREX_SCHEMA = marketPage({
  path: "markets/forex",
  slug: "forex",
  breadcrumbName: "Forex CFDs",
  name: "GTCFX Forex CFD Trading",
  alternateName: ["Forex CFD Trading", "FX CFD Trading"],
  serviceType: "Online Forex CFD Trading",
  description:
    "Access more than 70 major, minor and exotic currency pairs through Forex CFDs with GTCFX.",
  category: [
    "Forex CFDs",
    "Major Currency Pairs",
    "Minor Currency Pairs",
    "Exotic Currency Pairs",
  ],
});

export const ENERGY_SCHEMA = marketPage({
  path: "markets/energy",
  slug: "energy",
  breadcrumbName: "Energy CFDs",
  name: "GTCFX Energy CFD Trading",
  serviceType: "Online Energy CFD Trading",
  description:
    "Access energy CFD markets including crude oil and natural gas through GTCFX without owning or taking physical delivery of the underlying commodity.",
  category: ["Energy CFDs", "Crude Oil CFDs", "Natural Gas CFDs"],
});

export const INDICES_SCHEMA = marketPage({
  path: "markets/indices",
  slug: "indices",
  breadcrumbName: "Indices CFDs",
  name: "GTCFX Indices CFD Trading",
  alternateName: ["Index CFD Trading", "Indices CFD Trading"],
  serviceType: "Online Indices CFD Trading",
  description:
    "Access more than 20 global index CFDs covering US, European and Asian equity markets through GTCFX.",
  category: [
    "Indices CFDs",
    "Index CFDs",
    "Equity Index CFDs",
    "US Indices",
    "European Indices",
    "Asian Indices",
  ],
});

export const METALS_SCHEMA = marketPage({
  path: "markets/metals",
  slug: "metals",
  breadcrumbName: "Metals CFDs",
  name: "GTCFX Metals CFD Trading",
  serviceType: "Online Metals CFD Trading",
  description:
    "Access metals CFD markets including gold, silver, platinum and palladium through GTCFX without owning or taking physical delivery of the underlying metals.",
  category: [
    "Metals CFDs",
    "Gold CFDs",
    "Silver CFDs",
    "Platinum CFDs",
    "Palladium CFDs",
  ],
});

export const SHARES_SCHEMA = marketPage({
  path: "markets/shares",
  slug: "shares",
  breadcrumbName: "Shares/Equity CFDs",
  name: "GTCFX Shares CFD Trading",
  alternateName: [
    "Share CFD Trading",
    "Stock CFD Trading",
    "Equity CFD Trading",
  ],
  serviceType: "Online Shares and Equity CFD Trading",
  description:
    "Access more than 500 global share CFDs through GTCFX and take long or short positions on stock price movements without owning the underlying shares.",
  category: ["Share CFDs", "Stock CFDs", "Equity CFDs", "Global Stock CFDs"],
});

export const CRYPTO_CFDS_SCHEMA = marketPage({
  path: "markets/crypto-cfds",
  slug: "crypto",
  breadcrumbName: "Crypto CFDs",
  name: "GTCFX Crypto CFD Trading",
  serviceType: "Online Crypto CFD Trading",
  description:
    "Access cryptocurrency CFD markets including Bitcoin and other major cryptocurrencies through GTCFX without owning the underlying digital assets.",
  category: ["Crypto CFDs", "Cryptocurrency CFDs", "Bitcoin CFDs"],
});

export const FUTURE_CFDS_SCHEMA = marketPage({
  path: "markets/future-cfds",
  slug: "future",
  breadcrumbName: "Future CFDs",
  name: "GTCFX Future CFD Trading",
  serviceType: "Online Futures-based CFD Trading",
  description:
    "Access futures-based CFD markets including selected equity-index and precious-metal futures through GTCFX without physical ownership or delivery of the underlying asset.",
  category: [
    "Future CFDs",
    "Futures CFDs",
    "Index Futures CFDs",
    "Metal Futures CFDs",
  ],
});

export const COMMODITIES_SCHEMA = marketPage({
  path: "markets/commodities",
  slug: "commodities",
  breadcrumbName: "Commodities CFDs",
  name: "GTCFX Commodities CFD Trading",
  alternateName: ["Commodity CFD Trading", "Commodities CFD Trading"],
  serviceType: "Online Commodities CFD Trading",
  description:
    "Access more than 40 commodity CFDs across energy, metals and agricultural markets through GTCFX.",
  category: [
    "Commodities CFDs",
    "Energy CFDs",
    "Metals CFDs",
    "Agricultural CFDs",
    "Soft Commodity CFDs",
  ],
});

// ---------- Copy Trading ----------
export const COPY_TRADING_SCHEMA = (() => {
  const url = `${BASE}/trading/copy-trading`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb(
        [
          ["Home", BASE],
          ["Trading", `${BASE}/trading`],
          ["Copy Trading", url],
        ],
        `${url}#breadcrumb`
      ),
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: "How to Start Copy Trading with GTCFX",
        description: "Start copy trading with GTCFX in three simple steps.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Open a Live Account",
            text: "Create a GTCFX live account and complete the setup to access copy trading services.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Choose the Right Trader",
            text: "Review trader profiles, performance and trading style before selecting who to follow.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Start Copying Strategy",
            text: "Allocate capital, activate copying and track performance directly from your dashboard.",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "GTCFX Copy Trading Service",
        alternateName: "GTCFX Copy Trading",
        url,
        serviceType: "Online Copy Trading Service",
        description:
          "An online copy trading service that allows eligible clients to review trader profiles, select a strategy and automatically replicate selected trades while monitoring performance and managing capital allocations.",
        disambiguatingDescription:
          "Copy trading automates the replication of selected traders' transactions while clients maintain control over their own account and capital.",
        category: ["Copy Trading", "Automated Trading", "Strategy Copying"],
        brand: { "@id": ORG_ID },
      },
    ],
  };
})();

// ---------- GTC Go App ----------
export const GTC_GO_APP_SCHEMA = (() => {
  const url = `${BASE}/trading/gtc-go-app`;
  const downloadHref =
    "https://mygtc.onelink.me/pZtr?af_sub1=Az7aFg5e&deep_link_sub1=Az7aFg5e&ref=Az7aFg5e";
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb(
        [
          ["Home", BASE],
          ["Trading", `${BASE}/trading`],
          ["GTC Go", url],
        ],
        `${url}#breadcrumb`
      ),
      {
        "@type": "MobileApplication",
        "@id": `${url}#mobile-application`,
        name: "GTC Go",
        alternateName: ["GTC Go Trading App", "GTCFX Mobile Trading App"],
        url,
        description:
          "GTC Go is a mobile trading application for iOS and Android that provides access to 7+ trading markets, live quotes, charting, professional order types, account management and copy trading.",
        applicationCategory: "FinanceApplication",
        operatingSystem: ["iOS", "Android"],
        downloadUrl: downloadHref,
        featureList: [
          "Access to 7+ trading markets",
          "Live market quotes",
          "Professional order types",
          "Technical charts and indicators",
          "Custom price alerts",
          "Account management",
          "Deposits and withdrawals",
          "Copy trading",
        ],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
})();

// ---------- Account pages (Demo / Live / PAMM) ----------
export const FREE_DEMO_ACCOUNT_SCHEMA = (() => {
  const url = `${BASE}/trading/free-demo-account`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Trading", "Free Demo Account", url),
      service({
        id: `${url}#service`,
        name: "GTCFX Free Demo Trading Account",
        alternateName: "GTCFX Demo Account",
        url,
        serviceType: "Online CFD Demo Trading Account",
        description:
          "A free demo trading account that allows users to practice CFD trading with virtual funds in market conditions across supported GTCFX trading platforms.",
        category: [
          "CFD Demo Account",
          "Demo Trading Account",
          "Practice Trading Account",
        ],
      }),
      howTo({
        id: `${url}#howto`,
        name: "How to Start with a GTCFX Demo Account",
        description:
          "Set up a GTCFX demo trading environment and start testing trading strategies with virtual funds.",
        steps: [
          ["Register an Account", "Sign up to create your GTCFX demo account."],
          [
            "Select Platform and Parameters",
            "Choose your trading platform and configure your preferred demo account settings.",
          ],
          [
            "Download and Configure",
            "Set up your preferred trading platform on desktop or mobile.",
          ],
          [
            "Run Strategy Tests",
            "Use virtual capital to test strategies and monitor trading performance.",
          ],
        ],
      }),
      faqPage(`${url}#faq`, [
        [
          "Does the demo account have an expiry date?",
          "No. The GTCFX demo account does not expire and can be used for ongoing trading practice.",
        ],
        [
          "Are spreads on the demo identical to the live account?",
          "Demo spreads are designed to closely reflect live market conditions, although minor differences may occur because demo trades do not interact with real liquidity and live order flow.",
        ],
        [
          "How do I reset my demo balance?",
          "The virtual demo balance can be reset from the account dashboard when you want to begin a new testing cycle.",
        ],
        [
          "Which platforms are supported?",
          "The GTCFX demo account supports MetaTrader 4, MetaTrader 5 and GTC Trader across supported desktop, web and mobile environments.",
        ],
        [
          "Do I need to verify my identity to open a demo?",
          "No. A GTCFX demo account can be opened without identity verification, a deposit or supporting documents.",
        ],
      ]),
    ],
  };
})();

export const OPEN_LIVE_ACCOUNT_SCHEMA = (() => {
  const url = `${BASE}/trading/open-live-account`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Trading", "Open Live Account", url),
      service({
        id: `${url}#service`,
        name: "GTCFX Live Trading Account",
        alternateName: "GTCFX Live Account",
        url,
        serviceType: "Online Live Trading Account",
        description:
          "Open a GTCFX live trading account to access global CFD markets, multiple account types and supported trading platforms.",
        category: ["Live Trading Account", "CFD Trading Account"],
      }),
      howTo({
        id: `${url}#howto`,
        name: "How to Open a GTCFX Live Trading Account",
        description: "Open a GTCFX live trading account in three steps.",
        steps: [
          [
            "Basic Information",
            "Provide your name, email and phone number to create your secure trading profile.",
          ],
          [
            "Verify Identity (KYC)",
            "Upload your identification and proof of address for account verification.",
          ],
          [
            "Deposit and Trade",
            "Fund your account using an available payment method and start trading once the funds are available.",
          ],
        ],
      }),
    ],
  };
})();

export const PAMM_ACCOUNT_SCHEMA = (() => {
  const url = `${BASE}/trading/pamm-account`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Trading", "PAMM Account", url),
      service({
        id: `${url}#service`,
        name: "GTCFX PAMM Account Service",
        alternateName: "GTCFX PAMM",
        url,
        serviceType: "PAMM Account and Investment Management Service",
        description:
          "GTCFX PAMM allows multiple investors to allocate capital to a managed account where a professional money manager executes trades and profits and losses are distributed proportionally.",
        category: [
          "PAMM Account",
          "PAMM Investment",
          "Managed Trading Account",
        ],
      }),
      howTo({
        id: `${url}#howto`,
        name: "How to Start with a GTCFX PAMM Account",
        description:
          "Start using GTCFX PAMM by funding an account, selecting a manager and setting your allocation.",
        steps: [
          [
            "Open and Fund Account",
            "Register your GTCFX account and make a deposit.",
          ],
          [
            "Browse Managers",
            "Compare managers by return, risk level, strategy and historical performance.",
          ],
          [
            "Set Allocation and Limits",
            "Choose how much capital to allocate and set your acceptable drawdown limits.",
          ],
          [
            "Monitor Performance",
            "Monitor performance and the proportional allocation of profits and losses through your account.",
          ],
        ],
      }),
    ],
  };
})();

// ---------- Swap Update ----------
export const SWAP_UPDATE_SCHEMA = (() => {
  const url = `${BASE}/trading/swap-update`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Trading", "Swap Update", url),
      dataset({
        id: `${url}#swap-rates`,
        name: "GTCFX Daily CFD Swap Rates",
        url,
        description:
          "Daily overnight swap rates for CFD instruments across Forex, Metals, Crypto and Indices, including long and short swap values by trading symbol.",
        keywords: [
          "CFD Swap Rates",
          "Overnight CFD Swap Rates",
          "Forex CFD Swap Rates",
          "Metal CFD Swap Rates",
          "Crypto CFD Swap Rates",
          "Indices CFD Swap Rates",
        ],
      }),
    ],
  };
})();

// ---------- Dynamic Leverage ----------
export const DYNAMIC_LEVERAGE_SCHEMA = (() => {
  const url = `${BASE}/company/dynamic-leverage`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Company", "Dynamic Leverage", url),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Dynamic Leverage & Margin Conditions | GTCFX",
        description:
          "Learn how GTCFX dynamic leverage and margin requirements adjust according to trading position size, instrument and market conditions.",
        about: {
          "@type": "Thing",
          name: "Dynamic Leverage and Margin Conditions",
        },
        publisher: { "@id": ORG_ID },
      },
      faqPage(`${url}#faq`, [
        [
          "How does tiered leverage work?",
          "Tiered leverage reduces the leverage ratio as the size of the trade increases. Larger positions may therefore require more margin.",
        ],
        [
          "Can tiered leverage affect my trading strategy?",
          "Yes. For larger positions, increased margin requirements may limit the ability to open additional positions or require adjustments to existing positions.",
        ],
        [
          "Is tiered leverage the same for all assets?",
          "No. Tiered leverage can vary between asset classes, and leverage available for forex pairs may differ from commodities or indices.",
        ],
        [
          "What happens if I can't meet the margin requirements due to tiered leverage?",
          "Additional funds may be required to meet the applicable margin requirements when trading larger volumes.",
        ],
        [
          "Is tiered leverage applied automatically?",
          "Yes. Tiered leverage is applied automatically based on the size of the trading position.",
        ],
        [
          "How can I calculate the margin required with tiered leverage?",
          "The required margin can be estimated using the margin calculator available on the GTCFX Dynamic Leverage page.",
        ],
      ]),
    ],
  };
})();

// ---------- MetaTrader platforms: BreadcrumbList + SoftwareApplication +
// HowTo ----------
function platformPage({
  path,
  breadcrumbName,
  name,
  alternateName,
  description,
  featureList,
  howToName,
  howToDescription,
  steps,
}) {
  const url = `${BASE}/${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Trading", breadcrumbName, url),
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name,
        alternateName,
        url,
        applicationCategory: "FinanceApplication",
        operatingSystem: ["Windows", "macOS", "iOS", "Android"],
        description,
        featureList,
      },
      howTo({
        id: `${url}#howto`,
        name: howToName,
        description: howToDescription,
        steps,
      }),
    ],
  };
}

export const MT4_PLATFORM_SCHEMA = platformPage({
  path: "trading/mt4-platform",
  breadcrumbName: "MT4 Platform",
  name: "MetaTrader 4",
  alternateName: ["MT4", "MT4 Trading Platform"],
  description:
    "MetaTrader 4 is a multi-asset trading platform available through GTCFX, offering advanced charting, automated trading, multiple order types and access across desktop and mobile devices.",
  featureList: [
    "Advanced charting",
    "30+ built-in technical indicators",
    "Automated trading with Expert Advisors",
    "MQL4 support",
    "Multiple order types",
    "One-click trading",
    "Multi-device access",
  ],
  howToName: "How to Start Trading with GTCFX MT4",
  howToDescription:
    "Get started with MetaTrader 4 through GTCFX in three steps.",
  steps: [
    [
      "Open Account",
      "Register a GTCFX account, complete verification and fund your trading account.",
    ],
    [
      "Download MT4",
      "Download MetaTrader 4 for Windows, macOS, iOS or Android.",
    ],
    [
      "Login and Trade",
      "Log in using your GTCFX server credentials, configure your charts and indicators, and start trading.",
    ],
  ],
});

export const MT5_PLATFORM_SCHEMA = platformPage({
  path: "trading/mt5-platform",
  breadcrumbName: "MT5 Platform",
  name: "MetaTrader 5",
  alternateName: ["MT5", "MT5 Trading Platform"],
  description:
    "MetaTrader 5 is a multi-asset trading platform available through GTCFX, offering advanced charting, automated trading, multiple order types and access to global markets across desktop and mobile devices.",
  featureList: [
    "38+ built-in technical indicators",
    "21 timeframes",
    "Automated trading with MQL5",
    "Multi-asset strategy testing",
    "Six order types",
    "Depth of Market",
    "One-click trading",
    "Multi-device access",
  ],
  howToName: "How to Start Trading with GTCFX MT5",
  howToDescription:
    "Get started with MetaTrader 5 through GTCFX in three steps.",
  steps: [
    [
      "Open Account",
      "Register a GTCFX account, complete verification and fund your trading account.",
    ],
    [
      "Download MT5",
      "Choose MetaTrader 5 for Windows, macOS, iOS or Android and install the platform.",
    ],
    [
      "Login and Trade",
      "Log in with your GTCFX server credentials, configure your charts and indicators, and start trading.",
    ],
  ],
});

// ---------- VPS Hosting ----------
export const VPS_HOSTING_SCHEMA = (() => {
  const url = `${BASE}/trading/vps-hosting-services`;
  const plan = (tier, price, specs, minBalance) => ({
    "@type": "Offer",
    name: `${tier} Forex VPS Plan`,
    price: `${price}.00`,
    priceCurrency: "USD",
    description: `${tier} Forex VPS hosting at $${price} per month with ${specs}, Windows Server and pre-installed MT4/MT5. Free for eligible traders maintaining a minimum balance of $${minBalance}.`,
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Trading", "Forex VPS Hosting", url),
      service({
        id: `${url}#service`,
        name: "GTCFX Forex VPS Hosting",
        alternateName: [
          "Forex VPS Hosting",
          "MT4 VPS Hosting",
          "MT5 VPS Hosting",
        ],
        url,
        serviceType: "Forex VPS Hosting Service",
        description:
          "GTCFX Forex VPS Hosting provides traders with a dedicated remote server environment for running MT4, MT5 and Expert Advisors with low-latency connectivity and continuous operation.",
        category: ["Forex VPS Hosting", "Trading VPS", "MT4 VPS", "MT5 VPS"],
        offers: [
          plan("Bronze", 40, "1 vCPU, 2,560MB RAM, 30GB SSD", "5,000"),
          plan("Silver", 70, "1 vCPU, 4,096MB RAM, 50GB SSD", "7,500"),
          plan("Gold", 120, "4 vCPU, 6,656MB RAM, 75GB SSD", "10,000"),
        ],
      }),
      faqPage(`${url}#faq`, [
        [
          "Can I set up an MT4 or MT5 VPS on my Mac?",
          "Yes. GTCFX MT4 and MT5 VPS hosting can be set up and accessed from a Mac.",
        ],
        [
          "How does a Forex VPS actually work?",
          "A Forex VPS provides a dedicated and stable environment for traders to host their trading platforms and algorithms with continuous operation and low-latency connectivity.",
        ],
        [
          "Who qualifies for free VPS hosting?",
          "Eligible traders who maintain the minimum account balance for their selected plan tier receive VPS hosting at no additional cost.",
        ],
        [
          "Which trading platforms are supported?",
          "GTCFX Forex VPS Hosting supports MetaTrader 4 and MetaTrader 5, including charts, indicators, Expert Advisors and essential trading functions.",
        ],
      ]),
    ],
  };
})();

// ---------- Economic Calendar ----------
export const ECONOMIC_CALENDAR_SCHEMA = (() => {
  const url = `${BASE}/markets/economic-calendar`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      sectionBreadcrumb("Markets", "Economic Calendar", url),
      dataset({
        id: `${url}#economic-calendar`,
        name: "GTCFX Forex & CFD Economic Calendar",
        url,
        description:
          "A real-time economic calendar for Forex and CFD traders to track market-moving economic events, actual results, forecasts and prior data across major global markets.",
        keywords: [
          "Forex Economic Calendar",
          "CFD Economic Calendar",
          "Economic Events Calendar",
          "Forex Trading Calendar",
          "CFD Trading Calendar",
        ],
        about: [
          { "@type": "Thing", name: "Forex CFD Trading" },
          { "@type": "Thing", name: "CFD Trading" },
          { "@type": "Thing", name: "Global Economic Events" },
        ],
      }),
      faqPage(`${url}#faq`, [
        [
          "What is an Economic Calendar?",
          "An economic calendar is a schedule of upcoming economic events and data releases, such as interest rate decisions, GDP figures, employment reports and inflation data, that can move financial markets.",
        ],
        [
          "How do I use the Economic Calendar to trade?",
          "Filter economic events by date range, impact level and country, then compare forecast and prior values before important releases. Traders can use this information to prepare for potential market volatility while applying appropriate risk management.",
        ],
        [
          "What does the impact level (High / Medium / Low) mean?",
          "The impact level indicates how much an economic release has historically affected financial markets. High-impact events such as Non-Farm Payrolls, FOMC decisions and CPI can cause significant market movements.",
        ],
        [
          "What time zone does the calendar use?",
          "The economic calendar displays event times in the user's local time zone by default, with options to switch to UTC or another supported time zone.",
        ],
        [
          "Is the Economic Calendar data real-time?",
          "Yes. Actual release values are updated in real time as official data is published, while forecast and prior figures are updated regularly.",
        ],
      ]),
    ],
  };
})();