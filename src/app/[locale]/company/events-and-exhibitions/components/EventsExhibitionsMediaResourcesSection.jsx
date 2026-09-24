"use client";

import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "../../../LocaleProvider";

const MEDIA_RESOURCES_IMAGE = "/new-design/company/event-media.svg";

const BRAND_ASSETS_CARD = {
  key: "brandAssets",
  title: "Brand Asset Pack",
  description:
    "Official GTC Group logo files (SVG, PNG, EPS), brand color palette, typography guidelines, and product fact sheets. Suitable for press use and partnership materials.",
  titleKey: "cards.brandAssets.title",
  descriptionKey: "cards.brandAssets.description",
  ctaKey: "cards.brandAssets.cta",
  cta: "Upcoming Events",
  href: "#upcoming",
  external: false,
};

const PRESS_RELEASES_CARD = {
  key: "pressReleases",
  title: "Exhibition Press Releases",
  description:
    "Official GTC Group press releases covering recent exhibition appearances, sponsorship announcements, and keynote highlights — formatted and ready for editorial use.",
  titleKey: "cards.pressReleases.title",
  descriptionKey: "cards.pressReleases.description",
  ctaKey: "cards.pressReleases.cta",
  cta: "Download Press Kit (PDF)",
  href: "/documents/gtc-press-kit.pdf",
  external: true,
};

const MEDIA_EMAIL = "media@gtcfx.com";

function FolderIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
      <path d="M18.5749 11.2526H11.4292C11.0471 11.2491 10.6821 11.0985 10.4142 10.8338C10.1463 10.5691 9.99734 10.212 10 9.84078V7.0167C9.99734 6.64545 10.1463 6.28834 10.4142 6.02367C10.6821 5.759 11.0471 5.60838 11.4292 5.60485H18.5749C18.9565 5.60859 19.321 5.75941 19.5882 6.02415C19.8554 6.28889 20.0035 6.64589 19.9999 7.0167V9.84078C20.0035 10.2116 19.8554 10.5686 19.5882 10.8333C19.321 11.0981 18.9565 11.2489 18.5749 11.2526ZM18.5749 7.0167H11.4292V9.84078H18.5749V7.0167ZM13.3375 7.78598C13.4786 7.78381 13.6172 7.8225 13.7356 7.89711C13.8541 7.97172 13.947 8.07889 14.0026 8.20497C14.0581 8.33106 14.0738 8.47035 14.0477 8.60513C14.0215 8.73991 13.9547 8.86408 13.8557 8.96184C13.7566 9.05959 13.6299 9.12651 13.4917 9.15408C13.3534 9.18164 13.2098 9.16861 13.0792 9.11663C12.9486 9.06466 12.8368 8.9761 12.7582 8.86221C12.6795 8.74833 12.6375 8.61428 12.6375 8.47712C12.6364 8.38692 12.6537 8.29741 12.6884 8.21372C12.723 8.13003 12.7744 8.05381 12.8394 7.98945C12.9044 7.92508 12.9819 7.87383 13.0674 7.83863C13.1529 7.80344 13.2447 7.785 13.3375 7.78436V7.78598ZM17.9125 4.90035C17.8179 4.89961 17.7245 4.88075 17.6375 4.84486C17.5505 4.80897 17.4717 4.75675 17.4055 4.69119C17.3393 4.62563 17.2871 4.54802 17.2518 4.46281C17.2165 4.3776 17.1989 4.28647 17.2 4.19463V2.11958C17.2011 1.9337 17.1262 1.75498 16.9919 1.62267C16.8575 1.49035 16.6746 1.41526 16.4833 1.41387H2.14173C1.95044 1.41526 1.76753 1.49035 1.63317 1.62267C1.4988 1.75498 1.42396 1.9337 1.42507 2.11958V14.8824C1.42385 15.0684 1.49865 15.2471 1.63304 15.3795C1.76743 15.5118 1.9504 15.5869 2.14173 15.5882H16.4166C16.608 15.5869 16.7909 15.5118 16.9253 15.3795C17.0597 15.2471 17.1345 15.0684 17.1333 14.8824V12.6993C17.1333 12.5151 17.2086 12.3385 17.3426 12.2083C17.4766 12.0781 17.6583 12.0049 17.8479 12.0049C18.0374 12.0049 18.2191 12.0781 18.3532 12.2083C18.4872 12.3385 18.5624 12.5151 18.5624 12.6993V14.8824C18.5658 15.4394 18.3418 15.975 17.9396 16.3719C17.5375 16.7688 16.9898 16.9947 16.4166 17H2.14173C1.56885 16.9949 1.0215 16.769 0.619929 16.3719C0.218358 15.9748 -0.00458721 15.4391 7.51157e-05 14.8824V2.11797C-0.00469824 1.56121 0.218198 1.02538 0.619781 0.628239C1.02136 0.231097 1.56878 0.00513207 2.14173 0H16.4833C17.0566 0.00534649 17.6043 0.231248 18.0065 0.628226C18.4087 1.0252 18.6326 1.56089 18.6291 2.11797V4.19301C18.6303 4.37893 18.5555 4.55771 18.4211 4.69005C18.2867 4.82238 18.1038 4.89745 17.9125 4.89873V4.90035Z" fill="currentColor" />
    </svg>
  );
}

function DocumentIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10.7407 4.44444C11.0354 4.44444 11.318 4.56151 11.5264 4.76988C11.7348 4.97825 11.8519 5.26087 11.8519 5.55556C11.8519 5.85024 11.7348 6.13286 11.5264 6.34123C11.318 6.5496 11.0354 6.66667 10.7407 6.66667H4.07407C3.77939 6.66667 3.49677 6.5496 3.2884 6.34123C3.08003 6.13286 2.96296 5.85024 2.96296 5.55556C2.96296 5.26087 3.08003 4.97825 3.2884 4.76988C3.49677 4.56151 3.77939 4.44444 4.07407 4.44444H10.7407ZM6.2963 8.88889C6.59098 8.88889 6.8736 9.00595 7.08197 9.21433C7.29034 9.4227 7.40741 9.70531 7.40741 10C7.40741 10.2947 7.29034 10.5773 7.08197 10.7857C6.8736 10.994 6.59098 11.1111 6.2963 11.1111H4.07407C3.77939 11.1111 3.49677 10.994 3.2884 10.7857C3.08003 10.5773 2.96296 10.2947 2.96296 10C2.96296 9.70531 3.08003 9.4227 3.2884 9.21433C3.49677 9.00595 3.77939 8.88889 4.07407 8.88889H6.2963Z" fill="currentColor" />
      <path d="M13.3333 4.07407C13.3333 3.05185 12.5037 2.22222 11.4815 2.22222H4.07407C3.05185 2.22222 2.22222 3.05185 2.22222 4.07407V15.9259C2.22222 16.9481 3.05185 17.7778 4.07407 17.7778H13.3333V4.07407ZM15.5556 20H4.07407C2.99356 20 1.95731 19.5708 1.19327 18.8067C0.429232 18.0427 0 17.0064 0 15.9259V4.07407C0 2.99356 0.429232 1.95731 1.19327 1.19327C1.95731 0.429232 2.99356 0 4.07407 0H11.4815C12.562 0 13.5983 0.429232 14.3623 1.19327C15.1263 1.95731 15.5556 2.99356 15.5556 4.07407V20Z" fill="currentColor" />
      <path d="M13.3333 7.40741H15.9259C17.0064 7.40741 18.0427 7.83664 18.8067 8.60068C19.5708 9.36471 20 10.401 20 11.4815V15.9259C20 17.0064 19.5708 18.0427 18.8067 18.8067C18.0427 19.5708 17.0064 20 15.9259 20H13.3333V7.40741ZM17.7778 15.9259V11.4815C17.7778 10.4593 16.9481 9.62963 15.9259 9.62963H15.5556V17.7778H15.9259C16.9481 17.7778 17.7778 16.9481 17.7778 15.9259Z" fill="currentColor" />
    </svg>
  );
}

