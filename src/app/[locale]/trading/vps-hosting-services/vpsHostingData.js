export const REGISTER_HREF = "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww";

export const HERO_METRICS = [
  { key: "ping", value: "< 1ms", label: "GTCFX ping", tone: "blue" },
  { key: "uptime", value: "99.97%", label: "Uptime (30d)", tone: "dark" },
  { key: "bandwidth", value: "1 Gbps", label: "Dedicated BW", tone: "blue" },
  { key: "node", value: "LIVE", label: "Node status", tone: "green" },
];

export const STATS_BAR = [
  { key: "uptime", value: "99.99%", title: "Uptime Guarantee" },
  { key: "latency", value: "<1ms", title: "Server Latency" },
  { key: "support", value: "24/7", title: "Always Running" },
  { key: "free", value: "Free", title: "For Qualified Traders" },
];

export const PRICING_FEATURE_KEYS = ["cpu", "ram", "ssd", "os", "software"];

export const PRICING_PLANS = [
  {
    key: "bronze",
    tierLabel: "BRONZE",
    name: "Bronze",
    price: "40.00",
    freeBalance: 5000,
    highlight: false,
    specs: {
      cpu: { value: "1", label: "vCPU", desc: "Processing power" },
      ram: { value: "2,560MB", label: "RAM", desc: "Memory" },
      ssd: { value: "30", label: "GB SSD", desc: "Storage" },
      os: { value: "Windows Server", label: "", desc: "Operating system" },
      software: { value: "MT4/MT5", label: "", desc: "Pre-installed" },
    },
  },
  {
    key: "silver",
    tierLabel: "SILVER",
    name: "Silver",
    price: "70.00",
    freeBalance: 7500,
    highlight: true,
    badge: "Most Popular",
    specs: {
      cpu: { value: "1", label: "vCPU", desc: "Processing power" },
      ram: { value: "4,096MB", label: "RAM", desc: "Memory" },
      ssd: { value: "50", label: "GB SSD", desc: "Storage" },
      os: { value: "Windows Server", label: "", desc: "Operating system" },
      software: { value: "MT4/MT5", label: "", desc: "Pre-installed" },
    },
  },
  {
    key: "gold",
    tierLabel: "GOLD",
    name: "Gold",
    price: "120.00",
    freeBalance: 10000,
    highlight: false,
    specs: {
      cpu: { value: "4", label: "vCPU", desc: "Processing power" },
      ram: { value: "6,656MB", label: "RAM", desc: "Memory" },
      ssd: { value: "75", label: "GB SSD", desc: "Storage" },
      os: { value: "Windows Server", label: "", desc: "Operating system" },
      software: { value: "MT4/MT5", label: "", desc: "Pre-installed" },
    },
  },
];

export const WITHOUT_VPS_ITEMS = [
  {
    key: "computer",
    text: "EA depends entirely on your computer staying on and connected",
  },
  {
    key: "power",
    text: "Internet cut or PC shutdown = EA stops immediately",
  },
  {
    key: "latency",
    text: "Latency affected by your local network provider",
  },
  {
    key: "crash",
    text: "System crash or power outage causes missed trades and lost opportunities",
  },
];

export const WITH_VPS_ITEMS = [
  {
    key: "server",
    text: "EA runs on professional server hardware - 24/7 without interruption",
  },
  {
    key: "shield",
    text: "Internet loss or PC shutdown — EA keeps running perfectly",
  },
  {
    key: "colocated",
    text: "Server co-located with exchange, ultra-low latency",
  },
  {
    key: "stability",
    text: "Enterprise-grade stability - never miss a signal",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Can I set up an MT4 | MT5 VPS on my Mac?",
    answer:
      "Absolutely! You can easily get your MT4 | MT5 VPS up and running on your Mac. The signup and download process is just as straightforward as it is on a Windows PC.",
  },
  {
    question: "How does a Forex VPS actually work?",
    answer:
      "A Forex VPS provides a dedicated and stable environment for traders to host their trading platforms and algorithms with 24/7 operation and low-latency connectivity.",
  },
  {
    question: "Who qualifies for free VPS hosting?",
    answer:
      "Eligible traders who maintain the minimum account balance for their selected plan tier receive VPS hosting at no additional cost. Contact our team to verify eligibility.",
  },
  {
    question: "Which trading platforms are supported?",
    answer:
      "Our VPS supports MetaTrader 4 and MetaTrader 5, with full access to charts, indicators, EAs, and all essential trading features.",
  },
];
