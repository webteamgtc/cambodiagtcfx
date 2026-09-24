"use client";

import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { FiMoon, FiUser } from "react-icons/fi";
import { REGISTER_HREF } from "../swapUpdateData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ChartIcon() {
  return (
    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
      <path d="M61.1156 0.309639C60.798 0.104893 60.4275 -0.00270169 60.0496 5.15467e-05C59.6717 0.00280478 59.3028 0.115786 58.9882 0.325138L0.86176 39.0741C0.567437 39.2695 0.332444 39.5419 0.182442 39.8617C0.0324399 40.1815 -0.0268048 40.5364 0.0111769 40.8876C0.046965 41.2387 0.178451 41.5732 0.391302 41.8547C0.604154 42.1363 0.890203 42.3539 1.21827 42.4841L16.3776 48.5502L23.5059 61.0235C23.6735 61.3169 23.9149 61.5614 24.2062 61.7327C24.4974 61.904 24.8285 61.9962 25.1664 62H25.1877C25.8678 62 26.4994 61.6396 26.8482 61.0584L30.8724 54.349L49.657 61.8605C49.9255 61.9686 50.2151 62.0147 50.5039 61.9952C50.7928 61.9757 51.0736 61.8913 51.3252 61.7481C51.8367 61.4614 52.1874 60.9576 52.2862 60.3783L61.974 2.25484C62.0356 1.88226 61.9872 1.4998 61.8348 1.15429C61.6823 0.808792 61.4324 0.515254 61.1156 0.309639ZM6.0757 40.2541L50.9784 10.3185L18.3307 45.2643C18.1583 45.1616 18.0052 45.026 17.8153 44.9504L6.0757 40.2541ZM19.7412 46.6263L19.7277 46.6069L56.4306 7.32515L25.1412 56.0753L19.7412 46.6263ZM48.8587 57.3656L32.3101 50.7473C31.9227 50.6063 31.5151 50.5285 31.103 50.5167L56.5856 11.016L48.8587 57.3656Z" fill="#293B93" />
    </svg>
  );
}

export default function SwapUpdateCtaSection({ locale = "en" }) {
  const t = usePathTranslation("swapUpdatePage.cta");
  return (
    <section className="relative bg-[#293B93] py-10 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[8px] border border-white bg-white">
            <ChartIcon />
          </span>

          <h2 className="HeadingH1 mx-auto mt-6 font-semibold text-white">
            {t("heading", "Ready to start trading?")}
          </h2>

          <p className="Text mx-auto mt-5 font-normal leading-[1.7] text-white/60">
            {t("sub", "Open a live account in minutes — or practice with a free demo. Transparent costs, no hidden fees.")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Button
              href={localizedHref(locale, REGISTER_HREF)}
              external
              variant="secondary"
              size="lg"
              icon={<FiUser className="h-4 w-4" />}
              iconPosition="left"
              className="!w-full !max-w-md !border-white !bg-white !text-[#293B93] hover:!bg-white/90 sm:!min-w-[250px] sm:!w-auto"
            >
              {t("openCta", "Open Live Account")}
            </Button>
            <Button
              href={localizedHref(locale, "/trading/free-demo-account")}
              variant="ghost"
              size="lg"
              icon={<FiMoon className="h-4 w-4" />}
              iconPosition="left"
              className="!w-full !max-w-md !border !border-white !bg-transparent !text-white hover:!bg-white/10 sm:!min-w-[250px] sm:!w-auto"
            >
              {t("demoCta", "Free Demo Account")}
            </Button>
          </div>

          <p className="text-xs mx-auto mt-8 max-w-5xl font-normal leading-[1.65] text-white/60">
          {t("riskWarning", "Risk Warning: Trading CFDs involves significant risk of loss. Please ensure you fully understand the risks before trading.")}
          </p>
        </div>
      </div>
    </section>
  );
}
