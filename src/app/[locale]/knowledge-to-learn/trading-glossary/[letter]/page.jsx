import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import GlossaryLetterContent from "../components/GlossaryLetterContent";

export async function generateStaticParams() {
  return Array.from({ length: 26 }, (_, i) => ({
    letter: String.fromCharCode(97 + i),
  }));
}

export async function generateMetadata({ params }) {
  const { locale, letter } = await params;
  const title = `${letter.toUpperCase()} - Trading Glossary - GTC FX`;
  return getPageMetadata({
    locale,
    key: `knowledge-to-learn/trading-glossary/${letter}`,
    path: `knowledge-to-learn/trading-glossary/${letter}`,
    fallbackTitle: title,
    fallbackDescription: `Browse trading glossary terms starting with ${letter.toUpperCase()}.`,
  });
}

export default async function TradingGlossaryLetterPage({ params }) {
  const { locale, letter } = await params;

  if (!/^[a-z]$/.test(letter)) {
    notFound();
  }

  return <GlossaryLetterContent letter={letter} locale={locale} />;
}
