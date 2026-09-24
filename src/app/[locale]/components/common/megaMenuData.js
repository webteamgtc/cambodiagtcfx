import { translationText, translationTextByPath } from "@/i18n/tranlsationText";
import { getDictionary } from "@/i18n/request";
import { localizedHref } from "@/i18n/localizedHref";
import { isCareerHref } from "@/config/featureFlags";
import { CAMBODIA_SITE } from "@/config/cambodiaSite";
import { getBaseLanguage } from "@/i18n/regionalLocale";

/** Mega menu key → hub URL segment (e.g. `/company`) */
export const MENU_HUB_PATHS = {
  prime: "company",
  trading: "trading",
  account: "markets",
  learn: "knowledge-to-learn",
  about: "gtc-news",
};

export const MENU_HUB_SLUG_TO_KEY = Object.fromEntries(
  Object.entries(MENU_HUB_PATHS).map(([menuKey, slug]) => [slug, menuKey])
);

const MENU_HUB_TAB_ICONS = Array.from(
  { length: 8 },
  (_, index) => `/new-design/tab${index + 1}.svg`
);

const LIVE_ACCOUNT_URL =
  "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww";
const PARTNERS_URL = "https://reg.gtcfx.com/uae/partners-campaign";
const AFFILIATE_URL = "https://www.gtcaffiliates.com/";
const GTC_PRIME_URL = "https://gtcprime.com/";

const defaultNavText = {
  menu: {
    about: "GTC News",
    account: "Markets",
    trading: "Trading",
    prime: "Company",
    learn: "Learn",
  },
};

const pick = (value, fallback) =>
  translationText("label", fallback, {
    label: typeof value === "string" ? value.trim() : value,
  });

const menuT = (path, fallback, navigation = {}) =>
  translationTextByPath(`megaMenu.${path}`, fallback, navigation);

function filterMenuLinks(links = []) {
  return links.filter((link) => !isCareerHref(link.href));
}

function isNavKeyHiddenForLocale(key, locale) {
  if (getBaseLanguage(locale) !== "km") return false;
  return (CAMBODIA_SITE.navHiddenForKhmer || []).includes(key);
}

export function getNavItems(navigation = {}, locale = "en-intl") {
  return [
    {
      key: "prime",
      label: translationTextByPath("menu.prime", defaultNavText.menu.prime, navigation),
    },
    {
      key: "trading",
      label: translationTextByPath("menu.trading", defaultNavText.menu.trading, navigation),
    },
    {
      key: "account",
      label: translationTextByPath("menu.account", defaultNavText.menu.account, navigation),
    },
    {
      key: "learn",
      label: translationTextByPath("menu.learn", defaultNavText.menu.learn, navigation),
    },
    {
      key: "about",
      label: translationTextByPath("menu.about", defaultNavText.menu.about, navigation),
    },
  ].filter((item) => !isNavKeyHiddenForLocale(item.key, locale));
}

