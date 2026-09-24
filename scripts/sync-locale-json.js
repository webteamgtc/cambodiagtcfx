/**
 * Sync km.json structure to match en.json exactly.
 * Preserves existing translations; fills missing keys from patch maps.
 *
 * Usage: node scripts/sync-locale-json.js
 */

const fs = require("fs");
const path = require("path");
const zhMt5Overrides = require("./locale-patches/zh-mt5-overrides");

const ROOT = path.join(__dirname, "..");
const EN_PATH = path.join(ROOT, "src/translation/en.json");
const AR_PATH = path.join(ROOT, "src/translation/ar.json");
const ZH_PATH = path.join(ROOT, "src/translation/zh.json");

/** @type {Record<string, string | string[] | object>} */
const AR_PATCH = {
  "navigation.megaMenu.learn.columns.startTrading.liquidityTechnology":
    "السيولة والتكنولوجيا",
  "navigation.megaMenu.trading.columns.tradingPlatforms.copyTrading":
    "نسخ التداول",
  "earningsPage.earningsDividendsEyebrow": "تقويم الأرباح والتوزيعات",
  "earningsPage.earningsDescription":
    "تابع تواريخ استحقاق التوزيعات القادمة واحسب مدفوعات التوزيعات المحتملة على مراكز التداول الخاصة بك.",
  "earningsPage.loadingText": "جارٍ تحميل بيانات الأرباح...",
  "earningsPage.howToCalculateIntro":
    "استخدم هذه الصيغ لتقدير تعديلات التوزيعات على مراكز عقود الفروقات المفتوحة.",
  "earningsPage.screener.eyebrow": "فاحص السوق",
  "earningsPage.screener.title": "أرباح هذا الشهر",
  "earningsPage.screener.description":
    "راجع الشركات التي تعلن عن أرباحها واكتشف الفرص قبل الإعلان التالي.",
  "marketsPage.economicCalendarSection.features.calendar.link":
    "عرض التقويم الاقتصادي",
  "marketsPage.economicCalendarSection.features.tradingHours.link":
    "عرض ساعات التداول",
  "marketsPage.economicCalendarSection.features.holidays.link":
    "عرض ساعات العطل",
  "legalDocumentsPage.hero.eyebrow": "الشؤون القانونية والامتثال",
  "legalDocumentsPage.hero.title": "السياسات القانونية واتفاقيات العملاء",
  "legalDocumentsPage.hero.description":
    "اطّلع على جميع المستندات القانونية ونماذج onboarding للعملاء وسياسات الخصوصية وإفصاحات المخاطر والمعلومات التنظيمية لـ GTC Financial Consultancy وGTC Global LTD (Mauritius) وGTC Global Trade Capital Co. Ltd (Vanuatu).",
  "legalDocumentsPage.content.tabsLabel": "الكيانات القانونية",
  "legalDocumentsPage.content.download": "تنزيل",
  "legalDocumentsPage.content.footnote":
    "تُفتح المستندات في علامة تبويب جديدة. قد تُحدَّث السياسات دورياً — راجع دائماً أحدث نسخة منشورة.",
  "legalDocumentsPage.content.entities.consultancy.label":
    "GTC Financial Consultancy",
  "legalDocumentsPage.content.entities.mauritius.label":
    "GTC Global LTD (Mauritius)",
  "legalDocumentsPage.content.entities.vanuatu.label":
    "GTC Global Trade Capital Co.Ltd (Vanuatu)",
  "marketHolidaysPage.tradingHours.eyebrow": "جدول السوق",
  "marketHolidaysPage.tradingHours.timezoneBadge": "المنطقة الزمنية: GMT+0",
  "marketHolidaysPage.tradingHours.tabsLabel": "فئات الأدوات",
  "marketHolidaysPage.tradingHours.modeLabel": "نوع الساعات",
  "marketHolidaysPage.tradingHours.pricing": "التسعير",
  "marketHolidaysPage.tradingHours.trading": "التداول",
  "marketHolidaysPage.tradingHours.pricingHint":
    "ساعات التسعير توضح متى تتوفر أسعار السوق المباشرة.",
  "marketHolidaysPage.tradingHours.tradingHint":
    "ساعات التداول توضح متى يمكنك فتح المراكز وإغلاقها.",
  "marketHolidaysPage.tradingHours.footnote":
    "الجداول إرشادية وقد تتغير خلال عطلات السوق أو تعديلات التوقيت الصيفي.",
  "marketHolidaysPage.tradingHours.daysShort": ["الإث", "الثل", "الأر", "الخ", "الجم"],
  "marketHolidaysPage.tradingHours.daysFull": [
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ],
};

