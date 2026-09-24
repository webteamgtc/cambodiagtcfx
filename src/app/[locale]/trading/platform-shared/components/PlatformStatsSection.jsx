"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function PlatformStatsSection({ data }) {
  const t = usePathTranslation(`${data.i18nKey}.stats`);

  return (
    <section className="bg-white py-6 md:py-8">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 divide-x divide-[#E1E7F6] rounded-2xl border border-[#E1E7F6] bg-white px-4 py-8 sm:grid-cols-4 md:px-8 md:py-10">
            {data.stats.map((s, index) => (
              <div key={index} className="flex flex-col items-center px-4 py-4 text-center md:px-8">
                <p className="HeadingH3 font-semibold text-[#293B93]">{s.value}</p>
                <p className="TextSmall mt-2 max-w-[160px] font-normal text-[#666]">{t(`${index}`, s.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
