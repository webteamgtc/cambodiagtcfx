"use client";

import { FiArrowRight, FiMessageSquare, FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const WHATSAPP_HREF = "https://wa.me/448000488461";

const channels = [
  {
    icon: FiMessageSquare,
    key: "liveChat",
    href: WHATSAPP_HREF,
    external: true,
    iconBg: "bg-[#eef1fb]",
    iconColor: "text-[#3347a8]",
  },
  {
    icon: FiMail,
    key: "email",
    href: "mailto:support@gtcfx.com",
    iconBg: "bg-[#fdf4ea]",
    iconColor: "text-[#c7894f]",
  },
  {
    icon: FiPhone,
    key: "phone",
    href: "tel:+971800667788",
    iconBg: "bg-[#eafaf1]",
    iconColor: "text-[#2eab71]",
  },
  {
    icon: FaWhatsapp,
    key: "whatsapp",
    href: WHATSAPP_HREF,
    external: true,
    iconBg: "bg-[#f3e8fd]",
    iconColor: "text-[#8b4fd9]",
  },
];

function ChannelCard({ channel, t }) {
  return (
    <a
      href={channel.href}
      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex h-full flex-col items-center rounded-2xl border border-[#e8ecf8] bg-white px-6 py-8 text-center no-underline transition hover:border-[#d0d8e8] hover:shadow-md"
    >
      {/* Icon */}
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${channel.iconBg} ${channel.iconColor}`}>
        <channel.icon className="h-5 w-5" />
      </span>

      {/* Content */}
      <h3 className="mt-5 text-[17px] font-semibold text-[#02002f]">{t(`items.${channel.key}.title`)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5a5a6e]">{t(`items.${channel.key}.description`)}</p>

      {/* Meta */}
      <div className="mt-3 flex items-center gap-2 text-[13px] font-medium text-[#3347a8]">
        <span className="h-2 w-2 rounded-full bg-[#3347a8]" />
        {t(`items.${channel.key}.meta`)}
      </div>

      {/* CTA */}
      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e1e7f6] bg-white px-5 py-2.5 text-sm font-medium text-[#3347a8] transition group-hover:border-[#3347a8] group-hover:bg-[#f5f6fc]">
        <FiArrowRight className="h-4 w-4" />
        {t(`items.${channel.key}.cta`)}
      </span>
    </a>
  );
}

export default function ContactChannelsSection() {
  const t = usePathTranslation("contactUsPage.channels");

  return (
    <section className="relative bg-white pb-10 md:pb-16">
      <div className="container">
        <div className="">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "Contact Us")}
              </span>
              <h2 className="HeadingH1 text-black mt-5">
                {t("title", "Choose Your Preferred Channel")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Multiple ways to reach our team — pick the one that suits you best and get the help you need instantly."
                )}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile Carousel */}
          <div className="mt-8 sm:hidden">
            <MobilePeekCarousel
              items={channels}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(channel) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <ChannelCard channel={channel} t={t} />
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="mt-12 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, index) => (
              <FadeInSection key={channel.key} delay={index * 0.1}>
                <ChannelCard channel={channel} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
