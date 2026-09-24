"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { FiArrowRight, FiBookOpen, FiGlobe, FiPlay, FiTrendingUp } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const tutorialHighlights = [
  { icon: FiBookOpen, key: "tutorials" },
  { icon: FiGlobe, key: "languages" },
  { icon: FiTrendingUp, key: "tracks" },
];

function TutorialHighlight({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e4e9f2] bg-white text-[#3347a8] shadow-sm">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="HeadingH5 text-primary font-bold">{title}</h3>
        <p className="TextSmall mt-1 text-[#6b7280]">{description}</p>
      </div>
    </div>
  );
}

export default function FaqVideoTutorialsSection({ locale = "en" }) {
  const t = usePathTranslation("faqsPage.videoTutorials");

  return (
    <section className="bg-white pt-14 md:pt-16">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1fr)] lg:items-center lg:gap-14">
          <div className="max-w-xl ">
            <p className="TextSmall text-center md:text-left font-semibold text-[#293B93]">
              {t("eyebrow", "Visual Learning")}
            </p>

            <h2 className="HeadingH1 mt-2 text-center md:text-left text-primary ">
              {t("titleStart", "Learn faster with")}
              <br />
              {t("titleConnector", "our")} <span className="text-[#293B93]">{t("titleHighlight", "video tutorials")}</span>
            </h2>

            <p className="Text mt-5 max-w-lg text-center md:text-left">
              {t(
                "description",
                "Step-by-step walkthroughs from account opening to advanced trading techniques, all in less than 5 minutes per video."
              )}
            </p>

            <div className="mt-8 space-y-5">
              {tutorialHighlights.map((item) => (
                <TutorialHighlight
                  key={item.key}
                  icon={item.icon}
                  title={t(`highlights.${item.key}.title`)}
                  description={t(`highlights.${item.key}.description`)}
                />
              ))}
            </div>

            <Link
              href={localizedHref(locale, "/tutorial-videos")}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#293B93] px-5 py-3 text-white transition hover:bg-[#293a8c]"
            >
              <span className="TextButton">{t("cta", "Browse all videos")}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#293B93]">
                <FiArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="relative mx-auto flex min-h-[260px] w-full max-w-[620px] items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1f2f91] via-[#172882] to-[#091b63] shadow-[0_26px_70px_rgba(20,35,115,0.28)] md:min-h-[360px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/10 md:h-32 md:w-32">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 md:h-24 md:w-24">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#293B93] shadow-[0_12px_30px_rgba(255,255,255,0.18)] md:h-16 md:w-16">
                  <FiPlay className="ms-0.5 h-6 w-6 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
