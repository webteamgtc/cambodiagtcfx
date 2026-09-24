export const REGISTER_HREF =
  "/live-account-application";

export const CLIENT_PORTAL_HREF = "/live-account-application";

export const HERO_STATS = [
  { key: "depositFee", value: "$0", label: "Deposit Fees" },
  { key: "paymentMethods", value: "10+", label: "Payment Methods" },
  { key: "processingTime", value: "Instant", label: "Processing Time" },
];

export const QUICK_DEPOSIT_METHODS = [
  {
    key: "card",
    name: "Visa / Mastercard",
    subtitle: "Instant · Min $50",
    icon: "card",
  },
  {
    key: "crypto",
    name: "USDT Crypto",
    subtitle: "Instant · Min $50",
    icon: "crypto",
  },
  {
    key: "mobile",
    name: "Apple / Google Pay",
    subtitle: "Instant · Min $50",
    icon: "mobile",
  },
  {
    key: "ewallet",
    name: "Skrill / Neteller",
    subtitle: "Instant · Min $50",
    icon: "ewallet",
  },
];

export const VALUE_BAR_ITEMS = [
  { key: "methods", label: "Supported payment methods", value: "6+" },
  { key: "fees", label: "Platform deposit fees", value: "$0" },
  { key: "arrival", label: "Card/wallet/cryptocurrency arrival", value: "Immediate" },
  { key: "withdrawal", label: "Withdrawal request processing time", value: "24h" },
];

export const PAYMENT_METHODS = [
  {
    key: "card",
    name: "Credit Card/Debit Card",
    subtitle: "Visa · Mastercard",
    icon: "card",
    lowest: "$0",
    fundsReceived: "immediate",
    cost: "free",
  },
  {
    key: "bank",
    name: "bank transfer",
    subtitle: "International wire transfer",
    icon: "bank",
    lowest: "$0",
    fundsReceived: "1–3 days",
    cost: "free",
  },
  {
    key: "ewallet",
    name: "e-wallet",
    subtitle: "Skrill · Neteller",
    icon: "ewallet",
    lowest: "$0",
    fundsReceived: "1–3 days",
    cost: "free",
  },
  {
    key: "crypto",
    name: "Cryptocurrency",
    subtitle: "USDT (TRC20)",
    icon: "crypto",
    lowest: "$0",
    fundsReceived: "immediate",
    cost: "free",
  },
  {
    key: "applePay",
    name: "Apple Pay",
    subtitle: "iOS · macOS",
    icon: "mobile",
    lowest: "$0",
    fundsReceived: "immediate",
    cost: "free",
  },
  {
    key: "googlePay",
    name: "Google Pay",
    subtitle: "Android · Chrome",
    icon: "send",
    lowest: "$0",
    fundsReceived: "immediate",
    cost: "free",
  },
];

export const DEPOSIT_STEPS = [
  {
    key: "login",
    step: "1",
    title: "Login account",
    description:
      "Visit mygtcfx.com and log in using your account and password.",
  },
  {
    key: "deposit",
    step: "2",
    title: "Click to deposit",
    description:
      "Click 'Deposit' in the top menu or wallet icon to access the deposit page.",
  },
  {
    key: "confirm",
    step: "3",
    title: "Select method and confirm.",
    description:
      "Choose a payment method, enter the amount, and follow the prompts to complete the payment. Funds will be credited instantly.",
  },
];

export const DEPOSIT_PROGRESS_PATH = [
  { key: 0, label: "mygtcfx.com", highlight: false },
  { key: 1, label: "Choose payment method", highlight: false },
  { key: 2, label: "Enter amount", highlight: false },
  { key: 3, label: "Funds received ✓", highlight: true },
];

export const DEPOSIT_TUTORIAL_PDF_HREF = "/pdf/deposit-tutorial.pdf";

export const Icon1 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="21" viewBox="0 0 26 21" fill="none">
    <path d="M20.4286 0L7.42857 4.92751L13.619 8.00721C13.619 8.00721 8.22714 19.9811 0 20.326C0 20.326 12.121 24.847 19.8095 10.471L26 13.5507L20.4286 0Z" fill="#293B93"/>
  </svg>
  )
}

