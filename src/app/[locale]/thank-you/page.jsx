import { getDictionary } from "@/i18n/request";
import ThankYouPageClient from "./ThankYouPageClient";
import { Suspense } from "react";
import InnerPageBanner from "../components/common/InnerPageBanner";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    path: "thank-you",
    fallbackTitle: "Thank You - GTC FX",
    fallbackDescription: "Your request has been received.",
  });
}

export default async function ThankYouPage({ params }) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);
  const content = dict?.thankYouLiveAccount?.content || {};

  return <Suspense fallback={null}>

     <ThankYouPageClient messages={content} />
      </Suspense>;
}