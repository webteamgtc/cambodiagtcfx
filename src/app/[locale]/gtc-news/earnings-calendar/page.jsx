import { getDictionary } from "@/i18n/request";
import EarningsDividendsCalendar from "./components/EarningTable";
import EarningScreneer from "./components/EarningScreneer";
import MarginInfoPanel from "./components/MarginInfoPanel";
import EarningsFaq from "./components/EarningFaqs";
import EarningsCalendarHero from "./components/EarningCalenderHero";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "earningPage",
    path: "gtc-news/earnings-calendar",
    fallbackTitle: "Earnings Calendar - GTC FX",
    fallbackDescription: "Track upcoming earnings and dividends.",
  });
}

export default async function EarningsCalendarPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const earningsPage = dict.earningsPage || {};
  const earningsMarginPanel = dict.earningsMarginPanel || {};

  return (
    <div className="bg-white">
      <EarningsCalendarHero />
      <EarningsDividendsCalendar locale={locale} messages={earningsPage} />
      <EarningScreneer locale={locale} />
      <MarginInfoPanel messages={earningsMarginPanel} />
      <EarningsFaq />
    </div>
  );
}
