"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { PRICING_FEATURE_KEYS, PRICING_PLANS } from "../vpsHostingData";

const GOLD = "#C5A070";
const BLUE = "#293B93";

function FeatureIcon({ type }) {
  const className = "h-5 w-5 text-[#80858F]";

  if (type === "cpu") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path strokeLinecap="round" d="M9 7V5M12 7V4M15 7V5M9 17v2M12 17v3M15 17v2M7 9H5M17 9h2M7 12H4M17 12h3M7 15H5M17 15h2" />
      </svg>
    );
  }

  if (type === "ram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="3" y="8" width="18" height="8" rx="1.5" />
        <path strokeLinecap="round" d="M7 12h2M11 12h2M15 12h2" />
      </svg>
    );
  }

  if (type === "ssd") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "os") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path strokeLinecap="round" d="M8 20h8" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 9h8M8 12h5M8 15h8" />
    </svg>
  );
}

function FreeBadge({ balance, t }) {
  const formattedBalance = `$${balance.toLocaleString()}`;

  return (
    <span className="inline-flex w-fit items-center gap-1.5 border border-[#D1FADF] rounded-full bg-[#F0FDF4] px-3 py-1.5">
      <svg className="h-3.5 w-3.5 shrink-0 text-[#1BAF6E]" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3.5 8.2l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="TextSmall font-medium text-[#1BAF6E]">
        {t("freeBadge", "FREE with minimum balance of {balance}").replace("{balance}", formattedBalance)}
      </span>
    </span>
  );
}

function FeatureRow({ featureKey, spec, t, planKey, isLast }) {
  const title = spec.label
    ? `${spec.value} ${t(`plans.${planKey}.specs.${featureKey}.label`, spec.label)}`
    : t(`plans.${planKey}.specs.${featureKey}.value`, spec.value);

  return (
    <li
      className={clsx(
        "flex items-center gap-3 py-4",
        !isLast && "border-b border-dashed border-[#E1E7F6]"
      )}
    >
      <span className="mt-0.5 flex shrink-0 items-center justify-center">
        <FeatureIcon type={featureKey} />
      </span>
      <div className="min-w-0">
        <p className="TextSmall font-semibold text-[#000032]">{title}</p>
        <p className="TextSmall font-normal text-[#818181]">
          {t(`plans.${planKey}.specs.${featureKey}.desc`, spec.desc)}
        </p>
      </div>
    </li>
  );
}

function PlanTitle({ name }) {
  return <>{name}</>;
}

function PricingCard({ plan, t }) {
  const isHighlight = plan.highlight;
  const planName = t(`plans.${plan.key}.name`, plan.name);
  const pathname = usePathname();
  const router = useRouter();

  const handleSubscribe = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    params.set("package", plan.key);

    router.replace(`${pathname}?${params.toString()}#apply-vps`, { scroll: false });

    requestAnimationFrame(() => {
      document.getElementById("apply-vps")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <article
      className={clsx(
        "relative flex h-full flex-col rounded-2xl bg-white",
        isHighlight
          ? "border border-[#B48755] shadow-[0_16px_48px_rgba(197,160,112,0.22)]"
          : "border border-[#E1E7F6]"
      )}
    >
      {isHighlight && plan.badge ? (
        <span className="absolute right-0 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#B48755] px-4 py-1.5 text-[11px] font-normal uppercase tracking-wide text-white">
          {t(`plans.${plan.key}.badge`, plan.badge)}
        </span>
      ) : null}

      <div className={clsx("flex flex-1 flex-col px-6 md:px-7", isHighlight ? "pb-7 pt-9 md:pb-8 md:pt-10" : "py-7 md:py-8")}>
        <p
          className={clsx(
            "TextSmall font-medium uppercase tracking-[0.18em]",
            isHighlight ? "text-[#B48755]" : "text-[#293B93]"
          )}
        >
          {t(`plans.${plan.key}.tierLabel`, plan.tierLabel)}
        </p>

        <h3 className="HeadingH4 mt-1 font-bold text-[#000032]">
          <PlanTitle name={planName} />
        </h3>

        <p className="mt-5">
          <span
            className="HeadingH2 font-semibold leading-none"
            style={{ color: isHighlight ? GOLD : BLUE }}
          >
            ${t(`plans.${plan.key}.price`, plan.price)}
          </span>
          <span className="TextSmall ml-1 font-normal text-[#69729F]">
            {t("perMonth", "/month")}
          </span>
        </p>

        <div className="mt-4">
          <FreeBadge balance={plan.freeBalance} t={t} />
        </div>

        <ul className="mt-5 flex-1">
          {PRICING_FEATURE_KEYS.map((featureKey, index) => (
            <FeatureRow
              key={featureKey}
              featureKey={featureKey}
              spec={plan.specs[featureKey]}
              t={t}
              planKey={plan.key}
              isLast={index === PRICING_FEATURE_KEYS.length - 1}
            />
          ))}
        </ul>

        <div
          className={clsx(
            "mt-2 rounded-xl px-4 py-4",
            isHighlight ? "bg-[#FAF6F0]" : "bg-[#EEF2FF]"
          )}
        >
          <p
            className={clsx(
              "TextSmall font-semibold",
              isHighlight ? "text-[#B48755]" : "text-[#293B93]"
            )}
          >
            {t("thresholdTitle", "Free Threshold")}
          </p>
          <p
            className={clsx(
              "TextSmall mt-1 font-normal leading-relaxed",
              isHighlight ? "text-[#B48755]/80" : "text-[#293B93]/80"
            )}
          >
            {t(
              `plans.${plan.key}.thresholdDesc`,
              t("thresholdDesc", "Maintain a minimum balance of {balance} to use at no cost.").replace(
                "{balance}",
                `$${plan.freeBalance.toLocaleString()}`
              )
            )}
          </p>
        </div>

        <a
          href="#apply-vps"
          onClick={handleSubscribe}
          className={clsx(
            "TextButton mt-6 flex h-11 w-full items-center justify-center rounded-lg font-semibold transition hover:no-underline",
            isHighlight
              ? "bg-[#B48755] text-white hover:bg-[#b8925f]"
              : "bg-[#293B93] text-white hover:bg-[#243575]"
          )}
        >
          {t(`plans.${plan.key}.cta`, `Subscribe Now`)}
        </a>
      </div>
    </article>
  );
}

export default function VpsHostingPricingSection() {
  const t = usePathTranslation("vpsHostingPage.pricing");

  return (
    <section id="pricing" className="bg-[#F8F9FC] pb-24 scroll-mt-24">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="TextSmall font-semibold uppercase tracking-[0.22em] text-[#293B93]">
                <span  >
                  {t("eyebrowAccent", "Configuration")}
                </span>{" "}
                {t("eyebrowRest", "Plans")}
              </p>
              <h2 className="HeadingH1 mt-4 font-semibold text-[#000]">
                {t("title", "Choose Your VPS Plan")}
              </h2>
              <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#000032]">
                {t(
                  "subtitle",
                  "Three tiers engineered for different trading intensities. All plans include Windows Server and pre-installed MT4/MT5."
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-10 lg:hidden">
            <MobilePeekCarousel
              items={PRICING_PLANS}
              renderItem={(plan) => (
                <div className="px-1 pb-2 pt-4">
                  <PricingCard plan={plan} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-14 hidden items-stretch gap-6 lg:grid lg:grid-cols-3 lg:gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <FadeInSection key={plan.key} delay={index * 0.08} className="h-full">
                <PricingCard plan={plan} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
