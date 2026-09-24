"use client";

import RevealOnScroll from "../../../components/RevealOnScroll";
import SectionEyebrow from "../../../components/common/SectionEyebrow";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const instruments = [
  {
    icon: "🏅",
    title: "Forex — FX Pairs",
    hours: "Mon-Fri: 00:00-23:59 GMT",
    status: "Open Now",
    statusColor: "green",
  },
  {
    icon: "🥇",
    title: "Metals — Gold & Silver",
    hours: "Mon-Fri: 00:00-23:59 GMT",
    status: "Open Now",
    statusColor: "green",
  },
  {
    icon: "🛢️",
    title: "Energies — Oil & Gas",
    hours: "Mon-Fri: 00:00-23:00 GMT",
    status: "Open Now",
    statusColor: "green",
  },
  {
    icon: "📊",
    title: "Cash Indices",
    hours: "Varies by exchange",
    status: "Most Open",
    statusColor: "orange",
  },
  {
    icon: "🌐",
    title: "Cryptocurrencies",
    hours: "24/7 — Always Open",
    status: "Always Open",
    statusColor: "green",
  },
  {
    icon: "🏛️",
    title: "US & EU Shares",
    hours: "NYSE, NASDAQ, LSE, XETRA",
    status: "Pre-Market",
    statusColor: "orange",
  },
];

const statusDotClass = {
  green: "bg-green-500",
  orange: "bg-orange-500",
};

const statusTextClass = {
  green: "text-green-600",
  orange: "text-orange-600",
};

export default function TradeableInstrumentsSection() {
  const t = usePathTranslation("marketHolidaysPage.instruments");

  return (
    <section
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: "#F8F9FC" }}
    >
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center">
            <SectionEyebrow className="tracking-[0.2em] text-xs">
              {t("eyebrow", "ASSET CLASSES")}
            </SectionEyebrow>
            <h2 className="HeadingH2 mt-3">
              {t("heading", "Tradeable Instruments")}
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl">
              {t("sub", "Access global markets across multiple asset classes with competitive spreads.")}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {instruments.map((instrument, index) => (
            <RevealOnScroll key={instrument.title} delay={index * 100}>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition hover:shadow-md h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f2fa] flex items-center justify-center text-xl shrink-0">
                    {instrument.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {t(`items.${index}.title`, instrument.title)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {t(`items.${index}.hours`, instrument.hours)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={[
                      "w-2 h-2 rounded-full",
                      statusDotClass[instrument.statusColor],
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-sm font-medium",
                      statusTextClass[instrument.statusColor],
                    ].join(" ")}
                  >
                    {t(`items.${index}.status`, instrument.status)}
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
