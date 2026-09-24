'use client'
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function MarketAwardsSection({ data, locale = "en" }) {
  const t = usePathTranslation("marketsShared.awardsSection");
  const ta = usePathTranslation(`${data.i18nKey}.awards`);

  return (
    <section className=" py-10 md:py-16"
      style={{
        background: "linear-gradient(116deg, #F8F9FC -1.07%, rgba(248, 249, 252, 0.40) 66.3%)"
      }}
    >

      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
          <h2 className="HeadingH1 mx-auto font-semibold text-[#000]">{t("title", "Recognized Excellence")}</h2>
          <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
            {t("sub", "Honoured by industry bodies and trusted by traders across the globe.")}
          </p>
          </FadeInSection>
          {/* Mobile carousel */}
          <div className="md:hidden mt-12">
            <MobilePeekCarousel
              items={data.awards}
              renderItem={(award, index) => (
                <div className="px-1 pb-2">
                  <article className="flex min-h-[220px] flex-col rounded-[20px] bg-[#F0F3FE] px-6 py-8 text-center">
                    <div className="flex-1" aria-hidden />
                    <div className="flex flex-col items-center">
                      <h3 className="HeadingH5 font-semibold leading-[1.3] text-[#000]">
                        {ta(`${index}.title`, award.title)}
                      </h3>
                      <p className="TextSmall mt-2 font-normal text-[#9AA3C6]">
                        {ta(`${index}.source`, award.source ?? award.description)}
                      </p>
                      {award.year ? (
                        <span className="TextSmall mt-5 inline-flex min-w-[52px] items-center justify-center rounded-full bg-[#293B93] px-4 py-1.5 font-semibold text-white">{award.year}</span>
                      ) : null}
                    </div>
                  </article>
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden md:grid mt-12 gap-4 md:grid-cols-3">
            {data.awards.map((award, index) => (
              <div key={index}>
              <FadeInSection delay={index * 0.2}>
              <article
                className="flex min-h-[220px] flex-col rounded-[20px] bg-[#F0F3FE] px-6 py-8 text-center md:min-h-[300px] md:px-8 md:py-10"
              >
                <div className="flex-1" aria-hidden />

                <div className="flex flex-col items-center">
                  <h3 className="HeadingH5 font-semibold leading-[1.3] text-[#000]">
                    {ta(`${index}.title`, award.title)}
                  </h3>

                  <p className="TextSmall mt-2 font-normal text-[#9AA3C6]">
                    {ta(`${index}.source`, award.source ?? award.description)}
                  </p>

                  {award.year ? (
                    <span className="TextSmall mt-5 inline-flex min-w-[52px] items-center justify-center rounded-full bg-[#293B93] px-4 py-1.5 font-semibold text-white">
                      {award.year}
                    </span>
                  ) : null}
                  </div>
                </article>
              </FadeInSection>
              </div>
            ))}
          </div>

          <Link
            href={localizedHref(locale, "/company/awards")}
            className="TextSmall mx-auto mt-8 inline-flex h-11 items-center justify-center rounded-full border border-[#293B93] bg-transparent px-8 font-medium text-[#293B93] transition-colors hover:bg-[#F6F8FF]"
          >
            {t("viewAll", "View all awards")}
          </Link>
        </div>
      </div>
    </section>
  );
}
