export const LOGIN_HREF = "https://mygtcfx.com/";
export const REGISTER_HREF =
  "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww";
export const LIVE_CHAT_HREF = "https://mygtcfx.com/";

export const SUPPORT_IMAGE =
  "/new-design/live-account-application/need-help-illustration.png";

export const SIDEBAR_ACCOUNTS = [
  {
    key: "standard",
    accountSlug: "standard-account",
    labelKey: "sidebar.accounts.standard",
    href: "/live-account-application",
    defaultLabel: "Standard Account",
  },
  {
    key: "ecn",
    labelKey: "sidebar.accounts.ecn",
    href: REGISTER_HREF,
    external: true,
    defaultLabel: "ECN Account",
  },
  {
    key: "demoMt4",
    accountSlug: "demo-account",
    labelKey: "sidebar.accounts.demoMt4",
    href: "/live-account-application?account=demo-account",
    defaultLabel: "Demo MT4 Account",
  },
  {
    key: "liveMt4",
    labelKey: "sidebar.accounts.liveMt4",
    href: REGISTER_HREF,
    external: true,
    defaultLabel: "Live MT4 Account",
  },
  {
    key: "rawSpreadMt5",
    labelKey: "sidebar.accounts.rawSpreadMt5",
    href: REGISTER_HREF,
    external: true,
    defaultLabel: "RAW Spread MT5 Account",
  },
  {
    key: "mt5",
    accountSlug: "mt5-account",
    labelKey: "sidebar.accounts.mt5",
    href: "/live-account-application?account=mt5-account",
    defaultLabel: "MT5 Account",
  },
  {
    key: "partnership",
    accountSlug: "partnership-account",
    labelKey: "sidebar.accounts.partnership",
    href: "/live-account-application?account=partnership-account",
    defaultLabel: "Partnership accounts (Affiliates)",
  },
  {
    key: "pamm",
    accountSlug: "pamm-account",
    labelKey: "sidebar.accounts.pamm",
    href: "/live-account-application?account=pamm-account",
    defaultLabel: "PAMM Account",
  },
  {
    key: "mam",
    accountSlug: "mam-account",
    labelKey: "sidebar.accounts.mam",
    href: "/live-account-application?account=mam-account",
    defaultLabel: "MAM Account",
  },
];

export const ACCOUNT_TYPE_OPTIONS = [
  { value: "individual", labelKey: "form.options.accountType.individual" },
  { value: "corporate", labelKey: "form.options.accountType.corporate" },
];

export const DOCUMENT_TYPE_OPTIONS = [
  { value: "identity_card", labelKey: "form.options.documentType.identityCard" },
  { value: "passport", labelKey: "form.options.documentType.passport" },
  { value: "driving_license", labelKey: "form.options.documentType.drivingLicense" },
];

export const CONTACT_ITEMS = [
  {
    key: "phone",
    label: "Phone",
    icon: "phone",
    value: "+971 800 667788",
    href: "tel:+971800667788",
  },
  {
    key: "website",
    label: "Website",
    icon: "globe",
    value: "www.gtcfx.com",
    href: "https://www.gtcfx.com",
  },
  {
    key: "email",
    label: "Email",
    icon: "email",
    value: "support@gtcfx.com",
    href: "mailto:support@gtcfx.com",
  },
];

export const TRUST_BADGES = [
  { key: "fca", labelKey: "contactBar.badges.fca", defaultLabel: "FCA Regulated" },
  { key: "asic", labelKey: "contactBar.badges.asic", defaultLabel: "ASIC Licensed" },
  { key: "vfsc", labelKey: "contactBar.badges.vfsc", defaultLabel: "VFSC Member" },
];
