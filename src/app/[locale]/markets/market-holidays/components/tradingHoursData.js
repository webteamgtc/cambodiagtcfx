export const TRADING_HOURS_SAMPLE_DATA = {
  FX: [
    {
      category: "Majors",
      Mon: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Tue: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Wed: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Thu: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Fri: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
    },
    {
      category: "Cross & Exotics",
      Mon: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Tue: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Wed: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Thu: { pricing: "00:00 - 23:59", trading: "00:01 - 23:59" },
      Fri: { pricing: "00:00 - 23:59", trading: "00:01 - 23:55" },
    },
    {
      category: "JPY Symbols",
      Mon: { pricing: "00:03 - 23:59", trading: "00:08 - 23:55" },
      Tue: { pricing: "00:03 - 23:59", trading: "00:05 - 23:55" },
      Wed: { pricing: "00:03 - 23:59", trading: "00:05 - 23:55" },
      Thu: { pricing: "00:03 - 23:59", trading: "00:05 - 23:55" },
      Fri: { pricing: "00:03 - 23:59", trading: "00:05 - 23:55" },
    },
  ],
  "Gold & Silver": [
    {
      category: "GOLD",
      Mon: { pricing: "01:00 - 24:00", trading: "01:05 - 23:59" },
      Tue: { pricing: "01:00 - 24:00", trading: "01:01 - 23:59" },
      Wed: { pricing: "01:00 - 24:00", trading: "01:01 - 23:59" },
      Thu: { pricing: "01:00 - 24:00", trading: "01:01 - 23:59" },
      Fri: { pricing: "01:00 - 24:00", trading: "01:01 - 23:55" },
    },
    {
      category: "SILVER",
      Mon: { pricing: "01:00 - 23:59", trading: "01:05 - 23:55" },
      Tue: { pricing: "01:00 - 23:59", trading: "01:01 - 23:55" },
      Wed: { pricing: "01:00 - 23:59", trading: "01:01 - 23:55" },
      Thu: { pricing: "01:00 - 23:59", trading: "01:01 - 23:55" },
      Fri: { pricing: "01:00 - 23:59", trading: "01:01 - 23:50" },
    },
  ],
  "Crude Oil": [
    {
      category: "BRNUSD",
      Mon: { pricing: "01:00 - 23:59", trading: "01:05 - 23:59" },
      Tue: { pricing: "03:00 - 23:59", trading: "03:01 - 23:59" },
      Wed: { pricing: "03:00 - 23:59", trading: "03:01 - 23:59" },
      Thu: { pricing: "03:00 - 23:59", trading: "03:01 - 23:59" },
      Fri: { pricing: "03:00 - 23:59", trading: "03:01 - 23:59" },
    },
    {
      category: "WTIUSD",
      Mon: { pricing: "01:00 - 24:00", trading: "01:05 - 23:59" },
      Tue: { pricing: "01:00 - 24:00", trading: "01:01 - 23:55" },
      Wed: { pricing: "01:00 - 24:00", trading: "01:01 - 23:55" },
      Thu: { pricing: "01:00 - 24:00", trading: "01:01 - 23:55" },
      Fri: { pricing: "01:00 - 23:59", trading: "01:01 - 23:59" },
    },
  ],
  Crypto: [
    {
      category: "Crypto",
      Mon: { pricing: "00:00 - 24:00", trading: "00:01 - 24:00" },
      Tue: { pricing: "00:00 - 24:00", trading: "00:01 - 24:00" },
      Wed: { pricing: "00:00 - 24:00", trading: "00:01 - 24:00" },
      Thu: { pricing: "00:00 - 24:00", trading: "00:01 - 24:00" },
      Fri: { pricing: "00:00 - 24:00", trading: "00:01 - 24:00" },
    },
  ],
  "Cash Indices": [
    {
      category: "AUS200c",
      Mon: { pricing: "02:50-09:30,10:10-23:59", trading: "02:51-09:30,10:11-23:57" },
      Tue: { pricing: "02:50-09:30,10:10-23:59", trading: "02:51-09:30,10:11-23:57" },
      Wed: { pricing: "02:50-09:30,10:10-23:59", trading: "02:51-09:30,10:11-23:57" },
      Thu: { pricing: "02:50-09:30,10:10-23:59", trading: "02:51-09:30,10:11-23:57" },
      Fri: { pricing: "00:50-08:30,09:10-22:57", trading: "00:51-08:30,09:11-22:57" },
    },
    {
      category: "CN50c",
      Mon: { pricing: "04:00-13:10,22:00-23:45", trading: "04:02-13:10,22:00-23:43" },
      Tue: { pricing: "04:00-13:10,22:00-23:45", trading: "04:00-13:10,22:00-23:45" },
      Wed: { pricing: "04:00-13:10,22:00-23:45", trading: "04:02-13:10,22:00-23:43" },
      Thu: { pricing: "04:00-13:10,22:00-23:45", trading: "04:02-13:10,22:00-23:43" },
      Fri: { pricing: "04:00-13:10,22:00-23:45", trading: "04:02-13:10,22:00-23:43" },
    },
    {
      category: "EU50c",
      Mon: { pricing: "03:15-22:59", trading: "03:16-22:56" },
      Tue: { pricing: "03:15-22:59", trading: "03:16-22:56" },
      Wed: { pricing: "03:15-22:59", trading: "03:16-22:56" },
      Thu: { pricing: "03:15-22:59", trading: "03:16-22:56" },
      Fri: { pricing: "03:15-22:59", trading: "03:16-22:56" },
    },
    {
      category: "GER40c",
      Mon: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Tue: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Wed: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Thu: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Fri: { pricing: "01:00-23:59", trading: "01:01-23:58" },
    },
    {
      category: "HK50c",
      Mon: { pricing: "04:15-07:00,08:00-13:10,15:22-00:00", trading: "04:18-07:00,08:00-11:30,12:15-21:59" },
      Tue: { pricing: "04:15-07:00,08:00-13:10,15:22-00:00", trading: "04:18-07:00,08:00-11:30,12:15-21:59" },
      Wed: { pricing: "04:15-07:00,08:00-13:10,15:22-00:00", trading: "04:18-07:00,08:00-11:30,12:15-21:59" },
      Thu: { pricing: "04:15-07:00,08:00-13:10,15:22-00:00", trading: "04:18-07:00,08:00-11:30,12:15-21:59" },
      Fri: { pricing: "04:15-07:00,08:00-13:10,15:22-00:00", trading: "04:18-07:00,08:00-11:30,12:15-21:56" },
    },
    {
      category: "JPN225c",
      Mon: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Tue: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Wed: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Thu: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Fri: { pricing: "01:00-23:56", trading: "01:01-23:56" },
    },
    {
      category: "UK100c",
      Mon: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Tue: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Wed: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Thu: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Fri: { pricing: "01:00-23:57", trading: "01:01-23:57" },
    },
    {
      category: "US30c",
      Mon: { pricing: "01:00-24:00", trading: "01:01-23:59" },
      Tue: { pricing: "01:00-24:00", trading: "01:01-23:59" },
      Wed: { pricing: "01:00-24:00", trading: "01:01-23:59" },
      Thu: { pricing: "01:00-24:00", trading: "01:01-23:59" },
      Fri: { pricing: "01:00-23:57", trading: "01:01-23:56" },
    },
    {
      category: "US500c",
      Mon: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Tue: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Wed: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Thu: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Fri: { pricing: "01:00-23:57", trading: "01:01-23:56" },
    },
    {
      category: "USTECHc",
      Mon: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Tue: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Wed: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Thu: { pricing: "01:00-23:59", trading: "01:01-23:58" },
      Fri: { pricing: "01:00-23:56", trading: "01:01-23:56" },
    },
  ],
  Stocks: [
    {
      category: "US Stocks",
      Mon: { pricing: "16:30 - 23:00", trading: "16:31 - 23:00" },
      Tue: { pricing: "16:30 - 23:00", trading: "16:31 - 23:00" },
      Wed: { pricing: "16:30 - 23:00", trading: "16:31 - 23:00" },
      Thu: { pricing: "16:30 - 23:00", trading: "16:31 - 23:00" },
      Fri: { pricing: "16:30 - 22:59", trading: "16:31 - 22:59" },
    },
    {
      category: "EU Stocks",
      Mon: { pricing: "10:00 - 19:29", trading: "10:01 - 19:29" },
      Tue: { pricing: "10:00 - 19:29", trading: "10:01 - 19:29" },
      Wed: { pricing: "10:00 - 19:29", trading: "10:01 - 19:29" },
      Thu: { pricing: "10:00 - 19:29", trading: "10:01 - 19:29" },
      Fri: { pricing: "10:00 - 19:29", trading: "10:01 - 19:29" },
    },
    {
      category: "Asia Stocks",
      Mon: { pricing: "03:30 - 07:00, 08:00 - 11:00", trading: "03:30 - 07:00, 08:00 - 11:00" },
      Tue: { pricing: "03:30 - 07:00, 08:00 - 11:00", trading: "03:30 - 07:00, 08:00 - 11:00" },
      Wed: { pricing: "03:30 - 07:00, 08:00 - 11:00", trading: "03:30 - 07:00, 08:00 - 11:00" },
      Thu: { pricing: "03:30 - 07:00, 08:00 - 11:00", trading: "03:30 - 07:00, 08:00 - 11:00" },
      Fri: { pricing: "03:30 - 07:00, 08:00 - 11:00", trading: "03:30 - 07:00, 08:00 - 11:00" },
    },
  ],
};

const TAB_TO_CATEGORY = {
  fx: "FX",
  goldSilver: "Gold & Silver",
  crudeOil: "Crude Oil",
  crypto: "Crypto",
  cashIndices: "Cash Indices",
  stocks: "Stocks",
};

const DAY_PROPS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function getTradingHoursRows(tabKey) {
  const category = TAB_TO_CATEGORY[tabKey];
  const items = TRADING_HOURS_SAMPLE_DATA[category] || [];

  return items.map((item) => ({
    symbol: item.category,
    times: DAY_PROPS.map((day) => ({
      pricing: item[day]?.pricing ?? "—",
      trading: item[day]?.trading ?? "—",
    })),
  }));
}
