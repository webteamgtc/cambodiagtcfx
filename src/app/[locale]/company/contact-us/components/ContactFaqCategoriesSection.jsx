"use client";

import {
  FiDatabase,
  FiDollarSign,
  FiUsers,
  FiTag,
  FiMonitor,
  FiMousePointer,
  FiSmartphone,
  FiLock,
} from "react-icons/fi";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const categories = [
  { icon: FiDatabase, key: "funding" },
  { icon: FiDollarSign, key: "withdrawals" },
  { icon: FiUsers, key: "openingAccount" },
  { icon: FiTag, key: "pricing" },
  { icon: FiMonitor, key: "metatrader" },
  { icon: FiMousePointer, key: "demo" },
  { icon: FiSmartphone, key: "mobile" },
  { icon: FiLock, key: "passwords" },
];

function CategoryCard({ cat, t }) {
  return (
    <a
      href="#"
      className="flex items-center gap-4 rounded-2xl border border-[#e8ecf8] bg-white px-5 py-5 transition hover:shadow-md hover:border-[#d0d8e8] hover:no-underline"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e8ecf8] text-[#3347a8]">
        <cat.icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="text-[15px] font-medium text-[#02002f]">{t(`items.${cat.key}`)}</span>
    </a>
  );
}

export default function ContactFaqCategoriesSection() {
  const t = usePathTranslation("contactUsPage.faqCategories");

  return (
    <section className="relative py-10 md:py-16" style={{ backgroundColor: "#F8F9FC" }}>
      <div className="container">
        <div className="">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "Contact Us")}
              </span>
              <h2 className="HeadingH1 mt-5 text-black">
                {t("title", "Explore FAQ Categories")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Multiple ways to reach our team — pick the one that suits you best and get the help you need instantly."
                )}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile Carousel */}
          <div className="mt-8 sm:hidden">
            <MobilePeekCarousel
              items={categories}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(cat) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <CategoryCard cat={cat} t={t} />
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="mt-12 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, index) => (
              <FadeInSection key={cat.key} delay={index * 0.08}>
                <CategoryCard cat={cat} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
