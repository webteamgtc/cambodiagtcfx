"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { useState } from "react";
import { usePathTranslation } from "../../LocaleProvider";

const REGISTER_HREF = "/live-account-application";

const ADVANTAGE_ITEMS = [
  {
    key: "pamm",
    image: "/new-design/Trading/PAMM_Account.webp",
  },
  // {
  //   key: "mam",
  //   image: "/new-design/Trading/PAMM_Account.webp",
  // },
];

function AdvantageAccordionItem({ item, isActive, onActivate, t }) {
  const title = t(`items.${item.key}.title`);
  const description = t(`items.${item.key}.description`);
  const panelId = `advantage-panel-${item.key}`;
  const headerId = `advantage-header-${item.key}`;

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl transition-colors duration-500 ease-in-out",
        isActive ? "bg-[#F3F4F9]" : "bg-[#f0f2f7]"
      )}
    >
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isActive}
          aria-controls={panelId}
          onClick={onActivate}
          className={clsx(
            "flex w-full items-center px-6 py-5 text-left transition-colors duration-300 sm:px-8 sm:py-6",
            !isActive && "hover:bg-[#e8ecf4]"
          )}
        >
          <span className="HeadingH4 font-semibold leading-tight text-[#293B93]">
            {title}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={clsx(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none",
          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-8 pt-0 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
            <p className="TextSmall font-normal leading-[1.7] text-[#666666]">
              {description}
            </p>
            <Button
              href={REGISTER_HREF}
              external
              variant="brand"
              size="md"
              showArrow
              className="mt-7 sm:mt-8"
            >
              {t("cta", "Open Account")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvantageImageColumn({ item, t }) {
  const title = t(`items.${item.key}.title`);
  const imageAlt = t(`items.${item.key}.imageAlt`, title);

  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:h-full lg:max-w-none">
      <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={imageAlt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 90vw, 520px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TradingAdvantagesSection() {
  const t = usePathTranslation("tradingPage.advantagesSection");
  const [activeKey, setActiveKey] = useState("pamm");

  const activeItem =
    ADVANTAGE_ITEMS.find((item) => item.key === activeKey) ?? ADVANTAGE_ITEMS[0];

  return (
    <section className="overflow-x-hidden bg-white py-14 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h2 className="HeadingH1 text-center text-[#000]">
            {t("title", "Trading Advantages")}
          </h2>

          <div className="mt-10 md:mt-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8 xl:gap-12">
            <div className="space-y-4">
              {ADVANTAGE_ITEMS.map((item) => (
                <AdvantageAccordionItem
                  key={item.key}
                  item={item}
                  isActive={activeKey === item.key}
                  onActivate={() => setActiveKey(item.key)}
                  t={t}
                />
              ))}
            </div>

            <div className="mt-8 lg:sticky lg:top-24 lg:mt-0">
              <AdvantageImageColumn item={activeItem} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
