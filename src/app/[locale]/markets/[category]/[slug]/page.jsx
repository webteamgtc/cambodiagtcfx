import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import SymbolDetailPage from "../../market-shared/components/symbol-detail/SymbolDetailPage";
import {
  getCategoryConfig,
  isValidMarketCategory,
  getDisplaySymbol,
  slugToRawSymbol,
} from "../../market-shared/symbolDetailConfig";

export async function generateMetadata({ params }) {
  const { locale, category, slug } = await params;

  if (!isValidMarketCategory(category)) {
    return {};
  }

  const raw = slugToRawSymbol(slug);
  const display = getDisplaySymbol(raw);
  const categoryConfig = getCategoryConfig(category);

  return getPageMetadata({
    locale,
    key: category,
    path: `${categoryConfig.path}/${String(slug || "").toLowerCase()}`,
    overrideTitle: `Trade ${display} | ${categoryConfig.displayLabel} | GTCFX`,
    overrideDescription: `Live ${display} quote, chart, and trading specifications on GTCFX.`,
    fallbackTitle: `Trade ${display} | ${categoryConfig.displayLabel} | GTCFX`,
    fallbackDescription: `Live ${display} quote, chart, and trading specifications on GTCFX.`,
  });
}

export default async function MarketSymbolPage({ params }) {
  const { category, slug } = await params;

  if (!isValidMarketCategory(category)) {
    notFound();
  }

  return <SymbolDetailPage category={category} slug={slug} />;
}
