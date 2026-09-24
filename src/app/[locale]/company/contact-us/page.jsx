import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import ContactHeroSection from "./components/ContactHeroSection";
import ContactFormSection from "./components/ContactFormSection";
import ContactChannelsSection from "./components/ContactChannelsSection";
import ContactFaqCategoriesSection from "./components/ContactFaqCategoriesSection";
import ContactGlobalPresenceSection from "./components/ContactGlobalPresenceSection";
import SupportCtaSection from "@/app/[locale]/components/common/SupportCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "contactUs",
    path: "company/contact-us",
    fallbackTitle: "Contact Us - GTC FX",
    fallbackDescription:
      "Get in touch with GTCFX. Our support team is ready to assist you with any questions about trading, accounts, or partnerships.",
  });
}

export default async function ContactUsPage({ params }) {
  const { locale } = await params;

  return (
    <>
      <ContactHeroSection locale={locale} />
      <ContactFormSection locale={locale} />
      <ContactChannelsSection />
      {/* <ContactFaqCategoriesSection /> */}
      <ContactGlobalPresenceSection />
      <SupportCtaSection locale={locale} />
    </>
  );
}
