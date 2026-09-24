"use client";

import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { REGISTER_HREF } from "../swapFreeTradingData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function InvestingIcon() {
  return (
<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="26" height="15" viewBox="0 0 26 15" fill="none">
  <path d="M18.2 0L21.1761 2.86167L14.8321 8.96167L9.63213 3.96167L0 13.24L1.83387 15L9.63387 7.5L14.8339 12.5L23.0239 4.63833L26 7.5V0H18.2Z" fill="#293B93"/>
</svg>
  );
}

function WikiFxIcon() {
  return (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M4.43611 13.2028C2.93567 14.1386 1.81787 15.5094 0.512998 16.8284C0.408639 16.4029 0.307372 16.0502 0.237027 15.6904C-0.0180582 14.3952 -0.06764 13.0671 0.0901518 11.756C0.1238 11.5465 0.234232 11.3575 0.399363 11.227C1.00747 10.7882 1.6398 10.3849 2.29328 10.0192C2.94958 9.66655 3.65072 9.40008 4.37504 9.07874C2.93335 9.10852 1.63698 9.51999 0.38081 10.2591C0.387767 10.1227 0.370761 10.0318 0.39859 9.95889C0.798245 8.91494 1.18244 7.86393 1.61765 6.83487C1.84956 6.28625 2.26159 6.03545 2.92252 6.05112C5.34365 6.09815 7.76786 6.03153 10.189 6.08404C11.6206 6.11539 12.9641 6.59112 14.2427 7.24163C14.7792 7.51516 14.8565 8.01049 14.8666 8.53403C14.8774 9.09363 14.8735 9.07325 15.4216 9.23079C17.1114 9.71593 18.9095 11.0828 18.8136 13.5579C18.8028 13.8306 18.8136 14.1065 18.8136 14.4474C18.6776 14.344 18.5879 14.282 18.5044 14.2123C17.6912 13.5226 16.7698 13.1354 15.6945 13.2318C14.6071 13.329 13.5205 13.4419 12.4346 13.5704C12.1788 13.601 11.9345 13.7271 11.6856 13.8149L11.6987 13.9239C12.062 13.9474 12.4253 14.0022 12.7871 13.9889C13.8751 13.9567 14.9507 14.2295 15.8955 14.7774C16.2302 14.9663 16.5595 15.1881 16.5734 15.6928C16.4698 15.6677 16.3771 15.6693 16.3144 15.6262C15.4394 15.0203 14.4522 14.9913 13.4542 15.0556C12.5266 15.1159 11.609 15.2562 10.7487 15.6458C8.56949 16.6341 7.65191 18.624 8.26492 20.9941C8.68931 22.6337 9.50176 24.0852 10.3815 25.503C10.4549 25.6213 10.5252 25.7381 10.6242 25.9042C9.98877 25.9646 9.42059 25.9042 8.88256 25.6801C8.17988 25.3901 7.48416 25.0805 6.80157 24.7451C6.59946 24.6376 6.43123 24.4746 6.31611 24.2748C5.32664 22.5357 5.00197 20.6398 5.07927 18.6577C5.08468 18.5143 5.09782 18.3709 5.10478 18.2274C5.11069 18.1481 5.10177 18.0683 5.0785 17.9923C4.71363 18.7847 4.60154 19.6382 4.57216 20.5003C4.54279 21.3624 4.55902 22.2269 4.55902 23.1838C4.23049 22.8703 3.92205 22.6062 3.64376 22.3123C2.67263 21.2794 1.86435 20.1009 1.24737 18.8184C1.17837 18.6878 1.13966 18.543 1.13416 18.3949C1.12867 18.2469 1.15655 18.0996 1.21568 17.9641C1.81184 16.3985 2.73874 14.9842 3.93132 13.8204C4.11453 13.6394 4.30933 13.4693 4.49873 13.2945L4.43611 13.2028ZM12.968 9.85779C11.7661 9.97771 10.5583 9.69853 9.5265 9.06228C9.65405 9.44083 9.77541 9.82095 10.0073 10.1109C10.9234 11.2576 11.9948 11.3547 12.968 9.85779Z" fill="#293B93"/>
  <path d="M16.8718 4.67094H3.09877C3.22246 4.51419 3.30131 4.39114 3.39794 4.28691C6.29833 1.16759 9.85812 -0.249427 14.0773 0.0358575C14.1549 0.045361 14.2297 0.0711811 14.297 0.111667C14.3642 0.152153 14.4223 0.206415 14.4677 0.270982C15.2469 1.63941 16.0091 3.01645 16.7729 4.38879C16.8132 4.48001 16.8463 4.57436 16.8718 4.67094Z" fill="#293B93"/>
  <path d="M15.7401 0.313304C15.9449 0.348573 16.0563 0.358762 16.1622 0.386977C20.2252 1.48422 23.1194 3.99222 24.8873 7.84669C24.9546 7.9956 24.9646 8.24718 24.8835 8.37807C24.1514 9.57642 23.3938 10.7599 22.6417 11.9465C22.5915 12.0121 22.5375 12.0746 22.4801 12.1338L15.7401 0.313304Z" fill="#293B93"/>
  <path d="M18.7781 21.0207L25.4199 9.60463L25.5498 9.62109C25.6696 10.2528 25.8289 10.8798 25.9023 11.5162C26.2888 14.8973 25.5297 17.9947 23.6026 20.7864C23.5152 20.9141 23.3297 21.0489 23.189 21.0505C21.7728 21.0693 20.3566 21.0607 18.9373 21.0583C18.8834 21.05 18.8301 21.0374 18.7781 21.0207Z" fill="#293B93"/>
  <path d="M10.0266 21.9447H22.6687C22.5427 22.1015 22.4662 22.212 22.3742 22.3084C20.8444 23.9002 19.0502 25.0907 16.9468 25.7114C16.183 25.9364 15.3458 25.927 14.5396 25.9724C13.7812 26.0155 13.019 25.9991 12.2591 25.9834C12.1215 25.9834 11.9159 25.8925 11.8603 25.782C11.2496 24.5734 10.6628 23.3524 10.0715 22.1336C10.0512 22.0721 10.0362 22.0089 10.0266 21.9447Z" fill="#293B93"/>
</svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M13.0335 26L18.353 16.821C19.2586 15.5527 19.6843 14.0062 19.5545 12.4554C19.4246 10.9047 18.7478 9.44967 17.6437 8.34808H25.0909C26.3584 11.5473 26.2984 15.1166 24.9242 18.2719C23.55 21.4272 20.974 23.9105 17.7619 25.1762C16.2368 25.6876 14.6425 25.9654 13.0335 26ZM11.024 25.8823C9.33917 25.6285 7.72116 25.0464 6.26249 24.1695C4.80383 23.2926 3.53312 22.1381 2.52306 20.7718C1.513 19.4056 0.783399 17.8546 0.37599 16.2074C-0.0314191 14.5603 -0.108643 12.8493 0.148735 11.1724C0.355515 9.63143 0.878603 8.14932 1.68545 6.81825L7.00487 15.9972C7.67741 17.4079 8.82961 18.5361 10.2575 19.1823C11.6854 19.8284 13.2969 19.9507 14.8067 19.5276L11.024 25.8823ZM12.9153 17.7624C11.9801 17.7624 11.066 17.4864 10.2884 16.9691C9.51082 16.4519 8.90477 15.7167 8.54689 14.8566C8.18901 13.9965 8.09537 13.05 8.27782 12.1369C8.46026 11.2238 8.9106 10.3851 9.57187 9.72678C10.2331 9.06847 11.0757 8.62016 11.9929 8.43853C12.9101 8.2569 13.8608 8.35012 14.7248 8.70639C15.5888 9.06267 16.3273 9.666 16.8468 10.4401C17.3664 11.2142 17.6437 12.1243 17.6437 13.0553C17.6201 14.2963 17.1143 15.48 16.2327 16.3577C15.351 17.2354 14.162 17.7389 12.9153 17.7624ZM6.41383 11.4077L2.74934 4.93538C4.04349 3.28453 5.72397 1.97421 7.64399 1.11885C9.56402 0.263494 11.6652 -0.110884 13.7641 0.0284124C15.8629 0.167708 17.8956 0.816442 19.6846 1.91796C21.4735 3.01947 22.9644 4.54027 24.027 6.34753H12.7971C11.3439 6.44936 9.95586 6.98751 8.81623 7.89093C7.67659 8.79435 6.83893 10.0206 6.41383 11.4077Z" fill="#293B93"/>
  </svg>
  );
}

