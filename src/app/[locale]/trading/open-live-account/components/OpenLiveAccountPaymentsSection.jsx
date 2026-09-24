"use client";

import { useMemo } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { PAYMENT_METHODS } from "../openLiveAccountData";

function buildMarqueeSegment(items, minItems = 24) {
  if (!items.length) return [];

  const repeats = Math.max(2, Math.ceil(minItems / items.length));
  return Array.from({ length: repeats }, () => items).flat();
}

function PaymentMethodCard({ method }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 rounded-[12px] border border-[#E1E7F6] bg-white px-4 py-3 sm:px-3 sm:py-1"
      role="group"
      aria-label={method.name}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF2FF] text-[15px] font-bold text-[#293B93]">
        {method.letter}
      </span>
      <span className="text-xs whitespace-nowrap font-semibold text-[#000]">
        {method.name}
      </span>
    </div>
  );
}

function PaymentMarqueeRow({ items, ariaHidden = false }) {
  return (
    <div
      className="gtc-payment-marquee__segment flex shrink-0 items-center gap-4 sm:gap-5"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((method, index) => (
        <PaymentMethodCard key={`${method.key}-${index}`} method={method} />
      ))}
    </div>
  );
}

export default function OpenLiveAccountPaymentsSection() {
  const t = usePathTranslation("openLiveAccountPage.payments");
  const segment = useMemo(() => buildMarqueeSegment(PAYMENT_METHODS), []);

  return (
    <section className="bg-[#F8F9FC] py-6 md:py-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">
            {t("eyebrow", "Funding")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-md font-semibold leading-[1.25] text-[#000]">
            {t("title", "10+ payment methods. Instant deposits.")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#666]">
            {t(
              "description",
              "Fund your account in the way that works for you — credit card, bank wire, e-wallet, or crypto."
            )}
          </p>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="gtc-payment-marquee__viewport relative overflow-hidden"
            aria-label={t("ariaLabel", "Accepted payment methods")}
          >
            <div className="gtc-payment-marquee__track flex w-max items-center py-1">
              <PaymentMarqueeRow items={segment} />
              <PaymentMarqueeRow items={segment} ariaHidden />
            </div>
          </div>
        </div>
        <p className="Text mx-auto mt-10 max-w-2xl text-center font-normal leading-[1.7] text-[#666]">
          {t("footerNote", "GTCFX charges zero deposit fees on most payment channels")}
        </p>
      </div>

      <style jsx global>{`
        .gtc-payment-marquee__track {
          animation: gtc-payment-marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        .gtc-payment-marquee__track:hover {
          animation-play-state: paused;
        }

        @keyframes gtc-payment-marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gtc-payment-marquee__track {
            animation: none !important;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 0.75rem;
            width: auto;
          }

          .gtc-payment-marquee__segment[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