export function getMegaMenuData(navigation = {}, locale = "en-intl") {
  const about = navigation?.about || {};
  const account = navigation?.account || {};
  const trading = navigation?.trading || {};
  const prime = navigation?.prime || {};
  const learn = navigation?.learn || {};

  const data = {
    /** Learn */
    learn: {
      title: pick(learn.lable, defaultNavText.menu.learn),
      columns: [
        {
          heading: menuT("learn.columns.startTrading.heading", "Start Trading", navigation),
          links: [
            {
              label: menuT("learn.columns.startTrading.forTradingBeginners", "For Trading Beginners", navigation),
              href: "/knowledge-to-learn/for-trading-beginners",
            },
            {
              label: menuT("learn.columns.startTrading.freeDemoAccount", "Free Demo Account", navigation),
              href: "/trading/free-demo-account",
            },
            {
              label: menuT("learn.columns.startTrading.azGlossary", "A-Z Glossary", navigation),
              href: "/knowledge-to-learn/trading-glossary",
            },
            {
              label: menuT("learn.columns.startTrading.liquidityTechnology", "Liquidity & Technology", navigation),
              href: "/knowledge-to-learn/liquidity-technology",
            },
          ],
        },
        {
          heading: menuT("learn.columns.buildYourSkills.heading", "Build Your Skills", navigation),
          links: [
            {
              label: menuT("learn.columns.buildYourSkills.tradingEssentials", "Trading Essentials", navigation),
              href: "/knowledge-to-learn/ebooks-guides",
            },
            {
              label: menuT("learn.columns.buildYourSkills.marketGuides", "Market Guides", navigation),
              href: "/knowledge-to-learn/webinars-live",
            },
            {
              label: menuT("learn.columns.buildYourSkills.riskManagementBasics", "Risk Management Basics", navigation),
              href: "/knowledge-to-learn/platform-walkthroughs",
            },
            {
              label: menuT("learn.columns.buildYourSkills.technicalAnalysisBasics", "Technical Analysis Basics", navigation),
              href: "/knowledge-to-learn/technical-analysis",
            },
          ],
        },
        {
          heading: menuT("learn.columns.helpCentre.heading", "Help Centre", navigation),
          links: [
            {
              label: menuT("learn.columns.helpCentre.gtcfxQa", "GTCFX Q&A", navigation),
              href: "/company/faqs",
            },
            {
              label: menuT("learn.columns.helpCentre.accountDepositFaqs", "Account & Deposit FAQs", navigation),
              href: "/company/faqs",
            },
            {
              label: menuT("learn.columns.helpCentre.platformGuides", "Platform Guides", navigation),
              href: "/knowledge-to-learn/platform-guide",
            },
          ],
        },
      ],
      promo: {
        variant: "featured",
        heading: menuT("learn.promo.heading", "Traders' Insight", navigation),
        description: menuT(
          "learn.promo.description",
          "Get daily market commentary and insights from industry leaders and IBKR analysts across global asset classes. Explore Insights",
          navigation
        ),
        ctaLabel: menuT("learn.promo.ctaLabel", "Explore Insights", navigation),
        href: "/knowledge-to-learn",
        bgSrc: "/new-design/candle-bg.webp",
      },
    },

    /** GTC News */
    about: {
      title: pick(about.lable, defaultNavText.menu.about),
      columns: [
        {
          heading: menuT("about.columns.marketUpdates.heading", "Market Updates", navigation),
          links: [
            {
              label: menuT("about.columns.marketUpdates.dailyWeeklyOutlook", "Daily / Weekly Market Outlook", navigation),
              href: "/gtc-news",
            },
            {
              label: menuT("about.columns.marketUpdates.economicCalendar", "Economic Calendar", navigation),
              href: "/markets/economic-calendar",
            },
            {
              label: menuT(
                "about.columns.marketUpdates.earningsCalendar",
                "Earnings & Dividends Calendar",
                navigation
              ),
              href: "/gtc-news/earnings-calendar",
            },
            {
              label: menuT("about.columns.marketUpdates.marketHolidays", "Market Holidays", navigation),
              href: "/markets/market-holidays",
            },
          ],
        },
        {
          heading: menuT("about.columns.companyUpdates.heading", "Company Updates", navigation),
          links: [
            {
              label: menuT("about.columns.companyUpdates.companyNews", "Company News", navigation),
              href: "/gtc-news/company-news",
            },
            {
              label: menuT("about.columns.companyUpdates.events", "Events", navigation),
              href: "/company/events-and-exhibitions",
            },
            {
              label: menuT("about.columns.companyUpdates.awardsMedia", "Awards & Media", navigation),
              href: "/company/awards",
            },
          ],
        },
      ],
      promo: {
        variant: "featured",
        heading: menuT("about.promo.heading", "Fund in Your Trading Currency", navigation),
        description: menuT(
          "about.promo.description",
          "Deposit and trade in up to 29 currencies with flexible funding options.",
          navigation
        ),
        ctaLabel: menuT("about.promo.ctaLabel", "Explore Insights", navigation),
        href: "/gtc-news",
        bgSrc: "/new-design/candle-bg.webp",
      },
    },

    /** Markets */
    account: {
      title: pick(account.lable, defaultNavText.menu.account),
      /** Show every top-level category as its own column instead of stacking overflow columns together */
      columnLayout: "flat",
      columns: [
        {
          heading: menuT("account.columns.tradeMarkets.heading", "Trade Markets", navigation),
          links: [
            { label: menuT("account.columns.tradeMarkets.forex", "Forex", navigation), href: "/markets/forex" },
            { label: menuT("account.columns.tradeMarkets.energy", "Energy", navigation), href: "/markets/energy" },
            { label: menuT("account.columns.tradeMarkets.indices", "Indices", navigation), href: "/markets/indices" },
            { label: menuT("account.columns.tradeMarkets.metals", "Metals", navigation), href: "/markets/metals" },
            {
              label: menuT("account.columns.tradeMarkets.sharesEquityCfds", "Shares/Equity CFDs", navigation),
              href: "/markets/shares",
            },
            {
              label: menuT("account.columns.tradeMarkets.cryptoCfds", "Crypto CFDs", navigation),
              href: "/markets/crypto-cfds",
            },
            {
              label: menuT("account.columns.tradeMarkets.futureCfds", "Future CFDs", navigation),
              href: "/markets/future-cfds",
            },
          ],
        },
        {
          heading: menuT("account.columns.recommendations.heading", "Recommendations", navigation),
          links: [
            {
              label: menuT("account.columns.recommendations.eurUsd", "EURUSD", navigation),
              href: "/markets/forex",
            },
            {
              label: menuT("account.columns.recommendations.gbpUsd", "GBPUSD", navigation),
              href: "/markets/forex",
            },
            {
              label: menuT("account.columns.recommendations.usdJpy", "USDJPY", navigation),
              href: "/markets/forex",
            },
            {
              label: menuT("account.columns.recommendations.usdChf", "USDCHF", navigation),
              href: "/markets/forex",
            },
            {
              label: menuT("account.columns.recommendations.goldXauUsd", "Gold (XAUUSD)", navigation),
              href: "/markets/metals",
            },
          ],
        },
        {
          heading: menuT("account.columns.popularIndices.heading", "Popular Indices", navigation),
          links: [
            {
              label: menuT("account.columns.popularIndices.wallStreet", "Wall Street", navigation),
              href: "/markets/indices",
            },
            {
              label: menuT("account.columns.popularIndices.usSp500", "US SP 500", navigation),
              href: "/markets/indices",
            },
            {
              label: menuT("account.columns.popularIndices.usTech100", "US Tech 100", navigation),
              href: "/markets/indices",
            },
          ],
        },
      ],
      promo: {
        variant: "featured",
        heading: menuT("account.promo.heading", "Register Now", navigation),
        description: menuT(
          "account.promo.description",
          "Open a live account today and start trading with GTCFX. Get access to our award-winning trading platforms, market analysis, and educational resources.",
          navigation
        ),
        ctaLabel: menuT("account.promo.ctaLabel", "Open Live Account", navigation),
        href: "/live-account-application",
        external: false,
        bgSrc: "/new-design/line-chart-new.webp",
        ctaFullWidth: true,
      },
    },

    /** Trading */
    trading: {
      title: pick(trading.lable, defaultNavText.menu.trading),
      columns: [
        {
          heading: menuT("trading.columns.tradeWithGtcfx.heading", "Trade with GTCFX", navigation),
          links: [
            {
              label: menuT("trading.columns.tradeWithGtcfx.openTradingAccount", "Open Live Account", navigation),
              href: "/trading/open-live-account",
            },
            {
              label: menuT("trading.columns.tradeWithGtcfx.freeDemoAccount", "Free Demo Account", navigation),
              href: "/trading/free-demo-account",
            },
            {
              label: menuT("trading.columns.tradeWithGtcfx.fundYourAccount", "Fund Your Account", navigation),
              href: "/trading/deposit",
            },
            {
              label: menuT("trading.columns.tradeWithGtcfx.accountTypes", "Account Types", navigation),
              href: "/trading/account-types",
            },
            {
              label: menuT("trading.columns.tradeWithGtcfx.securityOfFund", "Security of Fund", navigation),
              href: "/trading/compensation-fund",
            },
          ],
        },
        {
          heading: menuT("trading.columns.metaTrader.heading", "MetaTrader4/5", navigation),
          links: [
            {
              label: menuT("trading.columns.metaTrader.mt5", "MetaTrader 5", navigation),
              href: "/trading/mt5-platform",
            },
            {
              label: menuT("trading.columns.metaTrader.mt4", "MetaTrader 4", navigation),
              href: "/trading/mt4-platform",
            },
            {
              label: menuT("trading.columns.metaTrader.android", "MetaTrader Android", navigation),
              href: "/trading/metatrader-for-andriod",
            },
            {
              label: menuT("trading.columns.metaTrader.iphoneIpad", "MetaTrader iPhone/iPad", navigation),
              href: "/trading/metatrader-for-ipad",
            },
          ],
        },
        {
          heading: menuT("trading.columns.gtcGo.heading", "GTCFX: GTC Go", navigation),
          links: [
            {
              label: menuT("trading.columns.gtcGo.app", "GTC Go", navigation),
              href: "/trading/gtc-go-app",
            },
             {
              label: menuT("trading.columns.gtcGo.web", "GTC Go Web", navigation),
              href: "https://web.mygtc.app/user",
              external: true,
            },
            {
              label: menuT("trading.columns.gtcGo.iphoneIpad", "GTC Go iPhone/iPad", navigation),
              href: "/trading/gtc-go-app-ipad",
            },
            {
              label: menuT("trading.columns.gtcGo.android", "GTC Go Android", navigation),
              href: "/trading/gtc-go-app-andriod",
            },
            {
              label: menuT("trading.columns.gtcGo.copyTrading", "Copy Trading", navigation),
              href: "/trading/copy-trading",
            },
          ],
        },
        {
          heading: menuT("trading.columns.ourProducts.heading", "Our Products", navigation),
          links: [
            {
              label: menuT("trading.columns.ourProducts.dynamicLeverage", "Dynamic Leverage", navigation),
              href: "/company/dynamic-leverage",
            },
            {
              label: menuT("trading.columns.ourProducts.swapUpdate", "Swap Update", navigation),
              href: "/trading/swap-update",
            },
          ],
        },
        {
          heading: menuT("trading.columns.tradingAdvantages.heading", "Trading Advantages", navigation),
          links: [
            {
              label: menuT("trading.columns.tradingAdvantages.pammAccount", "PAMM Account", navigation),
              href: "/trading/pamm-account",
            },
            // {
            //   label: menuT("trading.columns.tradingAdvantages.mamAccount", "MAM Account", navigation),
            //   href: "/trading/mam-account",
            // },
            {
              label: menuT("trading.columns.tradingAdvantages.vps", "VPS", navigation),
              href: "/trading/vps-hosting-services",
            },
          ],
        },
      ],
      promo: {
        variant: "downloads",
        heading: menuT("trading.promo.heading", "Platform Downloads", navigation),
        downloads: [
          {
            label: menuT("trading.promo.downloads.mt4", "MetaTrader 4", navigation),
            href: "/trading/mt4-platform",
          },
          {
            label: menuT("trading.promo.downloads.mt5", "MetaTrader 5", navigation),
            href: "/trading/mt5-platform",
          },
          {
            label: menuT("trading.promo.downloads.gtcGo", "GTC Go App", navigation),
            href: "/trading/gtc-go-app",
          },
        ],
        qrSrc: "/home/qrcode.svg",
        footerText: menuT("trading.promo.footerText", "Trade Smarter", navigation),
      },
    },

    /** Company */
    prime: {
      title: pick(prime.lable, defaultNavText.menu.prime),
      columns: [
        {
          heading: menuT("prime.columns.aboutGtcfx.heading", "About GTCFX", navigation),
          links: filterMenuLinks([
            {
              label: menuT("prime.columns.aboutGtcfx.aboutUs", "About Us", navigation),
              href: "/company/about-us",
            },
            {
              label: menuT("prime.columns.aboutGtcfx.whyGtcGroup", "Why GTCFX", navigation),
              href: "/company/why-gtc-group",
            },
            {
              label: menuT("prime.columns.aboutGtcfx.globalPresence", "Global Presence", navigation),
              href: "/company/global-presence",
            },
            {
              label: menuT("prime.columns.aboutGtcfx.careerOpportunities", "Career Opportunities", navigation),
              href: "/company/careers",
            },
            {
              label: menuT("prime.columns.aboutGtcfx.eventsExhibitions", "Events & Exhibitions", navigation),
              href: "/company/events-and-exhibitions",
            },
          ]),
        },
        {
          heading: menuT("prime.columns.legalInformation.heading", "Legal Information", navigation),
          links: [
            {
              label: menuT("prime.columns.legalInformation.gtcRegulation", "GTC Regulation", navigation),
              href: "/company/regulations",
            },
            {
              label: menuT("prime.columns.legalInformation.gtcfxAwards", "GTCFX Awards", navigation),
              href: "/company/awards",
            },
         
          ],
        },
        {
          heading: menuT("prime.columns.helpCenter.heading", "Help Center", navigation),
          links: [
            {
              label: menuT("prime.columns.helpCenter.faqUserSupport", "FAQ & User support", navigation),
              href: "/company/faqs",
            },
            {
              label: menuT("prime.columns.helpCenter.contactUs", "Contact Us", navigation),
              href: "/company/contact-us",
            },
          ],
        },
        {
          heading: menuT("prime.columns.partnerWithUs.heading", "Partner with Us", navigation),
          links: [
            {
              label: menuT("prime.columns.partnerWithUs.partnersProgram", "Partners Program", navigation),
              href: PARTNERS_URL,
              external: true,
            },
          
            {
              label: menuT("prime.columns.partnerWithUs.gtcPrime", "GTC Prime", navigation),
              href: GTC_PRIME_URL,
              external: true,
            },
          ],
        },
      ],
      promo: {
        variant: "featured",
        heading: menuT("prime.promo.heading", "Find Your Account", navigation),
        description: menuT(
          "prime.promo.description",
          "Choose the right account for your needs",
          navigation
        ),
        ctaLabel: menuT("prime.promo.ctaLabel", "See Account Guide", navigation),
        href: "/trading/account-types",
        bgSrc: "/new-design/candle-bg.webp",
      },
    },
  };

  if (getBaseLanguage(locale) === "km") {
    const hidden = new Set(CAMBODIA_SITE.navHiddenForKhmer || []);
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => !hidden.has(key))
    );
  }

  return data;
}

