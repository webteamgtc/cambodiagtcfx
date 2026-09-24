"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import {
  DEPOSIT_PROGRESS_PATH,
  DEPOSIT_STEPS,
  DEPOSIT_TUTORIAL_PDF_HREF,
} from "../depositData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function CheckIcon() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13.0616 7.26667C13.312 7.26667 13.5264 7.3556 13.7051 7.53333C13.882 7.71107 13.9715 7.92507 13.9715 8.17507C13.9715 8.42493 13.8808 8.64173 13.7008 8.82227L9.844 12.6777C9.67013 12.8528 9.4568 12.9417 9.2048 12.9417C8.94893 12.9417 8.73373 12.8528 8.55893 12.6777L6.62693 10.7528C6.45253 10.5777 6.36427 10.3639 6.36427 10.1056C6.36427 9.8556 6.4536 9.6416 6.63053 9.46387C6.80947 9.28613 7.02307 9.1972 7.27387 9.1972C7.52507 9.1972 7.74027 9.28613 7.92027 9.46667L9.206 10.7528L12.4157 7.536C12.5957 7.35547 12.8113 7.26373 13.0623 7.26373L13.0616 7.26667ZM10.0001 1.81947C8.89227 1.81947 7.832 2.03613 6.82173 2.46947C5.81187 2.9 4.94187 3.48333 4.21267 4.21107C3.48293 4.94173 2.90147 5.81107 2.46893 6.82227C2.0356 7.83053 1.8196 8.8916 1.81893 10C1.8176 11.1056 2.03507 12.1667 2.46893 13.1777C2.902 14.1889 3.4836 15.0584 4.21267 15.7889C4.94067 16.5167 5.8108 17.0972 6.82173 17.5305C7.83333 17.9639 8.89293 18.1805 10.0001 18.1805C11.1071 18.1805 12.1667 17.9639 13.1783 17.5305C14.1897 17.0972 15.0592 16.5167 15.7873 15.7889C16.5168 15.0583 17.098 14.1889 17.5319 13.1777C17.9649 12.1667 18.1825 11.1056 18.1811 10C18.1805 8.8916 17.9644 7.83067 17.5317 6.82227C17.0984 5.81107 16.5171 4.9416 15.7873 4.21107C15.0587 3.48333 14.1881 2.9 13.1783 2.46947C12.168 2.03613 11.1076 1.81947 10.0001 1.81947ZM10.0001 0C11.3593 0 12.6555 0.264 13.8887 0.791733C15.1215 1.31947 16.1847 2.03053 17.0771 2.92227C17.9701 3.81387 18.6803 4.87773 19.208 6.11107C19.736 7.3444 20 8.64173 20 10C20 11.3584 19.736 12.6528 19.208 13.8889C18.6803 15.1195 17.9701 16.1833 17.0771 17.0749C16.1845 17.9695 15.1215 18.6805 13.8887 19.2056C12.6555 19.7333 11.3593 20 10 20C8.64107 20 7.3444 19.7333 6.1112 19.2056C4.8784 18.6805 3.8152 17.9695 2.9228 17.0749C2.02973 16.1833 1.3196 15.1195 0.791867 13.8889C0.264 12.6528 0 11.3583 0 10C0 8.6416 0.264 7.3444 0.792 6.11107C1.31973 4.87773 2.02987 3.81387 2.92293 2.92227C3.81547 2.03053 4.87853 1.31947 6.11133 0.7916C7.34453 0.264 8.64133 0 10.0001 0Z" fill="#293B93" />
    </svg>
  );
}

function StepIcon() {
  return (
    <span className="mt-7 flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#E1E7F6]">
      <span className="flex h-7 w-7 items-center justify-center rounded-full">
        <CheckIcon />
      </span>
    </span>
  );
}