export const Icon2 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
      <path d="M1.15774 19.07H5.08226V24H1.15774V19.07ZM6.30574 12.1681H10.2224V24H6.30574V12.1681ZM11.4655 15.1261H15.39V24H11.4655V15.1261ZM16.4938 14.1401H20.4183V24H16.4938V14.1401ZM21.4632 8.22415H25.3809V24H21.4632V8.22415Z" fill="#293B93" />
      <path d="M0 12.596L10.5109 2.88797L16.5429 8.84237L22.2383 2.18397L20.1731 0H26V5.66747L23.9632 3.55745L16.5429 12.5812L10.4471 6.28471L1.46287 14.6883L0 12.596Z" fill="#293B93" />
    </svg>
  )
}

export const Icon3 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
      <path d="M11.5219 10.2447C13.1476 8.85263 15.2742 8.00789 17.6016 8.00789C18.7452 8.00789 19.8406 8.21316 20.8504 8.58421C22.8055 7.67368 24 6.45789 24 5.12368C24.0027 2.29474 18.6274 0 12.0013 0C5.37529 0 0 2.29474 0 5.12632C0 7.88684 5.1155 10.1395 11.5219 10.2447ZM2.28992 9.81579C1.70874 9.50526 0.998996 9.75 0.707064 10.3658C0.412454 10.9816 0.645464 11.7316 1.22665 12.0447C3.66388 13.3526 6.15735 14.25 8.66421 14.7263C8.89454 13.8921 9.24004 13.1053 9.68731 12.3842C7.21527 11.9895 4.74322 11.1342 2.28992 9.81579ZM2.23636 15.2526C1.65517 14.9421 0.94543 15.1868 0.653498 15.8026C0.358888 16.4184 0.591898 17.1684 1.17308 17.4816C3.70405 18.8395 6.29662 19.7553 8.8999 20.2158C8.5919 19.3842 8.40442 18.4974 8.35621 17.5737C6.31001 17.1158 4.26649 16.3421 2.23636 15.2526ZM10.9354 23.4211C8.02946 23.1474 5.12086 22.2342 2.23636 20.6868C1.65517 20.3763 0.94543 20.6211 0.653498 21.2368C0.358888 21.8526 0.591898 22.6026 1.17308 22.9158C4.11383 24.4921 7.1376 25.4763 10.164 25.8395C11.0559 25.9474 11.9478 26 12.8343 26C13.6056 26 14.3743 25.9605 15.1403 25.8789C13.5146 25.4395 12.071 24.5789 10.9354 23.4211ZM11.388 15.8342C11.388 17.8079 12.454 18.9895 13.9243 18.9895C15.3947 18.9895 16.4741 17.8105 16.4741 15.8342C16.4741 13.8605 15.3947 12.7211 13.9243 12.7211C12.454 12.7211 11.388 13.8579 11.388 15.8342ZM14.8001 15.8342C14.8001 17.2132 14.3957 17.6895 13.9243 17.6895C13.453 17.6895 13.0485 17.2132 13.0485 15.8342C13.0485 14.4553 13.453 14.0184 13.9243 14.0184C14.3957 14.0184 14.8001 14.4553 14.8001 15.8342ZM19.6826 12.7184L14.2752 22.95H15.6384L21.0593 12.7184H19.6826ZM21.3967 16.6684C19.9397 16.6684 18.8604 17.8211 18.8604 19.7947C18.8604 21.7684 19.9397 22.95 21.3967 22.95C22.8537 22.95 23.933 21.7711 23.933 19.7947C23.933 17.8184 22.8537 16.6684 21.3967 16.6684ZM21.3967 21.6368C20.9253 21.6368 20.5075 21.1737 20.5075 19.7947C20.5075 18.4026 20.9253 17.9789 21.3967 17.9789C21.8681 17.9789 22.2591 18.4026 22.2591 19.7947C22.2591 21.1737 21.8681 21.6368 21.3967 21.6368Z" fill="#293B93" />
    </svg>
  )
}

