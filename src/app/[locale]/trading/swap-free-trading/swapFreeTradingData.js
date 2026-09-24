export const REGISTER_HREF =
  "/live-account-application";

export const HERO_STATS = [
  { value: "1:2000", label: "Leverage" },
  { value: "0.0", label: "Spreads" },
  { value: "0.0", label: "Commission" },
];

export const WHY_FEATURES = [
  {
    key: "no-swap",
    icon: "swap",
    title: "0% Swap Charges",
    description:
      "No overnight interest charges on eligible instruments — hold positions freely without accumulating swap costs.",
  },
  {
    key: "global-access",
    icon: "globe",
    title: "Global Region Access",
    description:
      "Available to eligible traders worldwide, subject to country and region regulatory requirements.",
  },
  {
    key: "transparent",
    icon: "shield",
    title: "Transparent Terms",
    description:
      "Clear, publicly available conditions. No hidden costs or unexpected charges on your positions.",
  },
  {
    key: "activation",
    icon: "speed",
    title: "Fast Activation",
    description:
      "Request activation via live chat or email and get confirmed by our team quickly.",
  },
  {
    key: "long-term",
    icon: "calendar",
    title: "Long-Term Holding",
    description:
      "Hold positions indefinitely without accumulating swap costs — ideal for strategic long-term trades.",
  },
];

export const HOW_STEPS = [
  {
    key: "no-fees",
    number: "1",
    rotation: -8,
    title: "No overnight fees",
    description:
      "Eligible instruments incur no swap fees when held overnight",
    titleKey: "steps.no-fees.title",
    descriptionKey: "steps.no-fees.description",
  },
  {
    key: "select-instrument",
    number: "2",
    rotation: 8,
    title: "Same Conditions",
    description:
      "All other trading conditions remain unchanged",
    titleKey: "steps.select-instrument.title",
    descriptionKey: "steps.select-instrument.description",
  },
  {
    key: "trade",
    number: "3",
    rotation: -6,
    title: "Periodic Review",
    description:
      "Trading behaviour may be periodically reviewed",
    titleKey: "steps.trade.title",
    descriptionKey: "steps.trade.description",
  },
  {
    key: "returns",
    number: "4",
    rotation: 6,
    title: "Compliance Check",
    description:
      "Accounts may be adjusted if activity is non-compliant",
    titleKey: "steps.returns.title",
    descriptionKey: "steps.returns.description",
  },
];

export const INSTRUMENT_TABS = [
  {
    key: "eligible",
    label: "Examples of Eligible Categories",
  },
  {
    key: "non-swap-free",
    label: "Non-Swap-Free Instruments",
  },
];

export const INSTRUMENT_CATEGORIES = {
  eligible: [
    {
      key: "major",
      title: "Major FX pairs",
      examples: "EURUSD · GBPUSD · USDJPY · AUDUSD",
    },
    {
      key: "metals",
      title: "Precious Metals",
      examples: "XAUUSD · XAGUSD",
    },
    {
      key: "minors",
      title: "Minors & Exotics",
      examples: "Selected pairs",
    },
    {
      key: "indices",
      title: "Indices & Energies",
      examples: "Selected instruments",
    }
  ],
  "non-swap-free": [
    {
      key: "exotics",
      title: "Selected Exotics",
      examples: "Certain emerging-market pairs",
    },
    {
      key: "commodities",
      title: "Commodities",
      examples: "Selected soft commodities",
    },
    {
      key: "shares",
      title: "Shares & CFDs",
      examples: "Selected single-stock CFDs",
    },
    {
      key: "crypto-alt",
      title: "Alt Cryptocurrencies",
      examples: "Selected altcoin pairs",
    },
    {
      key: "other",
      title: "Other Instruments",
      examples: "Subject to standard swap terms",
    },
  ],
};

export const TERMS_ITEMS = [
  {
    question: "Swap-free status is subject to eligibility review",
    answer:
      "GTCFX reserves the right to approve or decline swap-free status based on account review, country of residence, and trading behaviour. Approval is not guaranteed.",
  },
  {
    question: "Misuse may result in status removal",
    answer:
      "Accounts used in a manner inconsistent with swap-free terms — including arbitrage, swap exploitation, or abusive trading patterns — may have swap-free status revoked without prior notice.",
  },
  {
    question: "Not all instruments are covered",
    answer:
      "Swap-free applies only to selected instruments. Certain pairs, asset classes, and products remain subject to standard overnight swap charges as listed in your platform contract specifications.",
  },
  {
    question: "Terms may change",
    answer:
      "GTCFX may update swap-free terms, eligible instruments, or regional availability at any time. Clients will be notified of material changes through official channels.",
  },
  {
    question: "Standard trading conditions remain",
    answer:
      "Swap-free removes interest-based overnight swap charges on eligible instruments only. Spreads, commissions, leverage, margin requirements, and execution policies continue to apply as normal.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Does swap-free mean all overnight costs are removed?",
    answer:
      "Swap-free removes overnight swap/rollover charges on eligible instruments. Standard spreads and commissions are not affected and still apply to all trades.",
  },
  {
    question: "Can my swap-free status be removed?",
    answer:
      "Yes. If your trading activity is inconsistent with normal use or the swap-free terms, your account status may be reviewed and adjusted.",
  },
  {
    question: "Is swap-free available worldwide?",
    answer:
      "No. Swap-free availability depends on your country or region and applicable regulatory and compliance requirements.",
  },
  {
    question: "Are all instruments swap-free?",
    answer:
      "No. Only selected instruments qualify as swap-free. Certain instruments will always remain under standard swap conditions. Refer to your platform's contract specifications for the live list.",
  },
];
