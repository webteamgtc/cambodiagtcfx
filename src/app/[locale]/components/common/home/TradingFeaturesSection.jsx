"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathTranslation } from "../../../LocaleProvider";

export default function TradingFeaturesSection() {
  const t = usePathTranslation("home.homePammSection");

  const sections = [
    {
      title: t("items.one.title"),
      description: t("items.one.description"),
      primaryBtn: t("items.one.primaryBtn"),
      primaryHref: t("items.one.primaryHref"),
      secondaryBtn: t("items.one.secondaryBtn"),
      secondaryHref: t("items.one.secondaryHref"),
      image: t("items.one.image"),
      imageAlt: t("items.one.imageAlt"),
      reverse: t("items.one.reverse") === "true",
      imageCard: t("items.one.imageCard") === "true",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto space-y-20 px-4">
        {sections.map((item, index) => (
          <div
            key={index}
            className="grid items-center gap-10 md:gap-16 lg:grid-cols-2"
          >
            <div
              className={`order-1 flex justify-center ${
                item.reverse ? "lg:order-1" : "lg:order-2"
              }`}
            >
              {item.imageCard ? (
                <div>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={500}
                    height={600}
                    className="h-auto w-[350px] object-contain md:w-[506px]"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={500}
                    height={620}
                    className="h-auto w-[220px] object-contain md:w-[506px]"
                  />
                </div>
              )}
            </div>

            <div
              className={`order-2 mx-auto flex max-w-lg flex-col items-start gap-6 lg:mx-0 ${
                item.reverse ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <h2 className="HeadingH3">{item.title}</h2>

              <p className="Text">{item.description}</p>

              <div className="flex flex-row gap-3">
                <Link
                  href={item.primaryHref}
                  target="_blank"
                  className="rounded-xl bg-gradient-to-r from-[#B68756] via-[#995F22] to-[#995F22] px-3 py-2.5 text-[12px] font-medium text-white transition hover:from-[#263788] hover:via-[#101638] hover:to-[#263788] hover:no-underline hover:opacity-90 md:px-5 md:text-base"
                >
                  {item.primaryBtn}
                </Link>

                <Link
                  href={item.secondaryHref}
                  target="_blank"
                  className="rounded-xl border border-[#8f8f8f] bg-primary-gradient px-3 py-2.5 text-[12px] font-medium text-white transition hover:bg-white hover:no-underline md:px-5 md:text-base"
                >
                  {item.secondaryBtn}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}