"use client";

import clsx from "clsx";
import Link from "next/link";
import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const STEPS = [
  {
    key: "register",
    step: "01",
    titleKey: "steps.register.title",
    title: "Register",
    descriptionKey: "steps.register.description",
    description:
      "Sign up in minutes with your email, set your password, and tell us where you trade from.",
    icon: PersonIcon,
  },
  {
    key: "createAccount",
    step: "02",
    titleKey: "steps.createAccount.title",
    title: "Create an account",
    descriptionKey: "steps.createAccount.description",
    description:
      "Complete verification, choose your account type, and unlock MT4, MT5, and GTC platforms.",
    icon: CardIcon,
  },
  {
    key: "deposit",
    step: "03",
    titleKey: "steps.deposit.title",
    title: "Make a deposit",
    descriptionKey: "steps.deposit.description",
    description:
      "Fund securely via card, bank transfer, or e-wallet — then trade forex, indices, and CFDs.",
    icon: ClickIcon,
  },
];

function PersonIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M16.2949 18.6443C11.2603 18.6443 7.16375 14.4623 7.16375 9.32171C7.16375 4.182 11.2603 0 16.2949 0C21.3295 0 25.4244 4.182 25.4244 9.32171C25.4244 14.4623 21.3295 18.6443 16.2949 18.6443ZM16.2949 2.56274C12.6444 2.56274 9.67366 5.59519 9.67366 9.32171C9.67366 13.0491 12.6444 16.0815 16.2949 16.0815C19.9454 16.0815 22.9145 13.0491 22.9145 9.32171C22.9145 5.59519 19.9454 2.56274 16.2949 2.56274Z" fill="#293B93" />
      <path d="M1.25495 34C0.562109 34 0 33.4261 0 32.7186C0 23.5445 7.30916 16.0815 16.2949 16.0815C20.2706 16.0815 24.0992 17.5606 27.0765 20.246C27.5961 20.714 27.6452 21.524 27.1876 22.0546C26.7268 22.586 25.9343 22.6327 25.4163 22.1664C22.8966 19.8948 19.6578 18.6443 16.2949 18.6443C8.69322 18.6443 2.50991 24.9577 2.50991 32.7186C2.50995 33.4261 1.9478 34 1.25495 34Z" fill="#293B93" />
      <path d="M32.745 29.6211H24.1695C23.4766 29.6211 22.9145 29.0472 22.9145 28.3397C22.9145 27.6323 23.4766 27.0584 24.1695 27.0584H32.745C33.4379 27.0584 34 27.6323 34 28.3397C34 29.0472 33.4379 29.6211 32.745 29.6211Z" fill="#293B93" />
      <path d="M28.4573 33.9992C27.7644 33.9992 27.2023 33.4252 27.2023 32.7178V23.9617C27.2023 23.2542 27.7644 22.6803 28.4573 22.6803C29.1501 22.6803 29.7122 23.2542 29.7122 23.9617V32.7178C29.7122 33.4252 29.1501 33.9992 28.4573 33.9992Z" fill="#293B93" />
    </svg>
  );
}

function CardIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 34 28" fill="none">
      <path d="M25.8864 12.1081C30.3674 12.1081 34 15.6656 34 20.0541C34 24.4425 30.3674 28 25.8864 28C21.4053 28 17.7727 24.4425 17.7727 20.0541C17.7727 15.6656 21.4053 12.1081 25.8864 12.1081ZM25.8864 14.3784C22.6856 14.3784 20.0909 16.9194 20.0909 20.0541C20.0909 23.1887 22.6856 25.7297 25.8864 25.7297C29.0871 25.7297 31.6818 23.1887 31.6818 20.0541C31.6818 16.9194 29.0871 14.3784 25.8864 14.3784ZM29.3636 0C31.0707 0 32.4545 1.35525 32.4545 3.02702V10.5946H30.1364V8.3243H2.31818V21.1892C2.31818 21.5773 2.6165 21.8971 3.00078 21.9409L3.0909 21.9459H16.2273V24.2162H3.0909C1.38385 24.2162 0 22.861 0 21.1892V3.02702C0 1.35525 1.38385 0 3.0909 0H29.3636ZM26.5818 16.6486C26.8379 16.6486 27.0455 16.8519 27.0455 17.1027V18.9189H28.9C29.1561 18.9189 29.3636 19.1222 29.3636 19.373V20.7351C29.3636 20.9859 29.1561 21.1892 28.9 21.1892H27.0455V23.0054C27.0455 23.2562 26.8379 23.4595 26.5818 23.4595H25.1909C24.9348 23.4595 24.7273 23.2562 24.7273 23.0054V21.1892H22.8727C22.6166 21.1892 22.4091 20.9859 22.4091 20.7351V19.373C22.4091 19.1222 22.6166 18.9189 22.8727 18.9189H24.7273V17.1027C24.7273 16.8519 24.9348 16.6486 25.1909 16.6486H26.5818ZM29.3636 2.27027H3.0909C2.69463 2.27027 2.36802 2.56239 2.32336 2.93876L2.31818 3.02702V6.05403H30.1364V3.02702C30.1364 2.63894 29.838 2.31908 29.4538 2.27534L29.3636 2.27027Z" fill="#293B93" />
    </svg>
  );
}

function ClickIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="34" viewBox="0 0 28 34" fill="none">
      <path d="M24.9409 13.0432H24.8471C24.228 13.0432 23.7026 13.2339 23.2148 13.539C22.7833 12.2614 21.6763 11.327 20.2504 11.327C19.6312 11.327 19.0308 11.5177 18.5242 11.8228C18.0927 10.5451 16.9857 9.61077 15.5598 9.61077C14.9969 9.61077 14.4903 9.74425 14.04 9.99215V6.69321C14.04 4.90073 12.7079 3.43242 10.9067 3.43242C9.12428 3.43242 7.67958 4.90073 7.67958 6.69321V19.355L5.70954 17.3718C4.45246 16.0942 2.21974 16.2849 1.13152 17.3718C0.0620701 18.4588 -0.650899 20.6708 0.887613 22.2344L9.9123 31.3494C10.0999 31.5401 10.3063 31.6927 10.5127 31.8261C12.1638 33.1991 14.04 34 18.0364 34C27.1549 34 27.9992 29.0039 27.9992 22.8446V16.323C28.0367 14.5115 26.7421 13.0432 24.9409 13.0432ZM26.3481 22.8256C26.3481 28.0314 26.3294 32.2647 18.0927 32.2647C14.6029 32.2647 12.5203 31.4829 10.9255 29.8811L2.36984 21.2429C1.61934 20.4801 1.80697 19.4885 2.42613 18.8592C3.04528 18.23 4.18979 18.2109 4.77142 18.8211C4.77142 18.8211 6.27241 20.3275 7.56701 21.6433C8.54265 22.6349 9.40572 23.493 9.40572 23.493V7.03645C9.40572 6.17835 10.0999 5.49187 10.9442 5.49187C11.7885 5.49187 12.3702 6.17835 12.3702 7.03645V17.5053H12.3889C12.3702 17.5625 12.3702 17.6197 12.3702 17.677C12.3702 18.1537 12.7454 18.5351 13.2145 18.5351C13.6835 18.5351 14.0588 18.1537 14.0588 17.677C14.0588 17.6197 14.0588 17.5625 14.04 17.5053H14.0588V13.2148C14.0588 12.3567 14.6779 11.6702 15.5222 11.6702C15.5222 11.6702 17.0232 11.6511 17.0232 13.2148V18.8783H17.042C17.0232 18.9355 17.0232 18.9927 17.0232 19.0499C17.0232 19.5266 17.3985 19.908 17.8675 19.908C18.3366 19.908 18.7118 19.5266 18.7118 19.0499C18.7118 18.9927 18.7118 18.9355 18.6931 18.8783H18.7118V14.931C18.7118 14.0729 19.3122 13.3864 20.1565 13.3864C20.1565 13.3864 21.6951 13.4818 21.6951 14.931V19.908H21.7138C21.6951 19.9652 21.6951 20.0224 21.6951 20.0796C21.6951 20.5564 22.0703 20.9377 22.5394 20.9377C23.0084 20.9377 23.3649 20.5564 23.3649 20.0796C23.3649 20.0224 23.3649 19.9652 23.3461 19.908H23.3649V16.5137C23.3649 15.6556 24.0028 14.9692 24.8471 14.9692C24.8471 14.9692 26.3294 14.9119 26.3294 16.5137C26.3481 16.5137 26.3481 21.4526 26.3481 22.8256ZM6.44127 11.5558V8.67639C6.1786 8.06618 6.00973 7.3797 6.00973 6.65508C6.00973 3.92821 8.18617 1.69714 10.8879 1.69714C13.571 1.69714 15.7662 3.90914 15.7662 6.65508C15.7662 7.03646 15.7286 7.39877 15.6536 7.74201C16.2727 7.76108 16.8168 8.02804 17.2296 8.44756C17.3797 7.87549 17.4735 7.28435 17.4735 6.67414C17.4735 2.99383 14.5278 0 10.9067 0C7.28557 0 4.33989 2.99383 4.33989 6.67414C4.32112 8.60011 5.14667 10.3354 6.44127 11.5558Z" fill="#293B93" />
    </svg>
  );
}

