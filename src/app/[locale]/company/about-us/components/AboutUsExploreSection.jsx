"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import TextArrowLink from "@/app/[locale]/components/common/TextArrowLink";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { SHOW_CAREERS } from "@/config/featureFlags";
import Image from "next/image";

const CARD_BG_SRC = "/new-design/about-us/dots.svg";

function BrandIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="166" height="166" viewBox="0 0 166 166" fill="none">
      <ellipse cx="83.389" cy="83.0033" rx="13.1253" ry="13.1869" fill="#293B93" />
      <path opacity="0.8" d="M83.3896 48.5957C102.3 48.5957 117.634 63.9977 117.634 83.002C117.634 102.006 102.3 117.409 83.3896 117.409C64.4798 117.409 49.1465 102.006 49.1465 83.002C49.1466 63.9978 64.4799 48.5959 83.3896 48.5957Z" stroke="#293B93" />
      <path opacity="0.6" d="M83.3945 24.5488C115.523 24.5488 141.572 50.717 141.572 83.002C141.572 115.287 115.523 141.455 83.3945 141.455C51.266 141.455 25.2168 115.287 25.2168 83.002C25.2169 50.717 51.2661 24.549 83.3945 24.5488Z" stroke="#293B93" />
      <path opacity="0.4" d="M83.3877 0.5C128.735 0.5 165.5 37.4343 165.5 83C165.5 128.566 128.735 165.5 83.3877 165.5C38.0405 165.5 1.27539 128.566 1.27539 83C1.27539 37.4343 38.0405 0.50005 83.3877 0.5Z" stroke="#293B93" />
      <g opacity="0.4">
        <line x1="83.1074" y1="2.19582e-08" x2="83.1074" y2="166" stroke="#293B93" stroke-dasharray="4 6" />
        <line x1="165.225" y1="83.502" x2="-0.000183127" y2="83.5019" stroke="#293B93" stroke-dasharray="4 6" />
        <line y1="-0.5" x2="165.613" y2="-0.5" transform="matrix(0.70545 0.70876 -0.70545 0.70876 24.1934 24.3125)" stroke="#293B93" stroke-dasharray="4 6" />
        <line y1="-0.5" x2="165.613" y2="-0.5" transform="matrix(-0.70545 0.70876 -0.70545 -0.70876 141.025 24.3125)" stroke="#293B93" stroke-dasharray="4 6" />
      </g>
    </svg>
  );
}

function GlobalIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="166" height="166" viewBox="0 0 166 166" fill="none">
      <circle cx="83" cy="83" r="82.5" stroke="#293B93" />
      <path opacity="0.4" d="M83 51.9375C105.875 51.9375 126.562 55.4643 141.512 61.1494C148.988 63.9927 155.005 67.3664 159.144 71.0869C163.282 74.8075 165.5 78.8346 165.5 83.001C165.5 87.1673 163.282 91.1944 159.144 94.915C155.005 98.6356 148.988 102.009 141.512 104.853C126.562 110.538 105.875 114.064 83 114.064C60.1252 114.064 39.4383 110.538 24.4883 104.853C17.0115 102.009 10.9946 98.6356 6.85645 94.915C2.71831 91.1944 0.500034 87.1673 0.5 83.001C0.5 78.8346 2.71834 74.8075 6.85645 71.0869C10.9946 67.3664 17.0115 63.9927 24.4883 61.1494C39.4383 55.4643 60.1252 51.9375 83 51.9375Z" stroke="#293B93" />
      <path opacity="0.4" d="M114.844 83C114.844 105.875 111.317 126.562 105.632 141.512C102.789 148.988 99.4149 155.005 95.6943 159.144C91.9737 163.282 87.9466 165.5 83.7803 165.5C79.6139 165.5 75.5868 163.282 71.8662 159.144C68.1457 155.005 64.772 148.988 61.9287 141.512C56.2436 126.562 52.7168 105.875 52.7168 83C52.7168 60.1252 56.2436 39.4383 61.9287 24.4883C64.772 17.0115 68.1457 10.9946 71.8662 6.85645C75.5868 2.71831 79.6139 0.500034 83.7803 0.5C87.9466 0.5 91.9737 2.71834 95.6943 6.85645C99.4149 10.9946 102.789 17.0115 105.632 24.4883C111.317 39.4383 114.844 60.1252 114.844 83Z" stroke="#293B93" />
      <path opacity="0.4" d="M142.121 83C142.121 105.828 135.561 126.474 124.979 141.4C114.397 156.328 99.8235 165.5 83.7803 165.5C67.7372 165.5 53.1642 156.328 42.582 141.4C32.0008 126.474 25.4404 105.828 25.4404 83C25.4404 60.1717 32.0008 39.5257 42.582 24.5996C53.1642 9.6725 67.7372 0.50017 83.7803 0.5C99.8235 0.5 114.397 9.67236 124.979 24.5996C135.561 39.5257 142.121 60.1717 142.121 83Z" stroke="#293B93" />
      <path opacity="0.4" d="M83 54.2754C105.817 54.2754 126.49 61.5507 141.471 68.8379C148.959 72.4803 155.018 76.1229 159.204 78.8535C161.297 80.2187 162.921 81.3555 164.021 82.1504C164.511 82.5052 164.898 82.7918 165.175 83C164.898 83.2083 164.512 83.4965 164.021 83.8516C162.921 84.6464 161.297 85.7834 159.204 87.1484C155.018 89.8791 148.959 93.5217 141.471 97.1641C126.49 104.451 105.817 111.727 83 111.727C60.1828 111.727 39.51 104.451 24.5293 97.1641C17.0414 93.5217 10.9818 89.8791 6.7959 87.1484C4.70333 85.7834 3.07922 84.6464 1.97949 83.8516C1.48787 83.4962 1.10124 83.2083 0.824219 83C1.10119 82.7917 1.48829 82.5054 1.97949 82.1504C3.0792 81.3555 4.70324 80.2187 6.7959 78.8535C10.9818 76.1229 17.0413 72.4803 24.5293 68.8379C39.51 61.5507 60.1827 54.2754 83 54.2754Z" stroke="#293B93" />
      <circle cx="113.006" cy="49.0979" r="3.89671" fill="#293B93" />
      <circle cx="130.928" cy="105.211" r="3.89671" fill="#293B93" />
      <circle cx="47.5412" cy="56.8928" r="3.89671" fill="#293B93" />
      <circle cx="60.01" cy="116.901" r="3.89671" fill="#293B93" />
      <path opacity="0.4" d="M49.0977 56.8921L112.224 48.709L130.539 104.822" stroke="#293B93" stroke-dasharray="2 2" />
    </svg>
  );
}

function CareerIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="163" height="166" viewBox="0 0 163 166" fill="none">
      <rect x="0.5" y="34.915" width="161.963" height="130.585" rx="5.5" stroke="#293B93" />
      <path d="M115.904 34.9268V6C115.904 2.96255 113.442 0.500181 110.404 0.5H52.5625C49.5249 0.5 47.0625 2.96243 47.0625 6V34.9268H115.904Z" stroke="#293B93" />
      <line opacity="0.4" x1="14.1719" y1="52.1338" x2="142.721" y2="52.1338" stroke="#293B93" stroke-dasharray="2 2" />
      <line opacity="0.4" y1="84.5244" x2="162.963" y2="84.5244" stroke="#293B93" />
      <circle cx="81.4801" cy="84.5182" r="11.6402" fill="#293B93" />
      <g opacity="0.4">
        <circle cx="29.3535" cy="123.489" r="4.04878" fill="#293B93" />
        <rect x="17.707" y="105.769" width="22.2805" height="35.439" stroke="#293B93" />
        <circle cx="81.9863" cy="123.489" r="4.04878" fill="#293B93" />
        <rect x="70.3398" y="105.769" width="22.2805" height="35.439" stroke="#293B93" />
        <circle cx="134.623" cy="123.489" r="4.04878" fill="#293B93" />
        <rect x="122.977" y="105.769" width="22.2805" height="35.439" stroke="#293B93" />
      </g>
    </svg>
  );
}

function EventsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="166" height="159" viewBox="0 0 166 159" fill="none">
      <line opacity="0.7" y1="145.068" x2="166" y2="145.068" stroke="#293B93" />
      <path d="M139.382 119.957H27.4658L83.4238 7.92871L139.382 119.957Z" stroke="#293B93" />
      <path opacity="0.4" d="M122.435 119.743H44.418L83.4258 40.292L122.435 119.743Z" stroke="#293B93" />
      <rect opacity="0.7" x="61.793" y="119.68" width="42.4154" height="28.7949" stroke="#293B93" />
      <rect opacity="0.4" x="66.8984" y="119.68" width="32.2" height="28.7949" stroke="#293B93" />
      <circle cx="30.6473" cy="145.569" r="3.40513" fill="#293B93" />
      <circle cx="136.206" cy="145.569" r="3.40513" fill="#293B93" />
      <circle cx="83.4272" cy="7.66154" r="7.66154" fill="#293B93" />
    </svg>
  );
}

