import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import Image from "next/image";
import DepositHeroSection from "./components/DepositHeroSection";
import DepositValueBarSection from "./components/DepositValueBarSection";
import DepositPaymentMethodsSection from "./components/DepositPaymentMethodsSection";
import DepositStepsSection from "./components/DepositStepsSection";
import DepositProtectionSection from "./components/DepositProtectionSection";
import DepositCtaSection from "./components/DepositCtaSection";

const HERO_BG_SRC = "/new-design/about-us/bg.webp";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "deposit",
    path: "trading/deposit",
    fallbackTitle: "Deposit Funds | GTCFX Trading",
    fallbackDescription:
      "Fund your GTCFX account instantly with 10+ payment methods, zero platform deposit fees, and institutional-grade fund protection.",
  });
}

export default async function DepositPage({ params }) {
  const { locale } = await params;

  return (
    <>
      <div className="relative overflow-hidden bg-[#F8F9FC]">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <Image
            src={HERO_BG_SRC}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(248,249,252,0.2) 0%, rgba(248,249,252,0.92) 60%, #F8F9FC 100%)",
            }}
          />
        </div>

        <DepositHeroSection />
        {/* <DepositValueBarSection /> */}
      </div>
      <div className="relative">
        <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
          style={{
            opacity: 0.7,
            background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
          }}
        >
        </div>

        <DepositPaymentMethodsSection />
        <DepositStepsSection />
        <DepositProtectionSection />
      </div>
      <DepositCtaSection />
    </>
  );
}
