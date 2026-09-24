import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import AccountOptionsHeroSection from "./components/AccountOptionsHeroSection";
import AccountOptionsFeaturesSection from "./components/AccountOptionsFeaturesSection";
import AccountOptionsPromoSection from "./components/AccountOptionsPromoSection";
import AccountOptionsFaqSection from "./components/AccountOptionsFaqSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "accountOptions",
    path: "account-options",
    fallbackTitle: "Account Options | GTCFX Trading Accounts",
    fallbackDescription:
      "Explore GTCFX account options — Standard, ECN, VIP, demo, PAMM/MAM, and more. Find the perfect trading account for your style and goals.",
  });
}

export default async function AccountOptionsPage() {
  return (
    <>
      <AccountOptionsHeroSection />
      <AccountOptionsFeaturesSection />
      <AccountOptionsPromoSection />
      <AccountOptionsFaqSection />
    </>
  );
}
