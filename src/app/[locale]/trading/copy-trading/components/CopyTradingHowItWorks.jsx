"use client";

import clsx from "clsx";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const STEPS = [
  { key: "one", step: "01" },
  { key: "two", step: "02", featured: true },
  { key: "three", step: "03" },
];

function HowItWorksStepCard({ step, title, description, featured = false, isMobile = false }) {
  return (
    <article
      className={clsx(
        "relative flex h-full flex-col transition p-3 md:p-7",
        featured &&
        "md:scale-[1.04]  lg:scale-[1.06]"
      )}
      style={{
        borderRadius: "20px",
        border: "1px solid #E8EDF7",
        background: "#F9FBFF",
        boxShadow: isMobile ? "none" : "0 4px 30px 0 rgba(41, 59, 147, 0.10)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {/* <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#293B93]">
            STEP {step}
          </p> */}
          {/* <span
            className="mt-0.5 block h-[3px] w-10 rounded-full bg-[#B48755]"
            aria-hidden
          /> */}
        </div>

        <span className="HeadingH1 font-bold leading-none text-[#293B93]">
          {step}
        </span>
      </div>

      <h3 className="HeadingH5 mt-6 font-semibold text-[#000032]">{title}</h3>

      <p className="TextSmall mt-2 flex-1 !font-normal leading-[1.5] text-[#7C86A0]">
        {description}
      </p>
    </article>
  );
}

export default function CopyTradingHowItWorks() {
  const t = usePathTranslation("copyTradingPage.howItWorks");

  const stepCards = STEPS.map((item) => ({
    ...item,
    title: t(`steps.${item.key}.title`),
    description: t(`steps.${item.key}.description`),
  }));

  return (
    <section className="bg-[#fff] py-12 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-[#F7F9FF] px-4 py-2 text-sm font-medium text-[#293B93]">
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#12BA82" />
              </svg>
              {t("badge")}
            </span>

            <h2 className="HeadingH1 mx-auto mt-5 font-semibold leading-[1.2] md:mt-6">
              {t("titleStart")}{" "}
              <span className="text-[#000032]">{t("titleHighlight")}</span>
            </h2>

            <p className="Text mx-auto mt-3 font-normal leading-[1.4] text-[#4E4E4E]">
              {t("description")}
            </p>
          </div>

          <div className="mt-10 md:mt-12">
            <div className="md:hidden">
              <MobilePeekCarousel
                items={stepCards}
                showArrows
                className="w-full min-w-0"
                trackClassName="-mx-4 px-4 min-w-0"
                slideClassName="!h-auto"
                renderItem={(item) => (
                  <div className="w-full min-w-0 max-w-full px-1">
                    <HowItWorksStepCard
                      step={item.step}
                      title={item.title}
                      description={item.description}
                      featured={item.featured}
                      isMobile={true}
                    />
                  </div>
                )}
              />
            </div>

            <div className="hidden items-center gap-6 md:grid md:grid-cols-3 lg:gap-8">
              {stepCards.map((item) => (
                <HowItWorksStepCard
                  key={item.key}
                  step={item.step}
                  title={item.title}
                  description={item.description}
                  featured={item.featured}
                  isMobile={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