export const Icon4 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
      <path d="M11.5219 10.2447C13.1476 8.85263 15.2742 8.00789 17.6016 8.00789C18.7452 8.00789 19.8406 8.21316 20.8504 8.58421C22.8055 7.67368 24 6.45789 24 5.12368C24.0027 2.29474 18.6274 0 12.0013 0C5.37529 0 0 2.29474 0 5.12632C0 7.88684 5.1155 10.1395 11.5219 10.2447ZM2.28992 9.81579C1.70874 9.50526 0.998996 9.75 0.707064 10.3658C0.412454 10.9816 0.645464 11.7316 1.22665 12.0447C3.66388 13.3526 6.15735 14.25 8.66421 14.7263C8.89454 13.8921 9.24004 13.1053 9.68731 12.3842C7.21527 11.9895 4.74322 11.1342 2.28992 9.81579ZM2.23636 15.2526C1.65517 14.9421 0.94543 15.1868 0.653498 15.8026C0.358888 16.4184 0.591898 17.1684 1.17308 17.4816C3.70405 18.8395 6.29662 19.7553 8.8999 20.2158C8.5919 19.3842 8.40442 18.4974 8.35621 17.5737C6.31001 17.1158 4.26649 16.3421 2.23636 15.2526ZM10.9354 23.4211C8.02946 23.1474 5.12086 22.2342 2.23636 20.6868C1.65517 20.3763 0.94543 20.6211 0.653498 21.2368C0.358888 21.8526 0.591898 22.6026 1.17308 22.9158C4.11383 24.4921 7.1376 25.4763 10.164 25.8395C11.0559 25.9474 11.9478 26 12.8343 26C13.6056 26 14.3743 25.9605 15.1403 25.8789C13.5146 25.4395 12.071 24.5789 10.9354 23.4211ZM11.388 15.8342C11.388 17.8079 12.454 18.9895 13.9243 18.9895C15.3947 18.9895 16.4741 17.8105 16.4741 15.8342C16.4741 13.8605 15.3947 12.7211 13.9243 12.7211C12.454 12.7211 11.388 13.8579 11.388 15.8342ZM14.8001 15.8342C14.8001 17.2132 14.3957 17.6895 13.9243 17.6895C13.453 17.6895 13.0485 17.2132 13.0485 15.8342C13.0485 14.4553 13.453 14.0184 13.9243 14.0184C14.3957 14.0184 14.8001 14.4553 14.8001 15.8342ZM19.6826 12.7184L14.2752 22.95H15.6384L21.0593 12.7184H19.6826ZM21.3967 16.6684C19.9397 16.6684 18.8604 17.8211 18.8604 19.7947C18.8604 21.7684 19.9397 22.95 21.3967 22.95C22.8537 22.95 23.933 21.7711 23.933 19.7947C23.933 17.8184 22.8537 16.6684 21.3967 16.6684ZM21.3967 21.6368C20.9253 21.6368 20.5075 21.1737 20.5075 19.7947C20.5075 18.4026 20.9253 17.9789 21.3967 17.9789C21.8681 17.9789 22.2591 18.4026 22.2591 19.7947C22.2591 21.1737 21.8681 21.6368 21.3967 21.6368Z" fill="#293B93" />
    </svg>
  )
}

export const PROTECTION_FEATURES = [
  {
    key: "segregated",
    title: "Segregated Client Accounts",
    description:
      "Client funds are held in top-tier, regulated banks — completely separate from GTCFX's operating capital. Your money is ring-fenced and protected at all times.",
    icon: "icon1",
  },
  {
    key: "secure",
    title: "3D Secure & Encrypted Payments",
    description:
      "Every online transaction is secured with 3D Secure technology and end-to-end encryption, adding multiple layers of fraud protection.",
    icon: "icon2",
  },
  {
    key: "verified",
    title: "Verified Withdrawals Only",
    description:
      "Funds are always returned to the verified source of deposit, following strict AML procedures to safeguard against unauthorized withdrawals.",
    icon: `icon3`,
  },
  {
    key: "regulated",
    title: "Multi-Jurisdiction Regulation",
    description:
      "GTCFX operates under regulatory oversight across multiple jurisdictions, ensuring compliance with the highest global financial standards.",
    icon: "icon4",
  },
];

export const SAFETY_CHECKLIST = [
  "Client funds held in segregated accounts at regulated, tier-1 banks — never merged with company funds",
  "In the event of insolvency, your money and assets are fully shielded from creditors",
  "Norton-secured transactions with advanced fraud monitoring on every payment",
  "Zero fees charged by GTCFX on all deposits and withdrawals, across every method",
];

export const REGULATORS = ["FCA", "CMA", "ASIC", "CySEC", "SCB"];
