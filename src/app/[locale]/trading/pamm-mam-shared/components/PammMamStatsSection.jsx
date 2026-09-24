"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function PammMamStatsSection({ data }) {
  const { stats } = data;
  const t = usePathTranslation(`${data.i18nKey}.stats`);

  const icons = {
    infinite: (
      <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z" />
      </svg>
    ),
    percent: (
      <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.708.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
      </svg>
    ),
    platform: (
      <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v1a3 3 0 006 0v-1M3 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    managers: (
      <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 2a3 3 0 11-6 0 3 3 0 016 0zM3 19a3 3 0 116 0" />
      </svg>
    ),
  };

  return (
    <section className="bg-[#293B93] py-10">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col gap-3 ${index < stats.length - 1 ? "lg:border-r lg:border-white/20" : ""} px-4`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  {icons[stat.icon] || icons.managers}
                </div>
                <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                <p className="text-sm text-white/70">{t(`${index}`, stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
