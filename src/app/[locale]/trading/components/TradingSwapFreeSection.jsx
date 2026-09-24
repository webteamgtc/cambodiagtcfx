"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";

const REGISTER_HREF =
  "/live-account-application";

const SWAP_FREE_IMAGE = "/new-design/Trading/Swap-Free_Trading_at_GTCFX.webp";

const FEATURE_KEYS = ["noSwapCharges", "regionBased", "transparent"];

function IconPercent({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 40 39" fill="none">
      <path d="M31.828 0.323242H26.344L8.22534 38.6116H13.7093L31.828 0.323242Z" fill="#293B93" />
      <path d="M40 31.5671V26.2429C40 21.4029 36.3987 18.8756 32.204 18.8756C27.9573 18.8756 24.408 21.4031 24.408 26.2429V31.5671C24.408 36.4071 27.9573 38.9337 32.204 38.9337C36.3987 38.9337 40 36.4071 40 31.5671ZM15.5907 12.6913V7.36747C15.5907 2.52747 11.9893 0 7.796 0C3.548 0 0 2.5276 0 7.36747V12.6913C0 17.5313 3.548 20.0587 7.796 20.0587C11.9893 20.0587 15.5907 17.5312 15.5907 12.6913ZM34.9467 31.3524C34.9467 33.3951 33.9253 34.4164 32.204 34.4164C30.4307 34.4164 29.4627 33.3951 29.4627 31.3524V26.4581C29.4627 24.4145 30.4307 23.3928 32.204 23.3928C33.9253 23.3928 34.9467 24.4145 34.9467 26.4581V31.3524ZM10.5373 12.4763C10.5373 14.5197 9.516 15.5415 7.796 15.5415C6.076 15.5415 5.05333 14.5197 5.05333 12.4763V7.58293C5.05333 5.53947 6.02133 4.51773 7.796 4.51773C9.516 4.51773 10.5373 5.53947 10.5373 7.58293V12.4763Z" fill="#293B93" />
    </svg>
  );
}

function IconGlobe({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40" fill="none">
      <path d="M19.5 39.2738C8.74273 39.2738 0 30.4724 0 19.6565C0 8.84052 8.74273 0.0391173 19.5 0.0391173C30.2573 0.0391173 39 8.84052 39 19.6565C39 30.4724 30.2573 39.2738 19.5 39.2738ZM19.5 1.99498C9.81845 1.99498 1.95587 9.91625 1.95587 19.6565C1.95587 29.3967 9.81845 37.318 19.5 37.318C29.1815 37.318 37.0441 29.3967 37.0441 19.6565C37.0441 9.91625 29.1815 1.99498 19.5 1.99498Z" fill="#293B93" />
      <path d="M19.5 39.2738C16.3315 39.2738 13.3781 37.1615 11.2071 33.3084C9.1339 29.651 7.9995 24.8004 7.9995 19.6369C7.9995 14.4734 9.1339 9.64243 11.2071 5.9654C13.3781 2.1319 16.3119 0 19.5 0C22.0231 0 24.4092 1.32999 26.3847 3.85306C26.7171 4.28335 26.6389 4.88967 26.2282 5.22217C25.7979 5.55466 25.1916 5.47643 24.8591 5.0657C23.7442 3.65747 21.9057 1.95587 19.5196 1.95587C17.0747 1.95587 14.7472 3.71615 12.9478 6.92377C11.0507 10.3074 9.99448 14.8059 9.99448 19.6174C9.99448 24.4288 11.0507 28.9468 12.9478 32.3109C14.7472 35.5186 17.0943 37.2788 19.5196 37.2788C21.9644 37.2788 24.2919 35.5186 26.0913 32.3109C27.9885 28.9273 29.0446 24.4288 29.0446 19.6174C29.0446 18.9132 29.0251 18.1896 28.9664 17.4855C28.9273 16.9378 29.338 16.488 29.8857 16.4488C30.4333 16.4097 30.8831 16.8205 30.9223 17.3681C30.9614 18.1113 31.0005 18.8741 31.0005 19.6174C31.0005 24.7613 29.8661 29.6118 27.7929 33.2889C25.6219 37.1615 22.6685 39.2738 19.5 39.2738Z" fill="#293B93" />
      <path d="M29.4554 14.6299C28.986 14.6299 28.5948 14.2974 28.497 13.828C28.1058 11.7548 27.4995 9.85757 26.7171 8.17553C26.4824 7.68656 26.6976 7.0998 27.1866 6.88465C27.6755 6.64995 28.2623 6.8651 28.4774 7.35406C29.338 9.19258 29.9834 11.2462 30.4137 13.4759C30.5115 14.004 30.1595 14.5125 29.6314 14.6299H29.4554ZM19.5 39.2738C18.9524 39.2738 18.5221 38.8435 18.5221 38.2959V1.01705C18.5221 0.469408 18.9524 0.0391173 19.5 0.0391173C20.0476 0.0391173 20.4779 0.469408 20.4779 1.01705V38.2959C20.4779 38.8435 20.0476 39.2738 19.5 39.2738Z" fill="#293B93" />
      <path d="M38.0221 21.2407H0.977934C0.430291 21.2407 0 20.8104 0 20.2628C0 19.7151 0.430291 19.2849 0.977934 19.2849H38.0221C38.5697 19.2849 39 19.7151 39 20.2628C39 20.8104 38.5697 21.2407 38.0221 21.2407Z" fill="#293B93" />
    </svg>
  );
}