function StepColumn({ item, showDivider, showArrow, t }) {
  return (
    <div
      className={`relative p-6 text-left md:p-8 ${showDivider ? "lg:border-l lg:border-[#E1E7F6]" : ""}`}
    >
      {showArrow ? (
        <span
          className="absolute -left-4 top-1/2 z-10 hidden h-8 w-8 bg-[#F8F9FC] -translate-y-1/2 items-center justify-center rounded-full border border-[#E1E7F6] text-sm text-[#69729F] lg:flex"
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
            <path d="M0.53558 10C0.672726 10 0.809891 9.9416 0.914531 9.8244L4.84303 5.42454C5.05232 5.19053 5.05232 4.8105 4.84303 4.57608L0.914531 0.175809C0.705232 -0.0586031 0.366274 -0.0586031 0.156975 0.175809C-0.0523243 0.409813 -0.0523243 0.78985 0.156975 1.02426L3.70652 5.00009L0.156975 8.97554C-0.0523243 9.20995 -0.0523243 9.58958 0.156975 9.82399C0.261269 9.9416 0.398434 10 0.53558 10Z" fill="#69729F" />
          </svg>
        </span>
      ) : null}

      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#293B93] text-xs font-semibold text-white">
          {item.step}
        </span>
        <span className="text-xs font-semibold text-[#293B93]">{t("stepLabel", "Step")}</span>
      </div>

      <StepIcon />

      <h3 className="Text leading-snug mt-7 font-semibold text-[#000]">{t(`steps.${item.key}.title`, item.title)}</h3>
      <p className="text-xs mt-2 font-normal leading-[1.65] text-[#999]">
        {t(`steps.${item.key}.description`, item.description)}
      </p>
    </div>
  );
}

function PdfIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M11.9167 10.9997H14.6667L11 14.6663L7.33333 10.9997H10.0833V7.33301H11.9167V10.9997ZM13.75 3.66634H4.58333V18.333H17.4167V7.33301H13.75V3.66634ZM2.75 2.74234C2.75 2.24001 3.15975 1.83301 3.66575 1.83301H14.6667L19.25 6.41634V19.2433C19.2508 19.3636 19.228 19.483 19.1827 19.5945C19.1374 19.7061 19.0706 19.8076 18.9861 19.8933C18.9015 19.979 18.801 20.0473 18.6901 20.0941C18.5792 20.141 18.4601 20.1655 18.3398 20.1663H3.66025C3.41951 20.1647 3.1891 20.0683 3.01878 19.8982C2.84847 19.7281 2.75192 19.4977 2.75 19.257V2.74234Z" fill="#293B93"/>
</svg>
  );
}

export default function DepositStepsSection() {
  const t = usePathTranslation("depositPage.stepsSection");

  return (
    <section className=" py-2 md:py-4">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
            {t("eyebrow", "How It Works")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-[#000]">
            {t("title", "How do I deposit funds?")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "Deposit funds in three steps, the whole process takes no more than two minutes.")}
          </p>

          <div className="mt-10 overflow-hidden rounded-[20px] border border-[#E1E7F6] bg-white text-left lg:mt-12">
            <div className="grid divide-y divide-[#E1E7F6] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {DEPOSIT_STEPS.map((item, index) => (
                <StepColumn
                  key={item.key}
                  item={item}
                  showDivider={index > 0}
                  showArrow={index > 0}
                  t={t}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-[10px] border border-[#E1E7F6] bg-white px-5 py-4 text-left md:px-6 md:py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              {DEPOSIT_PROGRESS_PATH.map((item, index) => (
                <span key={item.key} className="inline-flex items-center gap-6">
                  {index > 0 ? (
                    <span className="text-xs font-medium text-[#C5CDE8]" aria-hidden>
                      →
                    </span>
                  ) : null}
                  <span
                    className={`text-xs font-medium md:text-sm ${item.highlight ? "font-medium text-[#22C55E]" : "text-[#000]"
                      }`}
                  >
                    • {t(`progressPath.${index}`, item.label)}
                  </span>
                </span>
              ))}
            </div>

            <a
              href={DEPOSIT_TUTORIAL_PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 rounded-[10px] border border-[#E1E7F6] bg-white px-4 py-2.5 text-xs font-normal text-[#000] transition hover:border-[#293B93]/30 hover:no-underline md:text-sm"
            >
              <PdfIcon />
              {t("tutorialCta", "Download the complete tutorial PDF")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
