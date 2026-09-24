import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { localizedHref } from "@/i18n/localizedHref";
import Button from "@/app/[locale]/components/common/Button";

const HERO_BG_SRC = "/platform/platform.webp";

const REGISTER_HREF = "/live-account-application";

export default function PlatformHeroSection({ locale = "en" }) {
  return (
    <section className="relative overflow-hidden bg-[url('/platform/platform.webp')] bg-cover bg-center">
    
      <div className="container py-16 lg:py-36">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="HeadingH1 font-bold text-[#111827]">
            GTCFX Platform Guides
          </h1>

          {/* Subtitle with blue underline accent */}
          <p className="TextRegular mt-6 max-w-xl leading-relaxed text-[#666666]">
            <span
              className=""
            >
              Get the most from your GTCFX account, and discover everything you
              need to know about our platform&apos;s tools and features
            </span>
          </p>

        <div className="mt-6 flex flex-col items-center justify-start gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow arrowPosition="right">
                    Open Live Account
                  </Button>
                  
                </div>
        </div>
      </div>
    </section>
  );
}