function ExploreCard({ label, title, description, href, icon: Icon, learnMore }) {
  return (
    <article className="interactive-card group flex h-full min-w-0 flex-col overflow-hidden rounded-[10px] border border-[#E1E7F6] bg-white transition-shadow duration-200">
      <div className="relative flex min-h-[190px] items-center justify-center border-b border-[#E1E7F6] overflow-hidden px-5 pb-7 pt-14 sm:min-h-[204px]">
        <div className="pointer-events-none absolute inset-0 interactive-card__keep" aria-hidden>
          <Image
            src={CARD_BG_SRC}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        <div className="absolute left-4 top-4 z-[1]">
          <span className="inline-flex items-center rounded-[8px] bg-[#F5F6F9] px-3 py-1.5 font-normal uppercase tracking-[0.1em] text-[#293B93]  text-xs">
            <span className="mr-1.5">/</span>
            {label}
          </span>
        </div>
        <Icon className="relative z-[1] h-[76px] w-[76px] sm:h-[84px] sm:w-[84px]" />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-left">
        <h3 className="Text font-bold text-[#111827]">{title}</h3>
        <p className="TextSmall mt-2.5 flex-1 font-normal leading-[1.5] text-[#666666]">
          {description}
        </p>
        <TextArrowLink href={href} className="mt-5">
          {learnMore}
        </TextArrowLink>
      </div>
    </article>
  );
}

export default function AboutUsExploreSection() {
  const t = usePathTranslation("aboutUsPage.exploreSection");
  const locale = useLocale();

  const cards = [
    {
      key: "brand",
      label: t("cards.brand.label", "01 BRAND"),
      title: t("cards.brand.title", "Why GTCFX"),
      description: t(
        "cards.brand.description",
        "Understand our mission, vision and core values"
      ),
      href: localizedHref(locale, "/company/why-gtc-group"),
      icon: BrandIcon,
    },
    {
      key: "global",
      label: t("cards.global.label", "02 GLOBAL"),
      title: t("cards.global.title", "Global Presence"),
      description: t(
        "cards.global.description",
        "Explore our global footprint and regulatory entities."
      ),
      href: localizedHref(locale, "/company/global-presence"),
      icon: GlobalIcon,
    },
    {
      key: "career",
      label: t("cards.career.label", "03 CAREER"),
      title: t("cards.career.title", "Career Opportunities"),
      description: t(
        "cards.career.description",
        "Join us in shaping the future of fintech."
      ),
      href: localizedHref(locale, "/company/careers"),
      icon: CareerIcon,
    },
    {
      key: "events",
      label: t("cards.events.label", "03 EVENTS"),
      title: t("cards.events.title", "Events & Exhibitions"),
      description: t(
        "cards.events.description",
        "View the global exhibitions and events that GTCFX participates in."
      ),
      href: localizedHref(locale, "/company/events-and-exhibitions"),
      icon: EventsIcon,
    },
  ].filter((card) => SHOW_CAREERS || card.key !== "career");

  const learnMore = t("learnMore", "learn more");

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-16">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>{t("eyebrow", "EXPLORE MORE")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-4xl font-semibold leading-[1.2] text-[#000]">
            {t("titleBefore", "In-depth ")} <br />
            <span className="text-[#293B93]">
              {t("titleAccent", "understanding of GTCFX")}
            </span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.6] text-[#000032] md:mt-6">
            {t(
              "description",
              "From brand vision to global reach, from career opportunities to industry events—explore every dimension of GTCFX."
            )}
          </p>

          <div className="mt-12 sm:hidden lg:mt-16">
            <MobilePeekCarousel
              items={cards}
              showArrows
              trackClassName="-mx-4 px-4"
              renderItem={(card) => (
                <ExploreCard
                  label={card.label}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  icon={card.icon}
                  learnMore={learnMore}
                />
              )}
            />
          </div>

          <div className="mt-12 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-3 sm:gap-6 lg:mt-16">
            {cards.map((card) => (
              <ExploreCard
                key={card.key}
                label={card.label}
                title={card.title}
                description={card.description}
                href={card.href}
                icon={card.icon}
                learnMore={learnMore}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
