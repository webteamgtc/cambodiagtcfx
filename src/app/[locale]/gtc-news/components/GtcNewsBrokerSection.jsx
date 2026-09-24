"use client";

import Image from "next/image";
import Link from "next/link";
import GtcNewsSectionTitle from "./GtcNewsSectionTitle";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "../../LocaleProvider";

export default function GtcNewsBrokerSection({ locale = "en", posts = [] }) {
  const t = usePathTranslation("gtcNewsPage.broker");
  const featured = posts[0] ?? null;
  const headlines = posts.slice(1, 4);
  const allNewsHref = localizedHref(locale, "/gtc-news/favourite");

  const featuredTitle =
    featured?.title ||
    t(
      "featured.title",
      "GTCFX Golden Falcon Awards 2025: Global Trading Excellence Shines in Dubai"
    );
  const featuredDescription =
    featured?.excerpt ||
    featured?.subtitle ||
    t("featured.subtitle", "Global Trading Excellence Shines in Dubai");

  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="container">
        <div className="">
          <FadeInSection>
            <GtcNewsSectionTitle title={t("sectionTitle", "GTCFX $ BROKER NEWS")} />
          </FadeInSection>

          {posts.length === 0 ? (
            <FadeInSection delay={0.1}>
              <p className="mt-6 text-center text-[#69729F]">
                {t("emptyState", "No broker news available right now.")}
              </p>
            </FadeInSection>
          ) : (
            <FadeInSection delay={0.1}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
                {featured && (
                  <article className="relative overflow-hidden rounded-2xl">
                    <Link
                      href={localizedHref(locale, featured.href)}
                      className="relative block aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[420px] hover:no-underline"
                    >
                      <Image
                        src={featured.image}
                        alt={featuredTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#293B93] via-[#293B93]/80 to-[#293B93]/10" />
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-8">
                        <h3 className="text-lg font-bold leading-snug text-white md:text-xl lg:text-2xl">
                          {featuredTitle}
                        </h3>
                        {featuredDescription ? (
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/90 md:text-base">
                            {featuredDescription}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </article>
                )}

                <div className="flex flex-col">
                  {headlines.map((item, index) => (
                    <div
                      key={item.id ?? item.slug ?? index}
                      className="flex flex-1 flex-col justify-center border-b border-[#e5eaf4] py-5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      {(item.date || item.author) && (
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#69729F]">
                          {item.date}
                          {item.date && item.author ? (
                            <span className="mx-1">•</span>
                          ) : null}
                          {item.author}
                        </p>
                      )}
                      <h4 className="mt-2 text-base font-bold leading-snug text-[#000032] md:text-lg">
                        <Link
                          href={localizedHref(locale, item.href)}
                          className="hover:text-[#293B93] hover:no-underline"
                        >
                          {item.title ||
                            t(
                              `headlines.${index}.title`,
                              "GTCFX Stock Now Available to Trade with FxPro"
                            )}
                        </Link>
                      </h4>
                      {item.excerpt || item.subtitle ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#69729F]">
                          {item.excerpt || item.subtitle}
                        </p>
                      ) : null}
                    </div>
                  ))}
                  <Link
                    href={allNewsHref}
                    className="mt-3 w-fit text-sm font-medium text-[#293B93] underline underline-offset-2 hover:no-underline"
                  >
                    {t("allNewsLink", "All news")}
                  </Link>
                </div>
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  );
}