export function getMenuHubSlug(menuKey) {
  return MENU_HUB_PATHS[menuKey] ?? null;
}

export function getMenuHubPath(menuKey, locale = "en") {
  const slug = getMenuHubSlug(menuKey);
  if (!slug) return null;
  return localizedHref(locale, `/${slug}`);
}

export function getMenuHubTabs(menuKey, locale = "en", navigation = {}) {
  const mega = getMegaMenuData(navigation, locale);
  const section = mega[menuKey];
  if (!section) {
    return { title: "", links: [] };
  }

  const seen = new Set();
  const links = [];
  let iconIndex = 0;

  const collectLinks = (columnLinks = []) => {
    for (const link of columnLinks) {
      if (seen.has(link.href)) continue;
      seen.add(link.href);

      const external = Boolean(link.external);
      links.push({
        label: link.label,
        href: external ? link.href : localizedHref(locale, link.href),
        external,
        icon: MENU_HUB_TAB_ICONS[iconIndex % MENU_HUB_TAB_ICONS.length],
      });
      iconIndex += 1;
    }
  };

  for (const column of section.columns) {
    if (Array.isArray(column.groups)) {
      for (const group of column.groups) {
        collectLinks(group.links);
      }
    } else {
      collectLinks(column.links);
    }
  }

  return {
    title: section.title,
    links,
  };
}

/** Server helper: loads locale dictionary before building hub tabs. */
export async function getMenuHubTabsForLocale(menuKey, locale = "en") {
  const dict = await getDictionary(locale);
  return getMenuHubTabs(menuKey, locale, dict?.navigation ?? {});
}