function setByPath(obj, dotPath, value) {
  const parts = dotPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    if (!cur[key] || typeof cur[key] !== "object" || Array.isArray(cur[key])) {
      cur[key] = {};
    }
    cur = cur[key];
  }
  cur[parts[parts.length - 1]] = value;
}

function getByPath(obj, dotPath) {
  return dotPath.split(".").reduce((acc, part) => acc?.[part], obj);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeLeafValue(enVal, localeVal) {
  if (localeVal === undefined || localeVal === null || localeVal === "") {
    return localeVal;
  }

  if (typeof enVal === "string") {
    if (typeof localeVal === "object" && !Array.isArray(localeVal)) {
      if (typeof localeVal.text === "string") return localeVal.text;
      if (typeof localeVal.hyperlink === "string") return localeVal.hyperlink;
      return undefined;
    }
    return localeVal;
  }

  if (typeof enVal === "number") {
    if (typeof localeVal === "number") return localeVal;
    if (typeof localeVal === "string") {
      const parsed = Number(localeVal);
      return Number.isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  }

  return localeVal;
}

function resolveLeaf(enVal, localeVal, locale, path) {
  const normalized = normalizeLeafValue(enVal, localeVal);
  if (normalized !== undefined && normalized !== null && normalized !== "") {
    return normalized;
  }

  const patch =
    locale === "ar" ? AR_PATCH[path] : locale === "zh" ? ZH_PATCH[path] : undefined;

  if (patch !== undefined) {
    return typeof patch === "object" ? JSON.parse(JSON.stringify(patch)) : patch;
  }

  return enVal;
}

function syncNode(enNode, localeNode, locale, path = "") {
  if (Array.isArray(enNode)) {
    if (!Array.isArray(localeNode)) {
      return cloneWithPatches(enNode, locale, path);
    }
    return enNode.map((item, index) =>
      syncNode(item, localeNode[index], locale, `${path}[${index}]`)
    );
  }

  if (isPlainObject(enNode)) {
    const result = {};
    for (const key of Object.keys(enNode)) {
      const nextPath = path ? `${path}.${key}` : key;
      result[key] = syncNode(enNode[key], localeNode?.[key], locale, nextPath);
    }
    return result;
  }

  const patch =
    locale === "ar"
      ? AR_PATCH[path]
      : locale === "zh"
        ? ZH_PATCH[path]
        : undefined;

  if (patch !== undefined) {
    return typeof patch === "object" ? JSON.parse(JSON.stringify(patch)) : patch;
  }

  return resolveLeaf(enNode, localeNode, locale, path);
}

function cloneWithPatches(enNode, locale, path) {
  if (Array.isArray(enNode)) {
    return enNode.map((item, index) =>
      cloneWithPatches(item, locale, `${path}[${index}]`)
    );
  }
  if (isPlainObject(enNode)) {
    const result = {};
    for (const key of Object.keys(enNode)) {
      const nextPath = path ? `${path}.${key}` : key;
      result[key] = cloneWithPatches(enNode[key], locale, nextPath);
    }
    return result;
  }
  const patch =
    locale === "ar"
      ? AR_PATCH[path]
      : locale === "zh"
        ? ZH_PATCH[path]
        : undefined;
  return patch !== undefined ? patch : enNode;
}

function buildZhMt5PlatformPage(en, zh) {
  const en4 = en.mt4PlatformPage;
  const en5 = en.mt5PlatformPage;
  const zh4 = zh.mt4PlatformPage;

  function mapNode(enVal, enRef, zhRef, dotPath) {
    if (Array.isArray(enVal)) {
      return enVal.map((item, index) =>
        mapNode(
          item,
          Array.isArray(enRef) ? enRef[index] : undefined,
          Array.isArray(zhRef) ? zhRef[index] : undefined,
          `${dotPath}[${index}]`
        )
      );
    }
    if (isPlainObject(enVal)) {
      const out = {};
      for (const key of Object.keys(enVal)) {
        const next = dotPath ? `${dotPath}.${key}` : key;
        out[key] = mapNode(enVal[key], enRef?.[key], zhRef?.[key], next);
      }
      return out;
    }

    if (
      enRef !== undefined &&
      JSON.stringify(enRef) === JSON.stringify(enVal) &&
      zhRef !== undefined &&
      zhRef !== null &&
      zhRef !== ""
    ) {
      return zhRef;
    }

    const patch = ZH_PATCH[dotPath];
    if (patch !== undefined) {
      return patch;
    }

    return enVal;
  }

  return mapNode(en5, en4, zh4, "mt5PlatformPage");
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function countLeaves(obj) {
  let count = 0;
  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (isPlainObject(node)) {
      Object.values(node).forEach(walk);
      return;
    }
    count += 1;
  };
  walk(obj);
  return count;
}

function flattenLeaves(obj, prefix = "") {
  const out = {};
  const walk = (node, path) => {
    if (Array.isArray(node)) {
      out[path] = node;
      return;
    }
    if (isPlainObject(node)) {
      for (const key of Object.keys(node)) {
        const next = path ? `${path}.${key}` : key;
        walk(node[key], next);
      }
      return;
    }
    out[path] = node;
  };
  walk(obj, prefix);
  return out;
}

// Chinese patch map — missing keys + MT5-specific overrides
const ZH_PATCH = {};

function registerZhPatchFromAr(en, ar, zh) {
  // Copy glossary keys from Arabic structure into zh patch (translated below manually)
  void ar;
  void zh;
  void en;
}

function applyStaticZhPatches() {
  Object.assign(ZH_PATCH, zhMt5Overrides);
  Object.assign(ZH_PATCH, {
    "navigation.a11y.language": "语言",
    "navigation.a11y.openMenu": "打开菜单",
    "navigation.a11y.closeMenu": "关闭菜单",
    "navigation.a11y.primaryNav": "主导航",
    "navigation.a11y.mobileNav": "移动端导航",
    "navigation.a11y.expandSubmenu": "展开{label}子菜单",
    "navigation.a11y.collapseSubmenu": "收起{label}子菜单",
    "navigation.megaMenu.learn.columns.startTrading.liquidityTechnology":
      "流动性与技术",
    "navigation.megaMenu.trading.columns.tradingPlatforms.copyTrading":
      "跟单交易",
    "glossaryPage.title": "交易词汇表",
    "glossaryPage.description":
      "通过我们的金融术语、缩写和定义合集,随时掌握最新内容。",
    "glossaryPage.searchPlaceholder": "搜索词汇表",
    "glossaryPage.alphabet": "字母索引",
    "glossaryPage.homeAria": "交易词汇表首页",
    "glossaryPage.trendingTitle": "热门词汇",
    "glossaryPage.trendingLoading": "正在加载热门术语…",
    "glossaryPage.viewAll": "查看该字母下的全部词汇。",
    "glossaryPage.letterHeading":
      "金融术语与常见问题,帮助您了解GTCFX交易",
    "glossaryPage.loadingTerms": "正在加载词汇表术语…",
    "glossaryPage.categories.abbreviations": "缩写",
    "glossaryPage.categories.analysis": "分析",
    "glossaryPage.categories.economics": "经济学",
    "glossaryPage.categories.forex": "外汇",
    "glossaryPage.categories.organizations": "机构",
    "glossaryPage.categories.trading": "交易",
    "glossaryPage.cta.eyebrow": "随时为您准备",
    "glossaryPage.cta.heading": "准备好交易了吗?",
    "glossaryPage.cta.sub":
      "准备好与GTCFX一起开启交易之旅了吗?只需几分钟即可申请账户。",
    "glossaryPage.cta.footnote": "也提供模拟账户 · 无需银行卡",
    "glossaryPage.cta.primary": "开始交易",
    "glossaryPage.cta.secondary": "或试用模拟账户",
    "earningsPage.earningsDividendsEyebrow": "盈利与股息日历",
    "earningsPage.earningsDescription":
      "跟踪即将除息的日期,并计算持仓的潜在股息支付。",
    "earningsPage.loadingText": "正在加载盈利数据...",
    "earningsPage.howToCalculateIntro":
      "使用以下公式估算未平仓差价合约头寸的股息调整。",
    "earningsPage.screener.eyebrow": "市场筛选器",
    "earningsPage.screener.title": "本月盈利",
    "earningsPage.screener.description":
      "浏览即将公布盈利的公司,在下一份财报发布前发现机会。",
    "marketsPage.economicCalendarSection.features.calendar.link":
      "查看经济日历",
    "marketsPage.economicCalendarSection.features.tradingHours.link":
      "查看交易时间",
    "marketsPage.economicCalendarSection.features.holidays.link":
      "查看假日交易时间",
    "awardsPage.regionalAwardsSection.filters.all": "全部奖项",
    "companyPage.hubSection.title": "关于GTCFX",
    "companyPage.hubSection.description":
      "GTCFX是全球金融衍生品领域的领导者,成立于2012年。GTCFX品牌涵盖多家公司,提供多样化的在线交易产品,服务全球超过985,000名客户。GTCFX以提供顶级金融服务而著称,并始终强调卓越与创新。",
    "regulationsPage.licenses.titleLine1": "跨多个司法管辖区的网络",
    "regulationsPage.licenses.titleLine2": "我们的全球布局",
    "legalDocumentsPage.hero.eyebrow": "法律与合规",
    "legalDocumentsPage.hero.title": "法律政策与客户协议",
    "legalDocumentsPage.hero.description":
      "查阅GTC Financial Consultancy、GTC Global LTD (Mauritius)及GTC Global Trade Capital Co. Ltd (Vanuatu)的全部法律文件、客户开户表格、隐私政策、风险披露及监管信息。",
    "legalDocumentsPage.content.tabsLabel": "法律实体",
    "legalDocumentsPage.content.download": "下载",
    "legalDocumentsPage.content.footnote":
      "文件将在新标签页中打开。政策可能会定期更新——请始终参考最新发布版本。",
    "legalDocumentsPage.content.entities.consultancy.label":
      "GTC Financial Consultancy",
    "legalDocumentsPage.content.entities.mauritius.label":
      "GTC Global LTD (Mauritius)",
    "legalDocumentsPage.content.entities.vanuatu.label":
      "GTC Global Trade Capital Co.Ltd (Vanuatu)",
    "openLiveAccountPage.steps.items.basic-info.footerValue": "< 2分钟",
    "openLiveAccountPage.steps.items.kyc.footerValue": "约24小时",
    "openLiveAccountPage.steps.items.deposit.footerValue": "$100",
    "openLiveAccountPage.payments.eyebrow": "资金",
    "openLiveAccountPage.payments.title": "10多种支付方式。即时入金。",
    "openLiveAccountPage.payments.description":
      "以适合您的方式为账户注资——信用卡、银行电汇、电子钱包或加密货币。",
    "openLiveAccountPage.payments.ariaLabel": "支持的支付方式",
    "openLiveAccountPage.payments.footerNote":
      "GTCFX在大多数支付渠道上不收取入金手续费",
    "freeDemoAccountPage.signupForm.platformOptions.mt4": "MetaTrader 4",
    "freeDemoAccountPage.signupForm.platformOptions.mt5": "MetaTrader 5",
    "freeDemoAccountPage.signupForm.platformOptions.gtcGo": "GTC Go App",
    "freeDemoAccountPage.signupForm.accountTypeOptions.standard": "标准",
    "freeDemoAccountPage.signupForm.accountTypeOptions.ecn": "ECN",
    "freeDemoAccountPage.signupForm.accountTypeOptions.vip": "VIP",
    "accountTypesPage.tierDetailSection.tierLabel": "等级 {n}",
    "swapUpdatePage.spreads.tabs.metal": "金属",
    "swapUpdatePage.spreads.tabs.crypto": "加密货币",
    "swapUpdatePage.spreads.empty": "没有符合搜索条件的品种。",
    "swapUpdatePage.spreads.headers.swapType": "掉期类型",
    "swapUpdatePage.spreads.headers.swapLong": "多头掉期",
    "swapUpdatePage.spreads.headers.swapShort": "空头掉期",
    "marketHolidaysPage.tradingHours.eyebrow": "市场时间表",
    "marketHolidaysPage.tradingHours.timezoneBadge": "时区:GMT+0",
    "marketHolidaysPage.tradingHours.tabsLabel": "品种类别",
    "marketHolidaysPage.tradingHours.modeLabel": "时间类型",
    "marketHolidaysPage.tradingHours.pricing": "报价",
    "marketHolidaysPage.tradingHours.trading": "交易",
    "marketHolidaysPage.tradingHours.pricingHint":
      "报价时间显示何时可提供实时市场价格。",
    "marketHolidaysPage.tradingHours.tradingHint":
      "交易时间显示何时可以开仓和平仓。",
    "marketHolidaysPage.tradingHours.footnote":
      "时间表仅供参考,在市场假日或夏令时调整期间可能会发生变化。",
    "marketHolidaysPage.tradingHours.daysShort": ["周一", "周二", "周三", "周四", "周五"],
    "marketHolidaysPage.tradingHours.daysFull": [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
    ],
    "energyMarketPage.liveQuotes.title": "能源实时报价",
    "energyMarketPage.liveQuotes.sub":
      "探索GTCFX提供的能源品种——原油、天然气及相关产品。",
    "energyMarketPage.liveQuotes.footerLink": "查看全部能源品种 →",
    "metalsMarketPage.liveQuotes.title": "金属实时报价",
    "metalsMarketPage.liveQuotes.sub":
      "探索GTCFX提供的贵金属和工业金属——黄金、白银、铂金等。",
    "metalsMarketPage.liveQuotes.footerLink": "查看全部金属品种 →",
    "cryptoCfdsMarketPage.liveQuotes.title": "加密货币差价合约实时报价",
    "cryptoCfdsMarketPage.liveQuotes.sub":
      "探索GTCFX提供的加密货币差价合约品种——全天候交易主流币种。",
    "cryptoCfdsMarketPage.liveQuotes.footerLink": "查看全部加密货币品种 →",
    "futureCfdsMarketPage.liveQuotes.title": "期货差价合约实时报价",
    "futureCfdsMarketPage.liveQuotes.sub":
      "探索GTCFX提供的期货差价合约品种,灵活接入市场。",
    "futureCfdsMarketPage.liveQuotes.footerLink": "查看全部期货品种 →",
    "liveAccountApplicationPage.accounts.standard-account.title": "标准账户",
    "liveAccountApplicationPage.accounts.standard-account.subtitle":
      "通过机构级基础设施及多重监管保护,开始在全球市场交易。",
    "liveAccountApplicationPage.accounts.ecn-account.title": "ECN账户",
    "liveAccountApplicationPage.accounts.ecn-account.subtitle":
      "为专业交易者提供原始点差和直接市场准入。",
    "liveAccountApplicationPage.accounts.mam-pamm-account.title": "MAM/PAMM账户",
    "liveAccountApplicationPage.accounts.mam-pamm-account.subtitle":
      "通过高级分配方式管理多个账户。",
    "liveAccountApplicationPage.accounts.pro-ecn-account.title": "Pro ECN账户",
    "liveAccountApplicationPage.accounts.pro-ecn-account.subtitle":
      "专业级ECN交易,超低延迟执行。",
    "liveAccountApplicationPage.accounts.raw-spread-account.title": "RAW Spread账户",
    "liveAccountApplicationPage.accounts.raw-spread-account.subtitle":
      "以极低点差加成获取原始银行间点差。",
    "liveAccountApplicationPage.accounts.vip-account.title": "VIP账户",
    "liveAccountApplicationPage.accounts.vip-account.subtitle":
      "为高交易量交易者提供专属交易条件与个性化服务。",
    "liveAccountApplicationPage.accounts.corporate-account.title": "企业账户",
    "liveAccountApplicationPage.accounts.corporate-account.subtitle":
      "为企业客户提供机构级交易解决方案。",
    "liveAccountApplicationPage.accounts.demo-account.title": "模拟账户",
    "liveAccountApplicationPage.accounts.demo-account.subtitle":
      "使用虚拟资金无风险练习交易。",
    "liveAccountApplicationPage.accounts.multi-account.title": "多账户",
    "liveAccountApplicationPage.accounts.multi-account.subtitle":
      "通过单一控制面板管理多个交易账户。",
    "liveAccountApplicationPage.accounts.mt5-account.title": "MT5账户",
    "liveAccountApplicationPage.accounts.mt5-account.subtitle":
      "在MetaTrader 5上交易,享受多资产接入与高级分析功能。",
    "liveAccountApplicationPage.accounts.partnership-account.title": "合作伙伴账户",
    "liveAccountApplicationPage.accounts.partnership-account.subtitle":
      "作为联盟合作伙伴与GTCFX共同成长,并从客户活动中获得收益。",
    "liveAccountApplicationPage.accounts.pamm-account.title": "PAMM账户",
    "liveAccountApplicationPage.accounts.pamm-account.subtitle":
      "在透明业绩表现下,将资金分配至管理型策略。",
    "liveAccountApplicationPage.accounts.mam-account.title": "MAM账户",
    "liveAccountApplicationPage.accounts.mam-account.subtitle":
      "通过灵活的分配方式管理多个客户账户。",
    "liveAccountApplicationPage.form.stepper.title": "申请实盘交易账户",
    "liveAccountApplicationPage.form.stepper.subtitle":
      "您正在申请实盘账户,请仔细填写表单",
    "liveAccountApplicationPage.form.fields.lastname": "姓氏",
    "liveAccountApplicationPage.form.actions.register": "注册",
    "liveAccountApplicationPage.form.actions.registering": "提交中...",
    "liveAccountApplicationPage.form.legal.agreePrefix": "我同意",
    "liveAccountApplicationPage.form.legal.termsOfService": "服务条款",
    "liveAccountApplicationPage.form.legal.agreeAnd": "和",
    "liveAccountApplicationPage.form.legal.privacyPolicy": "隐私政策",
    "liveAccountApplicationPage.form.errors.firstNameLetters":
      "名字只能包含字母",
    "liveAccountApplicationPage.form.errors.passwordMin": "至少8个字符",
    "liveAccountApplicationPage.form.errors.passwordPattern":
      "必须包含字母和数字",
    "liveAccountApplicationPage.form.errors.passwordRequired": "密码为必填项",
    "liveAccountApplicationPage.form.errors.otpLength": "验证码必须为6位数字",
    "liveAccountApplicationPage.form.errors.otpRequired": "验证码为必填项",
    "liveAccountApplicationPage.form.errors.validCountry": "请选择有效的国家",
    "liveAccountApplicationPage.form.errors.emailRegistered":
      "该邮箱已被注册",
    "liveAccountApplicationPage.form.errors.lastNameLetters":
      "姓氏只能包含字母",
    "liveAccountApplicationPage.form.toast.registrationSuccess": "注册成功!",
    "liveAccountApplicationPage.form.toast.registrationFailed": "注册失败",
    "liveAccountApplicationPage.form.toast.otpSent": "验证码发送成功!",
    "liveAccountApplicationPage.form.countrySelect": "国家选择",
    "liveAccountApplicationPage.form.countryLoading": "正在加载国家列表...",
    "liveAccountApplicationPage.form.a11y.showPassword": "显示密码",
    "liveAccountApplicationPage.form.a11y.hidePassword": "隐藏密码",
    "liveAccountApplicationPage.contactBar.labels.phone": "电话",
    "liveAccountApplicationPage.contactBar.labels.website": "网站",
    "liveAccountApplicationPage.contactBar.labels.email": "邮箱",
    "home.homeHero.reviews.items.investing.name": "Investing.com",
    "about.contact-us.support_email": "support@gtcfx.com",
    "gtcGoApp.centerCtaBanner.buttons.download.href":
      "https://mygtc.onelink.me/pZtr?ref=Az7aFg5e&deep_link_sub1=Az7aFg5e&af_sub1=Az7aFg5e",
    "regulationPage.affiliates.three.website": "www.gmgmarkets.co.uk",
    "depositPage.stepsSection.steps.login.description":
      "访问 mygtcfx.com,使用您的账户和密码登录。",
    "tutorialPage.videos.one.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1",
    "tutorialPage.videos.two.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_2",
    "tutorialPage.videos.three.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_3",
    "tutorialPage.videos.four.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_4",
    "tutorialPage.videos.five.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_5",
    "tutorialPage.videos.six.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_6",
    "tutorialPage.videos.seven.youtubeUrl":
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_7",
    "swapFreePage.howToEnable.email": "support@gtcfx.com",
    "appQRWidget.link":
      "https://mygtc.onelink.me/pZtr?ref=Az7aFg5e&deep_link_sub1=Az7aFg5e&af_sub1=Az7aFg5e",
    "whyGtcGroupPage.clientVoicesSection.links.googleHref":
      "https://www.google.com/search?kgmid=/g/11pxr17glc&q=GTCFX+%7C+%231+Global+STP+Broker.",
    "whyGtcGroupPage.clientVoicesSection.links.myfxbookHref":
      "https://www.myfxbook.com/reviews/brokers/gtcfx/3001022,1",
    "whyGtcGroupPage.clientVoicesSection.links.wikifxHref":
      "https://www.wikifx.com/en/dealer/8791637328.html",
    "whyGtcGroupPage.clientVoicesSection.links.investing":
      "在Investing.com上查看",
    "whyGtcGroupPage.clientVoicesSection.links.investingHref":
      "https://www.investing.com/brokers/reviews/gtcfx/",
    "globalPresencePage.getStartedSection.card.actions.disputesHref":
      "https://financialcommission.org/dispute-resolution/",
    "eventsAndExhibitionsPage.mediaResourcesSection.contact.email":
      "media@gtcfx.com",
    "eventsAndExhibitionsPage.stayConnectedSection.newsletter.placeholder":
      "your@email.com",
    "regulationsPage.group.disclosures.restricted.tags.others": "+ 其他",
    "faqsPage.humanSupport.cards.email.meta": "support@gtcfx.com",
    "contactUsPage.channels.items.email.meta": "support@gtcfx.com",
    "freeDemoAccountPage.signupForm.emailPlaceholder": "you@email.com",
    "swapFreeTradingPage.hero.ratings.investing": "Investing.com",
    "vpsHostingPage.apply.form.emailPlaceholder": "your@mail.com",
    "forexMarketPage.whyTrade.features.latency.link": "+机构级流动性",
    "sharesMarketPage.whyTrade.features.latency.link": "+机构级流动性",
  });
}

function migrateLegacyStructures(locale) {
  const awardItems = locale?.about?.["awards-section"]?.items;
  if (Array.isArray(awardItems)) {
    const mapped = {};
    awardItems.forEach((item, index) => {
      if (item) {
        mapped[String(index)] = item;
      }
    });
    locale.about["awards-section"].items = mapped;
  }
}

function applyLiveAccountHrefPatches(en, target) {
  const hrefKeys = [
    "home.centerCtaBanner.buttons.download.href",
    "home.copyTradingSection.buttons.primary.href",
    "home.copyTradingSection.buttons.secondary.href",
    "home.homePammSection.items.one.primaryHref",
    "home.homePammSection.items.one.secondaryHref",
    "home.homePlatforms.items.four.link",
    "home.homePlatforms.items.five.link",
  ];
  for (const key of hrefKeys) {
    const value = getByPath(en, key);
    if (value !== undefined) {
      setByPath(target, key, value);
    }
  }
}

function main() {
  applyStaticZhPatches();
  registerZhPatchFromAr();

  const en = loadJson(EN_PATH);
  const ar = loadJson(AR_PATH);
  const zh = loadJson(ZH_PATH);

  migrateLegacyStructures(zh);

  // Pre-build MT5 zh page from mt4 zh + overrides
  if (en.mt5PlatformPage && zh.mt4PlatformPage) {
    const mt5Zh = buildZhMt5PlatformPage(en, zh);
    zh.mt5PlatformPage = mt5Zh;
  }

  const syncedAr = syncNode(en, ar, "ar");
  const syncedZh = syncNode(en, zh, "zh");

  applyLiveAccountHrefPatches(en, syncedZh);

  saveJson(AR_PATH, syncedAr);
  saveJson(ZH_PATH, syncedZh);

  const enFlat = flattenLeaves(en);
  const arFlat = flattenLeaves(syncedAr);
  const zhFlat = flattenLeaves(syncedZh);

  const missingAr = Object.keys(enFlat).filter((k) => !(k in arFlat));
  const missingZh = Object.keys(enFlat).filter((k) => !(k in zhFlat));
  const sameEnZh = Object.keys(enFlat).filter(
    (k) => k in zhFlat && typeof enFlat[k] === "string" && enFlat[k] === zhFlat[k]
  );

  console.log("Sync complete.");
  console.log("EN leaves:", Object.keys(enFlat).length);
  console.log("AR leaves:", Object.keys(arFlat).length, "missing:", missingAr.length);
  console.log("ZH leaves:", Object.keys(zhFlat).length, "missing:", missingZh.length);
  console.log("ZH strings still identical to EN:", sameEnZh.length);
  if (missingAr.length) console.log("Missing AR:", missingAr.slice(0, 10));
  if (missingZh.length) console.log("Missing ZH:", missingZh.slice(0, 10));
}

main();
