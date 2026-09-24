export const FINANCIAL_COMMISSION_HREF = "https://financialcommission.org/gtcfx/";
export const COMPENSATION_FUND_PDF_HREF =
  "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/pdf-files/GTC+Global+Trade+Capital+Co.+Ltd.pdf";
export const HELP_CENTER_HREF = "/company/faqs";
export const CLIENT_AGREEMENT_HREF = "/company/regulations";
export const REGISTER_HREF = "/live-account-application";

export const TRADER_BENEFITS = [
  {
    key: "resolution",
    text: "Fast, fair, and transparent dispute resolution",
  },
  {
    key: "funding",
    text: "Additional funding is provided by the Compensation Fund.",
  },
  {
    key: "edr",
    text: "A fully independent third-party external dispute resolution (EDR) institution.",
  },
];

export const RESOLVE_ITEMS = TRADER_BENEFITS;

export const PROCESS_STEPS = [
  {
    key: "monthly-fee",
    number: "1",
    rotation: -8,
    title: "Member monthly fee",
    description:
      "Monthly membership dues are collected from participating broker members.",
    titleKey: "steps.monthly-fee.title",
    descriptionKey: "steps.monthly-fee.description",
  },
  {
    key: "allocation",
    number: "2",
    rotation: 8,
    title: "Special allocation",
    description:
      "10% of monthly membership dues are allocated to the Compensation Fund.",
    titleKey: "steps.allocation.title",
    descriptionKey: "steps.allocation.description",
  },
  {
    key: "storage",
    number: "3",
    rotation: -6,
    title: "Independent account storage",
    description:
      "Funds are held in a separate bank account, independent from member operations.",
    titleKey: "steps.storage.title",
    descriptionKey: "steps.storage.description",
  },
  {
    key: "commission",
    number: "4",
    rotation: 6,
    title: "By the Financial Commission",
    description:
      "Used only when a member refuses to adhere to a Financial Commission judgment.",
    titleKey: "steps.commission.title",
    descriptionKey: "steps.commission.description",
  },
];

export const COVERAGE_STATS = [
  {
    key: "allocations",
    badge: "ALLOCATIONS",
    value: "10%",
    description:
      "10% of monthly membership dues are set aside for the Compensation Fund.",
    badgeKey: "stats.allocations.badge",
    valueKey: "stats.allocations.value",
    descriptionKey: "stats.allocations.description",
    tone: "blue",
  },
  {
    key: "limit",
    badge: "LIMIT PER CASE",
    value: "€20,000",
    description:
      "Maximum compensation limit per verified client claim, as issued by the Financial Commission.",
    badgeKey: "stats.limit.badge",
    valueKey: "stats.limit.value",
    descriptionKey: "stats.limit.description",
    tone: "gold",
  },
];

export const COVERAGE_INCLUDED = [
  "The official ruling issued by the Financial Commission",
  "Financial compensation when a member refuses to comply with a ruling",
  "The maximum compensation amount is €20,000 per client.",
];

export const COVERAGE_EXCLUDED = [
  "Losses arising from traders' independent trading",
  "Financial problems for all clients due to brokerage firm bankruptcy",
  "Disputes not adjudicated by the Financial Commission",
];
