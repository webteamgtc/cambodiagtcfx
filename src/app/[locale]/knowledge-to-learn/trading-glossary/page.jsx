import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import GlossaryHeader from "./components/GlossaryHeader";
import GlossarySearchBar from "./components/GlossarySearchBar";
import AlphabetFilter from "./components/AlphabetFilter";
import CategoryIcons from "./components/CategoryIcons";
import TrendingGlossary from "./components/TrendingGlossary";
import GlossaryCtaSection from "./components/GlossaryCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "knowledge-to-learn/trading-glossary",
    path: "knowledge-to-learn/trading-glossary",
    fallbackTitle: "Trading Glossary - GTC FX",
    fallbackDescription:
      "Explore our trading glossary for definitions of financial terms, abbreviations, and trading concepts.",
  });
}

export default async function TradingGlossaryPage({ params }) {
  const { locale } = await params;

  return (
    <>
    
      <GlossaryHeader />
      <GlossarySearchBar />
      <AlphabetFilter locale={locale} />
      <CategoryIcons />
      <TrendingGlossary locale={locale} />
      <GlossaryCtaSection locale={locale} />
    </>
  );
}
