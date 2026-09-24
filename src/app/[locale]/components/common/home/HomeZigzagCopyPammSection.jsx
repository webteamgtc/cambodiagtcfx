"use client";

import Image from "next/image";
import { usePathTranslation } from "../../../LocaleProvider";

const VISUAL_SRC = "/home/zigzag-copy-pamm-feature.webp";

function ZigzagFigure({ crop }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#eceef2] bg-[#f8f9fb] shadow-[0_16px_44px_rgba(15,23,42,0.07)]">
      <div className="relative aspect-[616/208] w-full sm:aspect-[616/205] lg:aspect-[616/212]">
        <Image
          src={VISUAL_SRC}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={
            crop === "top"
              ? "object-cover object-top"
              : "object-cover object-bottom"
          }
          priority={false}
        />
      </div>
    </div>
  );
}

export default function HomeZigzagCopyPammSection() {
  const t = usePathTranslation("home.zigzagCopyPamm");

  return (
    <section className="bg-white py-14 md:py-20 lg:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-20 lg:gap-24">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="order-2 max-w-xl md:order-1 md:justify-self-start">
              <h2 className="text-[1.625rem] font-bold leading-tight tracking-tight text-neutral-950 md:text-[1.875rem] lg:text-[2rem]">
                {t("copyTrading.title", "Hassle-Free Copy Trading")}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4b5563] md:text-base lg:max-w-[28rem]">
                {t(
                  "copyTrading.description",
                  "Automatically copy trades from top performers. Choose a trader, set your amount, and let the platform manage the rest for you."
                )}
              </p>
            </div>
            <div className="order-1 w-full md:order-2 md:justify-self-stretch">
              <ZigzagFigure crop="top" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="order-1 w-full md:order-1 md:justify-self-stretch">
              <ZigzagFigure crop="bottom" />
            </div>
            <div className="order-2 max-w-xl md:order-2 md:justify-self-end">
              <h2 className="text-[1.625rem] font-bold leading-tight tracking-tight text-neutral-950 md:text-[1.875rem] lg:text-[2rem]">
                {t("pamm.title", "Passive PAMM Investment")}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4b5563] md:text-base lg:max-w-[28rem]">
                {t(
                  "pamm.description",
                  "Invest with trusted managers using structured strategies. Your funds stay in your account, with transparent performance and minimal effort required."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
