/** Chinese overrides for mt5PlatformPage (differs from mt4PlatformPage). */
module.exports = {
  "mt5PlatformPage.hero.badge": "MetaTrader 5 · 实时市场开放中",
  "mt5PlatformPage.hero.heading": "MT5 —— 下一代交易平台。",
  "mt5PlatformPage.hero.sub":
    "更多资产类别、更深度分析及原生对冲功能——GTCFX为跨市场专业交易者打造的MetaTrader进化版。",
  "mt5PlatformPage.hero.downloadLabel": "下载MT5",
  "mt5PlatformPage.hero.downloadWindows": "下载MetaTrader 5",
  "mt5PlatformPage.hero.trustItems": [
    "4.9/5交易者评分",
    "7+交易市场",
    "点差低至0.0",
  ],
  "mt5PlatformPage.stats": [
    "内置技术指标",
    "时间周期从M1到MN",
    "适用于任何策略的挂单类型",
    "MQL5智能交易系统(EA)自动化交易支持",
  ],
  "mt5PlatformPage.capabilities.intro":
    "{platform}凭借其作为下一代多资产平台的声誉而闻名——GTCFX为其配备机构级流动性、深度市场准入,以及从第一个报价起便为性能而精心打造的运行环境。",
  "mt5PlatformPage.capabilities.items": [
    {
      tag: "高级图表功能",
      heading: "像专业交易台一样读懂市场。",
      sub: "三种图表类型、二十一种时间周期,以及超过三十八种内置指标——搭配无限量的自定义模板及分析对象,满足注重细节的技术交易者需求。",
      imgAlt: "MT5上的高级图表功能",
      bullets: [
        {
          bold: "38+种指标",
          rest: "包括所有MT4指标,以及额外的振荡器和成交量工具。",
        },
        {
          bold: "21种时间周期",
          rest: "从M1剥头皮交易到月线宏观视角。",
        },
        {
          bold: "自定义模板及配置文件",
          rest: "——保存您的工作区,一键恢复。",
        },
        {
          bold: "多图表布局",
          rest: "或真正的多资产、多时间周期分析。",
        },
      ],
    },
    {
      tag: "自动化交易",
      heading: "MQL5——最强大的EA语言。",
      sub: "MQL5提供面向对象编程、更快的回测引擎,以及直接访问MQL5社区市场——其中包含数千个可立即部署的EA。",
      imgAlt: "MT5上的自动化交易",
      bullets: [
        {
          bold: "MQL5语言",
          rest: "——完整的OOP支持,用于编写机构级EA。",
        },
        {
          bold: "策略测试器",
          rest: "——在单次会话中进行多货币、多资产回测。",
        },
        {
          bold: "信号订阅",
          rest: "——一键复制经验证交易者的投资组合。",
        },
        {
          bold: "支持VPS托管",
          rest: "——让您的策略全天候在线运行,无任何中断。",
        },
      ],
    },
    {
      tag: "灵活的订单类型",
      heading: "六种订单类型,满足每种策略。",
      sub: "MT5在MT4订单类型基础上新增两种额外挂单类型——Buy Stop Limit和Sell Stop Limit——为复杂执行策略提供更高精度。",
      imgAlt: "MT5上的订单类型",
      bullets: [
        { bold: "市价单", rest: "——以最优可用价格即时执行。" },
        {
          bold: "限价单",
          rest: "——在低于或高于当前市场价格时买入或卖出。",
        },
        { bold: "止损单", rest: "——在任一方向突破时触发入场。" },
        {
          bold: "Buy/Sell Stop Limit",
          rest: "——触发后转换为限价单的挂单。",
        },
      ],
    },
    {
      tag: "多资产市场",
      heading: "股票、期货、外汇——一个终端。",
      sub: "MT5在Forex和差价合约之外,新增原生股票交易和期货品种——全部在同一终端中,统一保证金和组合视图。",
      imgAlt: "MT5上的多资产市场观察",
      bullets: [
        {
          bold: "外汇主要、次要及新兴市场货币对",
          rest: "——60多种货币对,流动性深厚。",
        },
        {
          bold: "全球指数及股票",
          rest: "——标普500、纳斯达克、德国DAX及个股。",
        },
        { bold: "大宗商品", rest: "——黄金、白银、石油、天然气。" },
        {
          bold: "加密货币及期货",
          rest: "——BTC、ETH,以及期货品种。",
        },
      ],
    },
    {
      tag: "一键交易",
      heading: "从信号到成交——只需一次点击。",
      sub: "MT5增强型一键交易面板在图表旁提供市场深度(DOM)视图——在执行瞬间为您提供完整的订单簿透明度。",
      imgAlt: "MT5上的一键交易",
      bullets: [
        {
          bold: "单击执行",
          rest: "可选市场深度视图,实现更精准的入场。",
        },
        {
          bold: "一键平仓全部/一键平仓盈利头寸",
          rest: "一步完成头寸管理。",
        },
        { bold: "实时盈亏监控", rest: "逐笔追踪浮动盈亏。" },
        { bold: "拖拽式修改", rest: "直接在图表上拖动止损及限价设置。" },
      ],
    },
  ],
  "mt5PlatformPage.download.items": [
    {
      platform: "Windows",
      version: "v5.0 · 桌面版",
      description:
        "完整的桌面端体验——多屏显示、多图表,MT5的所有功能全部解锁。",
      cta: "下载",
    },
    {
      platform: "Mac OS",
      version: "通用版 · M1/M2/M3",
      description:
        "原生Apple Silicon版本,在macOS Sonoma及以上系统上运行极速流畅。",
      cta: "下载",
    },
    {
      platform: "iOS",
      version: "App Store · iPhone及iPad",
      description:
        "原生iPhone及iPad应用,支持Face ID安全认证及Apple Watch提醒。",
      cta: "App Store →",
    },
    {
      platform: "Android",
      version: "Google Play · 手机及平板",
      description: "功能齐全的安卓客户端,支持生物识别登录及推送通知。",
      cta: "Google Play →",
    },
  ],
  "mt5PlatformPage.edge.eyebrow": "为什么选择GTCFX MT5",
  "mt5PlatformPage.edge.sub":
    "MT5是平台本身。而GTCFX是其背后的基础设施——一级流动性提供商、位于纽约、伦敦及东京的冗余Equinix数据中心,以及一支真正参与交易的支持团队。",
  "mt5PlatformPage.steps.items": [
    {
      title: "开设账户",
      desc: "在3分钟内完成在线注册。验证您的身份,为钱包注资,您的交易账户当天即可上线。",
      tag: "约3分钟 · 线上完成",
    },
    {
      title: "下载MT5",
      desc: "选择您的平台——Windows、Mac、iOS、Android,或使用WebTrader。同一登录信息适用于全部五种方式。",
      tag: "约2分钟 · 安装",
    },
    {
      title: "登录并交易",
      desc: "输入您的GTCFX服务器登录信息,设置您的图表及指标,并开始您的首笔交易。",
      tag: "市场 · 实时",
    },
  ],
  "mt5PlatformPage.faq.sub":
    "以下是交易者在下载GTCFX的MT5前最常提出的问题。没有找到您的问题?我们的团队随时待命——市场开放期间全天候为您服务。",
  "mt5PlatformPage.faq.items": [
    {
      q: "什么是MetaTrader 5?",
      a: "MetaTrader 5(MT5)是MT4更新、更先进的继任者,提供扩展的订单类型、额外时间周期、内置经济日历,以及除Forex之外更广泛资产类别的支持——包括股票、大宗商品和指数,具体取决于您的经纪商提供的服务。",
    },
    {
      q: "MT4和MT5有什么区别?",
      a: "MT5提供更多内置技术指标和时间周期、支持多线程回测的高级策略测试器、集成经济日历,以及对冲和净额结算账户模式。MT4仍因其简洁性、较低资源占用以及最大的社区EA和指标库而广受欢迎。两者并无绝对优劣——选择取决于您更看重MT4的简洁与EA生态,还是MT5更广泛的工具集和多资产支持。",
    },
    {
      q: "我可以在MT5上运行智能交易系统(EA)吗?",
      a: "可以。MT5支持以MQL5编写的智能交易系统,但MQL5与MQL4代码不直接兼容——为MT4构建的EA和自定义指标通常需要重写或转换才能在MT5上运行。",
    },
    {
      q: "MT5是否支持对冲?",
      a: "支持。MT5同时支持净额结算和对冲账户类型。启用对冲模式后,您可以在同一品种上同时持有多个多头和空头头寸——适用于网格交易、锁仓对冲及多时间周期头寸管理等高级策略。请联系support@gtcfx.com确认您的账户类型支持哪种模式。",
    },
    {
      q: "MT5可在哪些设备上使用?",
      a: "MT5提供桌面应用程序(Windows)、可通过任何浏览器访问且无需下载的网页版,以及适用于iOS和Android的移动应用——各设备间实时同步。",
    },
    {
      q: "我应该选择MT5而不是MT4吗?",
      a: "这取决于您的交易风格。如果您依赖特定的MT4专用EA,或更喜欢MT4更轻量、简洁的界面,MT4可能更适合您。如果您需要更广泛的可交易品种、更快的回测或更高级的订单类型,MT5通常是更强的选择。许多交易者会根据策略同时使用两个平台。",
    },
  ],
  "mt5PlatformPage.cta.heading": "下载MT5。\n开启您的交易之旅。",
  "mt5PlatformPage.cta.sub":
    "下一代多资产平台。为专业交易者打造的执行基础设施。您与市场之间,仅隔着一次免费下载。",
  "mt5PlatformPage.cta.primaryLabel": "下载MT5 —— 免费",
};