function RatingItem({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#E1E7F6">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#293B93] tabular-nums">{value}</p>
        <p className="text-xs font-normal text-[#666]">{label}</p>
      </div>
    </div>
  );
}

export default function SwapFreeTradingHeroSection({ locale = "en" }) {
  const t = usePathTranslation("swapFreeTradingPage.hero");
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pt-10 md:pt-18 lg:pt-20"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >
      <FadeInSection>
      <div className="relative container min-w-0 max-w-full pb-10 md:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <HeroTrustBadge overlayClass="!bg-[#E1E7F6]" className="!mx-auto font-medium !text-[#293B93]">
            {t("badge", "Swap-Free Trading")}
          </HeroTrustBadge>

          <h1 className="HeadingH1 mx-auto mt-8 max-w-2xl font-semibold text-[#000]">
            {t("headingPrefix", "Trade without")}{" "}
            <span className="text-[#293B93]">
              {t("accentTop", "swap")} <br className="hidden sm:block" />
              {t("accentBottom", "charges")}
            </span>
          </h1>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
            {t("sub", "Trade without overnight swap charges on selected instruments — designed for traders who require interest-free trading conditions for religious or personal reasons.")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              href={localizedHref(locale, "/trading/swap-free-trading#benefits")}
              variant="brand"
              size="md"
              showArrow
              className="sm:min-w-[270px]"
            >
              {t("exploreCta", "Explore Swap-Free Benefits")}
            </Button>
            <Button
              href={localizedHref(locale, "/trading/open-live-account")}
              variant="outline"
              size="md"
              className="border-[#E1E7F6] bg-white/70 text-[#293B93] sm:min-w-[180px]"
            >
              {t("openCta", "Open an Account")}
            </Button>
          </div>
        </div>
      </div>
      </FadeInSection>
      <FadeInSection delay={0.5}>
      <div className="">
        <div className="container min-w-0 max-w-full ">
          <div className="mx-auto flex max-w-6xl py-8  border-t border-[#E1E7F6] flex-col items-center gap-5 md:flex-row md:justify-between md:gap-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
              <RatingItem icon={<InvestingIcon />} value="4.1" label={t("ratings.investing", "Investing.com")} />
              <div className="hidden h-10 w-px bg-[#E1E7F6] sm:block" aria-hidden />
              <RatingItem icon={<WikiFxIcon />} value="9.3" label={t("ratings.wikifx", "WikiFX")} />
              <div className="hidden h-10 w-px bg-[#E1E7F6] sm:block" aria-hidden />
              <RatingItem icon={<GoogleIcon />} value="4.5" label={t("ratings.google", "Google")} />
            </div>
            <div className="hidden h-10 w-px bg-[#E1E7F6] sm:block" aria-hidden />

            <p className="max-w-[520px] text-center text-xs font-normal leading-[1.65] text-[#666] md:text-left">
            {t("regulatory", "FSCA authorised financial services provider, licensed and regulated in South Africa. FSP No. 51545.")}
            </p>
          </div>
        </div>
      </div>
      </FadeInSection>
    </section>
  );
}