function IconNetwork({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="45" height="39" viewBox="0 0 45 39" fill="none">
      <path d="M39.8672 26.8513L36 29.0602L30.9375 26.5062V19.9487L23.9766 23.9522V32.1664L29.4609 29.1292L34.7344 31.7522V35.6177L39.8672 38.5168L45 35.6177V29.8195L39.8672 26.8513ZM29.25 24.2283C29.1797 24.2973 29.1797 24.4354 29.1094 24.5735C29.1094 24.6425 29.0391 24.7805 29.0391 24.9876C29.0391 25.0566 28.9688 25.0566 28.9688 25.0566C28.9688 25.0566 28.8281 24.9876 28.6172 24.9186C28.4063 24.7805 28.1953 24.7805 28.0547 24.7805C27.7734 24.7805 27.6328 24.9186 27.6328 25.1947C27.6328 25.3327 27.7734 25.5398 28.0547 25.6779C28.4766 25.954 28.7578 26.092 28.8281 26.1611C29.1094 26.3681 29.25 26.7133 29.25 27.0584C29.25 27.7487 28.8281 28.2319 27.9141 28.508V29.1982C27.9141 29.1982 27.9141 29.2673 27.8438 29.2673H27.2109V28.646C26.5078 28.646 26.0859 28.577 26.0859 28.508V27.9557C26.0859 27.8867 26.0859 27.8177 26.0156 27.6796C26.0156 27.5416 25.9453 27.4726 25.9453 27.4035C25.9453 27.3345 25.9453 27.3345 26.0156 27.3345C26.0859 27.3345 26.2266 27.3345 26.3672 27.4035C26.5078 27.4726 26.6484 27.4726 26.7891 27.4726C27.2813 27.4726 27.4922 27.3345 27.4922 27.0584C27.4922 26.9204 27.3516 26.7133 27.0703 26.5752C26.6484 26.2991 26.3672 26.092 26.2969 26.023C26.0156 25.7469 25.875 25.4708 25.875 25.1947C25.875 24.8496 26.0156 24.5044 26.2969 24.2283C26.5781 23.9522 26.8594 23.8142 27.2109 23.7451V23.2619C27.2109 23.1929 27.2813 23.1239 27.2813 23.1239H27.9844C27.9844 23.1239 28.0547 23.1929 28.0547 23.2619V23.7451C28.1953 23.7451 28.4766 23.8142 28.8281 23.9522C29.25 24.0903 29.4609 24.1593 29.4609 24.2973C29.25 24.1593 29.25 24.1593 29.25 24.2283ZM42.8203 34.3062L39.8672 35.9628L36.9141 34.3062V30.9239L39.8672 29.2673L42.8203 30.9239V34.3062ZM23.6953 14.8407V10.7681L27.2813 8.76637V2.89911L22.1484 0L17.0156 2.89911V8.69734L20.6016 10.6991V15.0478L15.6797 17.5327L22.4297 21.5363L29.5313 17.9469L23.6953 14.8407ZM22.3594 9.1115H22.0078L19.2656 7.52389L19.1953 4.14159L22.1484 2.48496L25.1016 4.14159V7.52389L22.3594 9.1115ZM14.2031 19.9487V26.2991L8.71875 29.3363L5.13281 27.3345L0 30.3027V36.1009L5.13281 39L10.2656 36.1009V32.0283L15.6094 29.0602L20.8828 32.2354V23.9522L14.2031 19.9487ZM8.08594 34.8584L5.13281 36.515L2.17969 34.8584V31.4761L5.13281 29.8195L8.08594 31.4761V34.8584ZM19.125 24.2283C19.0547 24.2973 19.0547 24.4354 18.9844 24.5735C18.9844 24.6425 18.9141 24.7805 18.9141 24.9876C18.9141 25.0566 18.8438 25.0566 18.8438 25.0566C18.8438 25.0566 18.7031 24.9876 18.4922 24.9186C18.2812 24.7805 18.0703 24.7805 17.9297 24.7805C17.6484 24.7805 17.5078 24.9186 17.5078 25.1947C17.5078 25.3327 17.6484 25.5398 17.9297 25.6779C18.3516 25.954 18.6328 26.092 18.7031 26.1611C18.9844 26.3681 19.125 26.7133 19.125 27.0584C19.125 27.7487 18.7031 28.2319 17.7891 28.508V29.1982C17.7891 29.1982 17.7891 29.2673 17.7188 29.2673H17.0859V28.646C16.3828 28.646 15.9609 28.577 15.9609 28.508V27.9557C15.9609 27.8867 15.9609 27.8177 15.8906 27.6796C15.8906 27.5416 15.8203 27.4726 15.8203 27.4035C15.8203 27.3345 15.8203 27.3345 15.8906 27.3345C15.9609 27.3345 16.1016 27.3345 16.2422 27.4035C16.3828 27.4726 16.5234 27.4726 16.6641 27.4726C17.1562 27.4726 17.3672 27.3345 17.3672 27.0584C17.3672 26.9204 17.2266 26.7133 16.9453 26.5752C16.5234 26.2991 16.2422 26.092 16.1719 26.023C15.8906 25.7469 15.75 25.4708 15.75 25.1947C15.75 24.8496 15.8906 24.5044 16.1719 24.2283C16.4531 23.9522 16.7344 23.8142 17.0859 23.7451V23.2619C17.0859 23.1929 17.1562 23.1239 17.1562 23.1239H17.8594C17.8594 23.1239 17.9297 23.1929 17.9297 23.2619V23.7451C18.0703 23.7451 18.3516 23.8142 18.7031 23.9522C19.125 24.0903 19.3359 24.1593 19.3359 24.2973C19.1953 24.1593 19.1953 24.1593 19.125 24.2283Z" fill="#293B93" />
    </svg>
  );
}

