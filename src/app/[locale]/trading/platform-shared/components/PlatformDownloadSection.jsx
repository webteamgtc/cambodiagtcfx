"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { FiArrowRight } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function PlatformIcon({ type }) {
  const common = "h-5 w-5";
  if (type === "windows") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    );
  }
  if (type === "mac") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (type === "ios") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0225 3.503c-1.4655-.669-3.1083-1.041-4.8395-1.041-1.7442 0-3.3992.3784-4.8742 1.0575L4.4982 5.4665a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9909 3.4475C2.1224 11.5855 0 15.3285 0 19.3959h24c0-4.0674-2.1224-7.8104-5.769-9.0745" />
    </svg>
  );
}

function DownloadCard({ item, index, t , data}) {
  return (
    <FadeInSection delay={index * 0.08}>
      <div className="group flex h-full flex-col rounded-2xl border border-[#E1E7F6] bg-white p-6 transition-colors duration-300 hover:border-primary hover:bg-primary md:p-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F2F8] text-primary transition-colors group-hover:bg-white/15 group-hover:text-white">
          <PlatformIcon type={item.icon} />
        </span>
        <h3 className="HeadingH5 mt-5 font-semibold text-[#000] transition-colors group-hover:text-white">
          {t(`items.${index}.platform`, item.platform)}
        </h3>
        <p className="TextSmall mt-1 text-[#999] transition-colors group-hover:text-white/80">
          {t(`items.${index}.version`, item.version)}
        </p>
        <p className="Text mt-3 font-normal leading-[1.7] text-[#666] transition-colors group-hover:text-white/85">
          {t(`items.${index}.description`, item.description)}
        </p>
        <div className="mt-auto pt-5">
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-sm font-medium text-[#000] transition hover:border-primary hover:no-underline group-hover:border-white group-hover:bg-white group-hover:text-primary"
          >
            {t(`items.${index}.cta`, item.cta)}
            {!item.external && <FiArrowRight className="h-3.5 w-3.5" />}
          </a>
        </div>
      </div>
    </FadeInSection>
  );
}

export default function PlatformDownloadSection({ data }) {
  const t = usePathTranslation(`${data.i18nKey}.download`);

  return (
    <section className="bg-[#F8F9FC] py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-10 text-center md:mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", "Cross-Device")}</p>
              <h2 className="HeadingH1 mt-3">
                <span className="text-[#000]">{t("headingStart", "Trade from")}</span>{" "}
                <span className="text-[#293B93]">{t("headingHighlight", "anywhere.")}</span>
              </h2>
              <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">
                {t("intro", "Your portfolio doesn't sleep, and neither should your access to it. {platform} syncs seamlessly across desktop, mobile, and tablet — pick up exactly where you left off, on any device.").replace("{platform}", data.platform)}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile carousel */}
          <div className="lg:hidden">
            <MobilePeekCarousel
              items={data.downloads}
              renderItem={(item, index) => (
                <div className="px-1 pb-2">
                  <DownloadCard item={item} index={index} t={t} data={data} />
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden lg:grid grid-cols-4 gap-5">
            {data.downloads.map((item, index) => (
              <DownloadCard key={item.platform} item={item} index={index} t={t} data={data} />
            ))}
          </div>

 
        </div>
      </div>
    </section>
  );
}