function StepConnector() {
  return (
    <div className="hidden items-center justify-center self-center px-1 lg:flex" aria-hidden>
      <div className="flex items-center gap-0">
        <span className="h-px w-6 bg-[#E1E7F6] xl:w-10" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E7F6] bg-[#F8F9FC] text-[#C5CDE8]">
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="h-px w-6 bg-[#E1E7F6] xl:w-10" />
      </div>
    </div>
  );
}

function StepCard({ step, t }) {
  const Icon = step.icon;

  return (
    <article className="interactive-card group flex h-full min-h-[230px] flex-col rounded-[16px] border-[0.865px] border-[#E1E7F6] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-white group-hover:!bg-white/10"
          aria-hidden
        >
          <Icon className="h-4 w-5" />
        </span>
        <span className="TextSmall font-normal text-[#999]">/ {step.step}</span>
      </div>

      <h3 className="HeadingH5 mt-5 font-semibold text-[#000]">
        {t(step.titleKey, step.title)}
      </h3>
      <p className="text-xs mt-3 flex-1 font-normal leading-[1.65] text-[#666] group-hover:!text-white">
        {t(step.descriptionKey, step.description)}
      </p>
    </article>
  );
}

function StepsRow({ t }) {
  return (
    <div className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]"
    >
      {STEPS.map((step, index) => (
        <div key={step.key} className={clsx("contents")}>
          <StepCard step={step} t={t} />
          {index < STEPS.length - 1 ? <StepConnector /> : null}
        </div>
      ))}
    </div>
  );
}

export default function AwardsGetStartedSection() {
  const t = usePathTranslation("awardsPage.getStartedSection");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden pt-2 pb-10 md:pb-16 md:pt-4">
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        {[1, 0.78, 0.56].map((scale, index) => (
          <span
            key={scale}
            className="absolute rounded-full border border-[#E1E7F6]"
            style={{
              width: `${scale * 100}%`,
              maxWidth: "900px",
              aspectRatio: "1",
              opacity: 1 - index * 0.9,
            }}
          />
        ))}
      </div> */}

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mx-auto max-w-5xl text-center">
              <SectionEyebrow
                variant="compact"
                className="inline-block font-normal uppercase tracking-[0.35em]"
              >
                {t("eyebrow", "— Open an Account —")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-5 max-w-xl font-semibold leading-[1.25] text-[#000] md:mt-6">
                {t("titleBefore", "Wherever you trade, we're")}{" "}
                <span className="text-[#293B93]">
                  {t("titleAccent", "already")}
                </span>{" "}
                {t("titleAfter", "recognized.")}
              </h2>

              <p className="Text mx-auto mt-5  font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Join millions of traders worldwide and experience a service certified by the institutions that matter."
                )}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1} className="mt-10 md:mt-12">
            <div className="lg:hidden">
              <MobilePeekCarousel
                items={STEPS}
                showArrows
                className="w-full min-w-0"
                trackClassName="-mx-4 px-4 min-w-0"
                slideClassName="!h-auto"
                renderItem={(step) => (
                  <div className="w-full min-w-0 max-w-full px-1">
                    <StepCard step={step} t={t} />
                  </div>
                )}
              />
            </div>

            <div className="hidden lg:block">
              <StepsRow t={t} />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mx-auto mt-10 max-w-2xl text-center md:mt-12">
              <p className="TextSmall font-normal leading-[1.7] text-[#000032]/60">
                {t(
                  "footnote",
                  "No obligation. Start with a demo to practice risk-free before going live — a commitment to transparency and service that has earned us 60+ industry recognitions."
                )}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-5">
                <Button
                  href={localizedHref(locale, "/live-account-application")}
                  external
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full font-medium md:w-auto"
                >
                  {t("openLiveAccount", "Open Live Account")}
                </Button>

                  <Link
                  href={localizedHref(locale, "/trading/free-demo-account")}
                  className="Text font-medium text-[#666] underline underline-offset-4 transition hover:text-[#666] hover:no-underline"
                >
                  {t("tryDemoAccount", "Try Demo Account")}
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