const FEATURE_ICONS = {
  noSwapCharges: IconPercent,
  regionBased: IconGlobe,
  transparent: IconNetwork,
};

function ConcentricCirclesBg() {
  const rings = [
    "left-[6%] h-[220px] w-[220px] -translate-y-1/2 opacity-[0.45]",
    "left-[10%] h-[170px] w-[170px] -translate-y-1/2 opacity-[0.35]",
    "right-[18%] h-[200px] w-[200px] -translate-y-1/2 opacity-[0.4]",
    "right-[22%] h-[140px] w-[140px] -translate-y-1/2 opacity-[0.3]",
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      aria-hidden
    >
      {rings.map((ringClass, index) => (
        <span
          key={index}
          className={`absolute top-1/2 rounded-full border border-[#E1E7F6] ${ringClass}`}
          style={{
            borderRadius: "20px",
          }}
        />
      ))}
    </div>
  );
}

function BottomFeature({ featureKey, t, isMobile }) {
  const Icon = FEATURE_ICONS[featureKey];
  const line1 = t(
    `features.${featureKey}.titleLine1`,
    t(`features.${featureKey}.title`, "")
  );
  const line2 = t(`features.${featureKey}.titleLine2`, "");

  return (
    <div className={`flex min-w-0 items-center gap-3 sm:gap-3.5 ${isMobile ? "justify-center md:justify-start" : ""}`}>
      <Icon className="h-5 w-5 shrink-0 text-[#293B93] sm:h-6 sm:w-6" />
      <p className="TextSmall font-bold text-[#000]">
        <span className="block">{line1}</span>
        {line2 ? <span className="block">{line2}</span> : null}
      </p>
    </div>
  );
}

