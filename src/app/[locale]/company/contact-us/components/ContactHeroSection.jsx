"use client";

import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function ContactHeroSection({ locale = "en" }) {
  const t = usePathTranslation("contactUsPage.hero");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/breadcamp/bg-cover.webp')" }}
    >
      

    

      <div className="container relative z-10 min-w-0 max-w-full">
        <FadeInSection>
          <div className="mx-auto flex max-w-4xl flex-col items-center py-10 text-center md:py-20 xl:py-28">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e8ecf8] px-4 py-2 text-sm font-medium text-[#3347a8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3347a8]"></span>
              {t("badge", "24/7 Multilingual Support Available")}
            </div>

            {/* Heading */}
            <h1 className="text-[32px] font-bold leading-[1.2] tracking-tight text-[#02002f] md:text-[48px] lg:text-[56px]">
              {t("titleLine1", "Always Here for You,")}
              <br />
              <span className="bg-gradient-to-r from-[#293B93] to-[#4f5fba] bg-clip-text text-transparent">
                {t("titleLine2", "Guarding Every Trade")}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5a5a6e] md:text-lg">
              {t(
                "description",
                "Our dedicated support team is available around the clock to assist you with any questions, technical issues, or account inquiries across multiple channels and languages."
              )}
            </p>

        
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
