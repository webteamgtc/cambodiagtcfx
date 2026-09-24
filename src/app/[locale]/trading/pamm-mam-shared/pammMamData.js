export const REGISTER_HREF = "/trading/open-live-account";
export const CLIENT_PORTAL_HREF = "https://client.gtcfx.com";

// ─── PAMM Data ────────────────────────────────────────────────────────────────
export const PAMM = {
  slug: "pamm-account",
  type: "PAMM",
  fullName: "PAMM Account",
  i18nKey: "pammAccountPage",

  hero: {
    badge: "GTCFX PAMM — Institutional Grade",
    heading: "Turn Your Trading Edge Into a Business",
    sub: "GTCFX PAMM — institutional-grade asset management infrastructure built for professional traders who want to manage global investor capital at scale.",
    primaryCta: "Open Live Account",
    primaryHref: REGISTER_HREF,
    secondaryCta: "Join as Investor",
    secondaryHref: REGISTER_HREF,
    dashboard: {
      title: "Manager Dashboard",
      rows: [
        { label: "AUM", value: "$4,280,000", color: "blue" },
        { label: "Monthly Return", value: "+12.4%", color: "green" },
        { label: "Active Investors", value: "238", color: "default" },
        { label: "Performance Fee Earned", value: "$52,640", color: "blue" },
        { label: "Platform", value: "MT4 / MT5", color: "default" },
      ],
    },
  },

  stats: [
    { icon: "infinite", value: "∞", label: "Managed Accounts — No Limit" },
    { icon: "percent", value: "50%", label: "Max Performance Fee" },
    { icon: "platform", value: "MT4 / MT5", label: "Native Platform Support" },
    { icon: "managers", value: "500+", label: "Active Fund Managers Globally" },
  ],

  explainer: {
    eyebrow: "Understanding PAMM",
    heading: "What is PAMM?",
    sub: "Percentage Allocation Management Module — a technology that allows multiple investors to pool capital under one expert trader.",
    steps: [
      {
        num: "01",
        icon: "investor",
        title: "Investors Deposit",
        desc: "Multiple investors fund the PAMM pool, each with their own allocation",
      },
      {
        num: "02",
        icon: "trade",
        title: "Manager Trades Centrally",
        desc: "One expert handles strategy, execution, and risk management",
      },
      {
        num: "03",
        icon: "distribute",
        title: "Proportional Distribution",
        desc: "All P&L automatically allocated by each investor's share percentage",
      },
    ],
    callout: "PAMM (Percentage Allocation Management Module) allows multiple investors to pool capital into a single managed account. A professional money manager executes all trades from the master account, and all profits and losses are automatically distributed to each investor in proportion to their contribution — with full transparency and regulatory oversight.",
  },

  leaderboard: {
    eyebrow: "Top Fund Managers",
    heading: "Verified Performance Leaderboard",
    sub: "All data independently verified. Filter by return, drawdown, or AUM to find your match.",
    filters: ["All", "Highest Return", "Lowest Drawdown", "Largest AUM"],
    managers: [
      { initials: "APX", name: "Alpha Pro X", strategy: "Swing · Multi-pair", color: "#6C63FF", return: "+38.4%", drawdown: "-6.1%", aum: "$1.2M", investors: 847, fee: "20%", min: "$500", featured: true },
      { initials: "SGF", name: "SafeGrowth FX", strategy: "Conservative · Low risk", color: "#22B573", return: "+19.8%", drawdown: "-2.9%", aum: "$3.4M", investors: 1203, fee: "15%", min: "$200", featured: false },
      { initials: "SGF", name: "SafeGrowth FX", strategy: "Conservative · Low risk", color: "#22B573", return: "+52.1%", drawdown: "-14.3%", aum: "$680M", investors: 392, fee: "25%", min: "$1,000", featured: false },
      { initials: "NVA", name: "Nova Capital", strategy: "Scalping · Intraday", color: "#F59E0B", return: "+29.5%", drawdown: "-8.7%", aum: "$920M", investors: 561, fee: "20%", min: "$300", featured: false },
      { initials: "ZNT", name: "Zenit Traders", strategy: "Trend-following · Daily", color: "#3B82F6", return: "+44.2%", drawdown: "-11.0%", aum: "$2.1M", investors: 978, fee: "22%", min: "$500", featured: false },
      { initials: "FXM", name: "FX Maestro", strategy: "Balanced · Medium risk", color: "#EF4444", return: "+33.7%", drawdown: "-9.2%", aum: "$1.7M", investors: 714, fee: "18%", min: "$250", featured: false },
    ],
  },

  steps: {
    eyebrow: "Get Started",
    heading: "Three Steps to Passive Income",
    sub: "From opening an account to earning returns — it takes less than 10 minutes to set up.",
    items: [
      { num: 1, title: "Open & Fund Account", desc: "Register your GTCFX account and make a deposit. Min. $200 to start." },
      { num: 2, title: "Browse Managers", desc: "Filter by return, risk level, and strategy. Review verified historical data." },
      { num: 3, title: "Set Allocation & Limits", desc: "Choose how much to allocate and set your maximum acceptable drawdown." },
      { num: 4, title: "Earn Automatically", desc: "Profits are credited to your account each settlement cycle. Monitor in real time." },
    ],
  },
  link:"https://gtcpamm.com/app/",

  faq: {
    eyebrow: "F A Q",
    heading: "Common questions",
    sub: "Everything you need to know about GTCFX PAMM before getting started.",
    items: [
      {
        q: "How long does the fund manager application review take?",
        a: " Applications are typically reviewed within 3–5 business days after all required documents and KYC verification are submitted. You'll receive an email notification at each stage of the process.",
      },
      {
        q: "How are performance fees settled, and what is the cycle?",
        a: "Performance fees are calculated as a percentage of profitable returns generated for investors, with individual fund managers setting their own rate up to a maximum of 50%. Fees are settled automatically at the end of each settlement cycle, and are only charged on profits — not on the total AUM.",
      },
      {
        q: "Which trading platforms does GTCFX PAMM support?",
        a: "Investors may request withdrawal during the designated exit windows (typically weekly). Exits are processed proportionally and do not force the manager to close open positions — allocation adjusts automatically.",
      },
      {
        q: "Which trading platforms does GTCFX PAMM support?",
        a: "GTCFX PAMM is natively integrated with both MetaTrader 4 (MT4) and MetaTrader 5 (MT5). You can run strategies on either platform using your PAMM master credentials.",
      },
      {
        "q": "Who provides the GTCFX PAMM service?",
        "a": "The GTCFX PAMM service is provided by GTC Global Trading Ltd, a company incorporated in Anjouan, Union of the Comoros (Company No. 16283). GTC Global Trading Ltd is the contracting entity for eligible PAMM clients, subject to the applicable Client Agreement, PAMM Agreement, eligibility requirements and jurisdictional restrictions. GTC Global Trading Ltd holds Licence No. L16283/GTC issued by the Anjouan Offshore Finance Authority. The licence does not constitute an endorsement of any PAMM Manager, trading strategy or past performance."
      }
    ],
  },
};