function SwapFreeCtaBar({ t }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-[28px] bg-[#f7f8fb] sm:mt-10 sm:rounded-[32px]"
      style={{
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 46.03%, rgba(183, 190, 222, 0.13) 71.98%, rgba(41, 59, 147, 0.04) 100%)"
      }}
    >
      <ConcentricCirclesBg />
      <div className="relative flex flex-col items-stretch gap-8 px-6 py-8 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10 lg:py-10">
        <div className="min-w-0 lg:flex-1">
          <div className="lg:hidden">
            <MobilePeekCarousel
              items={FEATURE_KEYS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-2 px-2 min-w-0 sm:-mx-4 sm:px-4"
              slideClassName="!h-auto"
              renderItem={(key) => (
                <div className="w-full min-w-0">
                  <BottomFeature featureKey={key} t={t} isMobile={true} />
                </div>
              )}
            />
          </div>

          <div className="hidden min-w-0 items-center justify-between gap-4 lg:flex lg:flex-1 lg:flex-nowrap xl:gap-6">
            {FEATURE_KEYS.map((key) => (
              <BottomFeature key={key} featureKey={key} t={t} isMobile={false} />
            ))}
          </div>
        </div>
        <div className="flex shrink-0 justify-center lg:justify-end md:flex-[.5]">
          <Button
            href={REGISTER_HREF}
            external
            variant="brand"
            size="md"
            showArrow
          >
            {t("cta", "Open Account")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TradingSwapFreeSection() {
  const t = usePathTranslation("tradingPage.swapFreeSection");

  return (
    <section className="overflow-x-hidden bg-white pt-10 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h2 className="HeadingH1 mx-auto max-w-3xl text-center leading-[1.15] text-[#111827]">
            <span className="block">{t("titleLine1", "Swap-Free Trading at")}</span>
            <span className="block">{t("titleLine2", "GTCFX")}</span>
          </h2>

          <div className="mt-10 grid min-w-0 gap-8 md:mt-12 lg:mt-16 lg:grid-cols-[minmax(0,190px)_1fr_minmax(0,190px)] lg:gap-3 xl:grid-cols-[minmax(0,210px)_1fr_minmax(0,210px)] xl:gap-5">
            <p className="Text order-2 max-w-[340px] justify-self-center text-center md:text-left leading-[1.65] text-[#666666] sm:max-w-[380px] lg:order-none lg:max-w-[200px] lg:justify-self-end lg:text-[15px] lg:leading-[1.7] xl:max-w-[220px]">
              {t(
                "descriptionLeft",
                "Trade without overnight swap charges on selected instruments — designed for traders who require interest-free trading conditions for religious or personal reasons."
              )}
            </p>

            <div className="relative order-1 w-full min-w-0 justify-self-stretch leading-none lg:order-none lg:-mx-2 xl:-mx-4">
              <div className="relative mx-auto inline-block w-full max-w-[640px] sm:max-w-[720px] lg:max-w-none">
                <Image
                  src={SWAP_FREE_IMAGE}
                  alt={t(
                    "imageAlt",
                    "Smartphone with MetaTrader 5 and swap-free trading coins"
                  )}
                  width={920}
                  height={680}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority={false}
                />
              </div>
            </div>

            <p className="Text text-center md:text-left order-3 max-w-[340px] justify-self-center leading-[1.65] text-[#666666] sm:max-w-[380px] lg:order-none lg:max-w-[200px] lg:justify-self-start lg:text-[15px] lg:leading-[1.7] xl:max-w-[220px]">
              {t(
                "descriptionRight",
                "Swap-free trading removes these interest-based charges on eligible instruments. This structure is ideal for traders following Islamic financial principles or anyone who prefers interest-free conditions."
              )}
            </p>
          </div>

          <SwapFreeCtaBar t={t} />
        </div>
      </div>
    </section>
  );
}
