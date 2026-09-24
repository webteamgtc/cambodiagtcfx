import { notFound } from "next/navigation";

export default async function LegacyEnIntlFaPage({ params }) {
  const { locale } = await params;
  if (locale !== "en-intl") notFound();

  notFound();
}
