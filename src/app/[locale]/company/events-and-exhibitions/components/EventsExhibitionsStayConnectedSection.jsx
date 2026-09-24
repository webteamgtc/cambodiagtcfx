"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaWeixin,
  FaXTwitter,
} from "react-icons/fa6";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "../../../LocaleProvider";

const SOCIAL_LINKS = [
  {
    key: "instagram",
    href: "https://www.instagram.com/gtcfxofficial/",
    label: "Instagram",
    labelKey: "social.instagram",
    icon: FaInstagram,
  },
  {
    key: "linkedin",
    href: "https://linkedin.com/company/gtcfx-official",
    label: "LinkedIn",
    labelKey: "social.linkedin",
    icon: FaLinkedinIn,
  },
  {
    key: "x",
    href: "https://x.com/GTC_fx",
    label: "Twitter / X",
    labelKey: "social.twitter",
    icon: FaXTwitter,
  },
  {
    key: "wechat",
    href: "https://www.gtcfx.com",
    label: "WeChat",
    labelKey: "social.wechat",
    icon: FaWeixin,
  },
];

function NewsletterForm({ t }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    window.location.href = `mailto:media@gtcfx.com?subject=${encodeURIComponent(
      "Event Newsletter Subscription"
    )}&body=${encodeURIComponent(`Please subscribe this email to event updates: ${trimmed}`)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-lg flex-col sm:flex-row">
      <label htmlFor="events-newsletter-email" className="sr-only">
        {t("newsletter.emailLabel", "Email address")}
      </label>
      <input
        id="events-newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t("newsletter.placeholder", "your@email.com")}
        className="Text h-12 w-full min-w-0 flex-1 border border-[#E1E7F6] bg-[#F8F9FC] px-4 font-normal text-[#000] outline-none placeholder:text-[#999] focus:border-[#293B93] focus:ring-2 focus:ring-[#293B93]/20 "
      />
      <button
        type="submit"
        className="TextButton h-12 shrink-0 bg-[#293B93] px-6 font-normal text-white transition hover:bg-[#243575]"
      >
        {t("newsletter.subscribe", "Subscribe")}
      </button>
    </form>
  );
}

function SocialPill({ link, t }) {
  const Icon = link.icon;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="TextSmall inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-white px-4 py-2 font-medium text-[#293B93] transition hover:border-[#293B93]/30 hover:bg-[#F8F9FC] hover:no-underline"
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {t(link.labelKey, link.label)}
    </a>
  );
}

export default function EventsExhibitionsStayConnectedSection() {
  const t = usePathTranslation("eventsAndExhibitionsPage.stayConnectedSection");

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <FadeInSection>
            <div className="min-w-0 text-left lg:border-r lg:border-[#E1E7F6] lg:pr-12 xl:pr-16">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.35em]">
                {t("newsletter.eyebrow", "Stay Connected")}
              </SectionEyebrow>

              <h2 className="HeadingH2 mt-4 font-semibold leading-[1.2] text-[#000]">
                {t("newsletter.title", "First to know, first to connect")}
              </h2>

              <p className="TextSmall mt-5 max-w-lg font-normal leading-[1.7] text-[#666]">
                {t(
                  "newsletter.description",
                  "Get event announcements, exhibition recaps, and exclusive invitations directly in your inbox."
                )}
              </p>

              <NewsletterForm t={t} />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="min-w-0 border-t border-[#E1E7F6] pt-12 text-left lg:border-t-0 lg:pt-0 lg:pl-0">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.35em]">
                {t("social.eyebrow", "Social Media")}
              </SectionEyebrow>

              <h2 className="HeadingH2 mt-4 font-semibold leading-[1.2] text-[#000]">
                {t("social.title", "Follow the journey in real time")}
              </h2>

              <p className="TextSmall mt-5 max-w-lg font-normal leading-[1.7] text-[#666]">
                {t(
                  "social.description",
                  "Live from the floor — follow us for exhibition updates, behind-the-scenes moments, and industry insights."
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <SocialPill key={link.key} link={link} t={t} />
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
