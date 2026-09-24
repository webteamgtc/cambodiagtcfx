"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import Image from "next/image";
import Link from "next/link";
import { usePathTranslation, useLocale } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { useMarketOverviewRows } from "../hooks/useMarketOverviewRows";

function MarketIcon({ src, alt }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF1FB]">
      <Image src={src} alt={alt} width={20} height={20} className="h-5 w-5 object-contain" />
    </span>
  );
}

export default function AssetOverviewSection({ data }) {
  const { overview } = data;
  const locale = useLocale();
  const t = usePathTranslation(`${data.i18nKey}.overview`);
  const tc = usePathTranslation("marketsShared.overviewTable");
  const tr = usePathTranslation("marketsShared.overviewRows");
  const { rows } = useMarketOverviewRows(overview);
  const columns = [
    tc("market", "MARKET"),
    tc("instruments", "INSTRUMENTS"),
    tc("spreadFrom", "SPREAD FROM"),
    tc("maxLeverage", "MAX LEVERAGE"),
    tc("tradingHours", "TRADING HOURS"),
  ];

  return (
    <section className="py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCE2F6] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#293B93]" aria-hidden />
              <span className="TextSmall font-normal text-[#293B93]">{t("eyebrow", overview.eyebrow ?? "Market overview")}</span>
            </span>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h2 className="HeadingH1 mx-auto mt-4 font-semibold text-[#000]">{t("title", overview.title)}</h2>
            <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">{t("sub", overview.sub)}</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="mt-12 overflow-hidden rounded-[20px] border border-[#E8EDFA] bg-white shadow-[0_8px_30px_rgba(41,59,147,0.06)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#293B93]">
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="TextSmall px-5 py-4 font-normal uppercase tracking-[0.08em] text-white md:px-6"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.key} className="border-b border-[#EEF2FC] last:border-b-0">
                        <td className="px-5 py-4 md:px-6">
                          <div className="flex items-center gap-3">
                            <MarketIcon src={row.icon} alt={row.market} />
                            <span className="Text font-medium text-[#000]">{tr(`items.${row.key}.market`, row.market)}</span>
                          </div>
                        </td>
                        <td className="TextSmall px-5 py-4 font-normal text-[#000] md:px-6">
                          {tr(`items.${row.key}.instruments`, row.instruments)}
                        </td>
                        <td className="TextSmall px-5 py-4 font-normal text-[#000] md:px-6">
                          {tr(`items.${row.key}.spreadFrom`, row.spreadFrom)}
                        </td>
                        <td className="TextSmall px-5 py-4 font-normal text-[#000] md:px-6">
                          {tr(`items.${row.key}.maxLeverage`, row.maxLeverage)}
                        </td>
                        <td className="px-5 py-4 md:px-6">
                          <div className="flex items-center justify-between gap-4">
                            <span className="TextSmall font-normal text-[#69729F]">
                              {tr(`items.${row.key}.tradingHours`, row.tradingHours)}
                            </span>
                            {row.mostPopular ? (
                              <span className="TextSmall shrink-0 rounded-full bg-[#EEF1FB] px-3 py-1 font-medium text-[#293B93]">
                                {tc("mostPopular", "Most Popular")}
                              </span>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="TextSmall mx-auto mt-5 max-w-3xl text-left font-normal leading-relaxed text-[#69729F] md:text-center">
              {tc(
                "leverageFootnote",
                "Max leverage shown is Tier 1 from our official schedule. Leverage reduces as position size increases."
              )}{" "}
              <Link
                href={localizedHref(locale, "/company/dynamic-leverage")}
                className="font-medium text-[#293B93] underline underline-offset-2 hover:no-underline"
              >
                {tc("leverageLink", "View full dynamic leverage")}
              </Link>
            </p>
          </FadeInSection>

        </div>
      </div>
    </section>
  );
}
