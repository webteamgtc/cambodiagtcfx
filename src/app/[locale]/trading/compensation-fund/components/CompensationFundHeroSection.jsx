"use client";

import Button from "@/app/[locale]/components/common/Button";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import {
  COMPENSATION_FUND_PDF_HREF,
  FINANCIAL_COMMISSION_HREF,
  TRADER_BENEFITS,
} from "../compensationFundData";

function CheckIcon() {
  return (
    <svg className="w-4 h-4 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M7.56001 15.8631C6.77305 15.8149 5.98863 15.6499 5.22706 15.3681C3.22666 14.6243 1.63243 13.1519 0.738854 11.2226C-0.154725 9.29075 -0.241037 7.1355 0.497689 5.15034C1.23641 3.16517 2.71133 1.58871 4.6508 0.712904C6.48873 -0.11721 8.53228 -0.223831 10.4464 0.400659C10.5505 0.433661 10.8906 0.568205 10.9947 0.606284L10.3626 1.57602C10.3042 1.55317 10.2458 1.53286 10.1849 1.51256C8.51705 0.941376 6.72482 1.02261 5.12044 1.74864C3.46021 2.50006 2.19853 3.84805 1.56643 5.54635C0.2616 9.05466 2.08176 12.9844 5.62561 14.3019C6.28057 14.5456 6.95075 14.6852 7.61586 14.7233C10.5403 14.901 13.3581 13.19 14.4218 10.329C14.7213 9.52176 14.8635 8.68149 14.8457 7.82853C14.8457 7.79299 14.8432 7.75745 14.8432 7.72191L15.9068 7.09996C15.9094 7.14058 15.9855 7.76253 15.9855 7.80315C16.0084 8.80081 15.8434 9.78324 15.4905 10.7276C14.7518 12.7128 13.2769 14.2892 11.3374 15.165C10.1341 15.7083 8.84453 15.9418 7.56001 15.8631Z" fill="#04C120" />
      <path d="M16.3917 2.9367L14.5182 0.621515C14.5182 0.621515 11.9771 3.87089 11.3171 4.82794C10.5631 5.91952 8.72014 8.58757 7.75294 9.98886C7.37723 9.60554 6.96091 9.19429 6.68928 8.95566C6.04194 8.38702 3.6176 6.54147 3.6176 6.54147L2.59455 8.16362C2.59455 8.16362 5.08744 9.69946 5.8947 10.2478C7.19699 11.1312 7.83672 12.1086 7.83672 12.1086L8.48913 11.1236C9.38017 10.0193 11.2308 7.74984 11.9721 7.01365C12.8859 6.10484 16.3917 2.9367 16.3917 2.9367Z" fill="#04C120" />
      <path d="M7.83925 12.1314L7.8291 12.1162C7.82148 12.106 7.17415 11.1287 5.88963 10.258C5.09251 9.71724 2.61486 8.19155 2.58948 8.17632L2.57932 8.1687L3.6176 6.52371L3.62775 6.53132C3.65314 6.54909 6.05971 8.38702 6.69943 8.94805C6.9279 9.14859 7.28077 9.4913 7.75294 9.97109L11.3069 4.82286C11.9619 3.87597 14.4827 0.646902 14.5081 0.6139L14.5182 0.601207L14.5284 0.6139L16.4095 2.93924L16.3993 2.94685C16.3638 2.97731 12.8834 6.12515 11.9822 7.02127C11.2562 7.74476 9.48933 9.90509 8.49928 11.1312L7.83925 12.1314ZM2.61486 8.15855C2.7951 8.27025 5.13313 9.71216 5.90486 10.2351C7.10307 11.0474 7.7504 11.9537 7.83925 12.0832L8.48151 11.1135C9.47156 9.88732 11.2384 7.72445 11.967 7.00096C12.8479 6.12769 16.1785 3.11186 16.3765 2.93416L14.5182 0.639286C14.3456 0.862681 11.9594 3.91659 11.3273 4.83301L7.75548 10.0066L7.74533 9.99648C7.27061 9.51161 6.91267 9.16636 6.6842 8.96328C6.06733 8.42256 3.80292 6.69379 3.62522 6.55671L2.61486 8.15855Z" fill="#04C120" />
    </svg>
  );
}

export default function CompensationFundHeroSection() {
  const t = usePathTranslation("compensationFundPage.hero");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pb-14 pt-10 md:pb-20 md:pt-18 lg:pt-20"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >


      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="min-w-0 text-left">
              <HeroTrustBadge className="!font-medium !uppercase ">
                {t("badge", "Client Protection")}
              </HeroTrustBadge>

              <h1 className="HeadingH1 mt-6 font-semibold text-[#000]">
                {t("title", "Security of Fund")}
              </h1>

              <p className="Text mt-5 font-normal leading-[1.7] text-[#000032]/60">
                {t(
                  "description",
                  "Both GTC Global Ltd and GTC Global Trade Capital Ltd jointed Financial Commission as official members — Financial Commission, an international organization dedicated to resolving financial service disputes in the foreign exchange industry and providing traders with additional financial protection."
                )}
              </p>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  href={FINANCIAL_COMMISSION_HREF}
                  external
                  variant="brand"
                  size="md"
                  showArrow
                  className="sm:min-w-[300px]"
                >
                  {t("primaryCta", "Visit the Financial Commission now")}
                </Button>

                <Button
                  href={COMPENSATION_FUND_PDF_HREF}
                  external
                  variant="secondary"
                  size="md"
                  className="border-[#E1E7F6] bg-white text-[#293B93] hover:bg-[#F8F9FC] sm:min-w-[220px]"
                >
                  {t("downloadCta", "Download PDF file")}
                </Button>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <article
              className="mt-10 overflow-hidden bg-white md:mt-16"
              style={{
                borderRadius: "20px",
                background: "#FFF",
                boxShadow: "0 0 35.3px 0 rgba(41, 59, 147, 0.06)",
              }}
            >
              <div className="grid md:grid-cols-2">
                <div className="border-b border-[#E1E7F6] p-6 md:border-b-0 md:border-r md:p-8 lg:p-10">
                  <h2 className="HeadingH5 font-semibold text-[#000032]">
                    {t("card.whatIsTitle", "What is the Financial Commission?")}
                  </h2>
                  <p className="TextSmall mt-4 font-normal leading-[1.7] text-[#000032]/60">
                    {t(
                      "card.whatIsDescription",
                      "As a neutral third-party commission, the Financial Commission impartially reviews and resolves transaction disputes, offering a simpler and faster solution compared to industry regulators and judicial proceedings. Independent of any party, the commission ensures that dispute resolution is swift, efficient, fair, and credible."
                    )}
                  </p>
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                  <h2 className="HeadingH5 font-semibold text-[#000032]">
                    {t("card.tradersTitle", "What does it bring to traders?")}
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {TRADER_BENEFITS.map((item, index) => (
                      <li key={item.key} className="flex gap-3">
                        <CheckIcon />
                        <span className="TextSmall font-normal leading-[1.65] text-[#000032]/60">
                          {t(`card.benefits.${index}`, item.text)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