// ─── MAM Data ─────────────────────────────────────────────────────────────────
export const MAM = {
  ...PAMM,
  slug: "mam-account",
  type: "MAM",
  fullName: "MAM Account",
  i18nKey: "mamAccountPage",

  hero: {
    ...PAMM.hero,
    badge: "GTCFX MAM — Multi-Account Manager",
    heading: "Manage Multiple Accounts. One Master Trade.",
    sub: "GTCFX MAM — the professional infrastructure for fund managers who need precise lot-based control over individual sub-accounts at institutional scale.",
    primaryCta: "Open Live Account",
    secondaryCta: "Join as Investor",
    dashboard: {
      title: "MAM Dashboard",
      rows: [
        { label: "Sub-Accounts", value: "142", color: "blue" },
        { label: "Total AUM", value: "$8,650,000", color: "default" },
        { label: "Monthly Return", value: "+9.7%", color: "green" },
        { label: "Allocation Method", value: "Lot-based", color: "blue" },
        { label: "Platform", value: "MT4 / MT5", color: "default" },
      ],
    },
  },

  stats: [
    { icon: "infinite", value: "142+", label: "Sub-Accounts per Manager" },
    { icon: "percent", value: "Lot", label: "Precise Lot-Based Allocation" },
    { icon: "platform", value: "MT4 / MT5", label: "Native Platform Support" },
    { icon: "managers", value: "300+", label: "Active MAM Managers Globally" },
  ],

  explainer: {
    eyebrow: "Understanding MAM",
    heading: "What is MAM?",
    sub: "Multi-Account Manager — a technology that lets one professional trader execute a single trade replicated across hundreds of individual client accounts.",
    steps: [
      {
        num: "01",
        icon: "investor",
        title: "Manager Opens Master",
        desc: "Fund manager links sub-accounts under a single master trading account",
      },
      {
        num: "02",
        icon: "trade",
        title: "Single Trade Execution",
        desc: "One order placed on the master is instantly replicated to all sub-accounts",
      },
      {
        num: "03",
        icon: "distribute",
        title: "Lot-Based Allocation",
        desc: "Each sub-account receives proportional lots based on equity or fixed ratio",
      },
    ],
    callout: "MAM (Multi-Account Manager) gives professional traders granular control over each sub-account. Unlike PAMM, MAM uses lot-based allocation — each investor's account receives a proportional share of every trade based on their equity. Sub-accounts are visible individually, giving full transparency to both manager and investor.",
  },
  link:"https://gtcmam.com/",

  faq: {
    ...PAMM.faq,
    sub: "Everything you need to know about GTCFX MAM before getting started.",
    items: [
      {
        q: "How long does the fund manager application review take?",
        a: " Applications are typically reviewed within 3–5 business days after all required documents and KYC verification are submitted. You'll receive an email notification at each stage of the process.",
      },
      {
        q: " How does MAM differ from PAMM?",
        a: "In PAMM, all investor capital is pooled into a single master account. In MAM, each investor maintains their own individual sub-account. Both structures replicate the fund manager's trades proportionally. MAM gives investors greater individual transparency and control, while PAMM is simpler to administer at scale. Both run natively on MT4/MT5 at GTCFX.",
      },
      {
        q: "Can investors exit at any time?",
        a: "Yes. Sub-account holders can request withdrawal during designated windows. The manager's open positions are not affected — the sub-account is simply re-sized or removed at the next available settlement point.",
      },
      {
        q: "Which trading platforms does GTCFX MAM support?",
        a: "GTCFX MAM is natively integrated with both MetaTrader 4 (MT4) and MetaTrader 5 (MT5). Managers can operate from either platform using their MAM master credentials.",
      },
      {
        "q": "Who provides the GTCFX PAMM service?",
        "a": "The GTCFX PAMM service is provided by GTC Global Trading Ltd, a company incorporated in Anjouan, Union of the Comoros (Company No. 16283). GTC Global Trading Ltd is the contracting entity for eligible PAMM clients, subject to the applicable Client Agreement, PAMM Agreement, eligibility requirements and jurisdictional restrictions. GTC Global Trading Ltd holds Licence No. L16283/GTC issued by the Anjouan Offshore Finance Authority. The licence does not constitute an endorsement of any PAMM Manager, trading strategy or past performance."
      }
    ],
  },
};