function CardActionLink({ card, t, variant = "outline" }) {
  const label = t(card.ctaKey, card.cta);
  const classes =
    variant === "gold"
      ? "interactive-card__keep TextButton relative z-10 inline-flex items-center gap-2 rounded-full bg-[#B8935A] px-5 py-2.5 font-semibold text-white transition hover:bg-[#A6824D] hover:no-underline group-hover:border-white group-hover:bg-white group-hover:text-primary"
      : "interactive-card__keep TextButton relative z-10 inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-[#F8F9FC] px-5 py-2.5 font-medium text-[#293B93] transition hover:bg-[#E8EDF8] hover:no-underline group-hover:border-white group-hover:bg-white group-hover:text-primary";

  const content = (
    <>
      <FiDownload className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </>
  );

  if (card.external) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        download
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={card.href} className={classes}>
      {content}
    </Link>
  );
}

function BrandAssetsCard({ t }) {
  const card = BRAND_ASSETS_CARD;

  return (
    <article className="interactive-card group rounded-[20px] border border-[#E1E7F6] bg-white p-5 text-left md:p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6] text-[#293B93]">
          <FolderIcon className="h-5 w-5" />
        </span>

        <h3 className="HeadingH5 font-semibold text-[#000032]">
          {t(card.titleKey, card.title)}
        </h3>
      </div>

      <p className="TextSmall mt-3 font-normal leading-[1.65] text-[#666]">
        {t(card.descriptionKey, card.description)}
      </p>

    
    </article>
  );
}

function PressReleasesCard({ t }) {
  const card = PRESS_RELEASES_CARD;

  return (
    <article className="interactive-card group rounded-[20px] border border-[#E1E7F6] bg-white p-5 text-left md:p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6] text-[#293B93]">
          <DocumentIcon className="h-5 w-5" />
        </span>

        <h3 className="HeadingH5 font-semibold text-[#000032]">
          {t(card.titleKey, card.title)}
        </h3>
      </div>

      <p className="TextSmall mt-5 font-normal leading-[1.65] text-[#666]">
        {t(card.descriptionKey, card.description)}
      </p>

    
    </article>
  );
}

function ContactBar({ t }) {
  const email = t("contact.email", MEDIA_EMAIL);
  const before = t(
    "contact.textBefore",
    "For media interviews, press inquiries, or partnership discussions, contact our communications team at"
  );
  const after = t(
    "contact.textAfter",
    "— we typically respond within one business day."
  );

  return (
    <div className="interactive-card group flex flex-col gap-4 rounded-[16px] border border-[#E1E7F6] bg-[#F8F9FC] px-5 py-4 sm:flex-row sm:items-center sm:gap-5 md:px-6 md:py-5">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6] text-[#293B93]"
        aria-hidden
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7.5L12 13L20 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </span>

      <p className="TextSmall text-left font-normal leading-[1.65] text-[#000032]">
        {before}{" "}
        <a
          href={`mailto:${email}`}
          className="font-semibold text-[#293B93] hover:text-[#243575] hover:no-underline"
        >
          {email}
        </a>{" "}
        {after}
      </p>
    </div>
  );
}

export default function EventsExhibitionsMediaResourcesSection() {
  const t = usePathTranslation("eventsAndExhibitionsPage.mediaResourcesSection");

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.35em]">
                {t("eyebrow", "Press & Partners")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                {t("title", "Media & Partner Resources")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Everything you need for coverage, partnership evaluation, or due diligence on GTC Group's global activity."
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-2">
            <FadeInSection>
              <div className="relative overflow-hidden rounded-[20px] bg-[#E8EDF8]">
                <Image
                  src={MEDIA_RESOURCES_IMAGE}
                  alt={t("imageAlt", "GTC Group media and partner resources")}
                  width={640}
                  height={640}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeInSection>

            <div className="flex min-w-0 flex-col gap-5 md:gap-6">
              <FadeInSection delay={0.08}>
                <BrandAssetsCard t={t} />
              </FadeInSection>

              <FadeInSection delay={0.12}>
                <PressReleasesCard t={t} />
              </FadeInSection>

              <FadeInSection delay={0.16}>
                <ContactBar t={t} />
              </FadeInSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
