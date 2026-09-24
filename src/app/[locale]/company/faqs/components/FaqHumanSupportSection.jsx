"use client";
import Image from "next/image";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { FiArrowRight, FiMail, FiMessageSquare, FiPhone } from "react-icons/fi";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const supportCards = [
  {
    key: "liveChat",
    href: "/company/contact-us",
    icon: "/new-design/message.svg",
  },
  {
    key: "email",
    href: "mailto:support@gtcfx.com",
    icon: "/new-design/email.svg",
  },
  {
    key: "phone",
    href: "/company/contact-us",
    icon: "/new-design/phone.svg",
  },
];

function SupportCard({ card, locale, t }) {
  const href = card.href.startsWith("/")
    ? localizedHref(locale, card.href)
    : card.href;

  const isExternal = /^(mailto:|tel:|https?:)/i.test(href);
  const title = t(`cards.${card.key}.title`);
  const cta = t(`cards.${card.key}.cta`);

  return (
    <article className="interactive-card flex h-full flex-col rounded-[20px] border border-[#e5eaf4] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] md:p-7">
      <span className="interactive-card__keep inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#E1E7F6] bg-white">
        <Image src={card.icon} alt={title} width={56} height={56} className="h-10 w-10 object-contain" />
      </span>

      <h3 className="HeadingH4 mt-8 font-bold">{title}</h3>

      <p className="TextSmall mt-3 text-[#6b7280]">{t(`cards.${card.key}.description`)}</p>

      <div className="mt-6 flex items-center gap-2 text-[11px] font-medium text-[#7b86b2] md:text-xs">
        <Image
          src="/new-design/dot.svg"
          alt=""
          width={16}
          height={16}
          className="interactive-card__keep h-4 w-4"
        />
        <span>{t(`cards.${card.key}.meta`)}</span>
      </div>
    </article>
  );
}

export default function FaqHumanSupportSection({ locale = "en" }) {
  const t = usePathTranslation("faqsPage.humanSupport");

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container">
        <div className=" text-center">
          <p className="TextSmall font-semibold uppercase tracking-[0.28em] text-[#293B93]">
            {t("eyebrow", "24/7 Customer Support")}
          </p>

          <h2 className="HeadingH1 mx-auto mt-2 max-w-3xl text-black ">
            {t("titleStart", "Still need help?")} <span className="text-[#293B93]">{t("titleHighlight", "Connect")}</span>
            <br />
            {t("titleEnd", "with our team")}
          </h2>

          <p className="Text mx-auto mt-6 max-w-2xl text-center">
            {t(
              "description",
              "Our multilingual support team is available around the clock during market hours. Choose the channel that works best for you."
            )}
          </p>
        </div>

        <div className="mx-auto mt-12">
          <div className="md:hidden">
            <MobilePeekCarousel
              items={supportCards}
              showArrows={true}
              trackClassName="-mx-4 px-4"
              slideClassName="px-0"
              renderItem={(card) => <SupportCard card={card} locale={locale} t={t} />}
            />
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
            {supportCards.map((card) => (
              <SupportCard key={card.key} card={card} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
