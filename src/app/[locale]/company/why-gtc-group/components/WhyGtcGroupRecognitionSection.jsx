"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const RECOGNITION_ITEMS = [
  {
    key: "forexExpo",
    title: "Forex Expo Dubai",
    description:
      "Platinum sponsor and active exhibitor at the region's premier FX industry event, connecting with traders and professionals across MENA.",
    footer: "2023 - 2024",
    titleKey: "cards.forexExpo.title",
    descriptionKey: "cards.forexExpo.description",
    footerKey: "cards.forexExpo.footer",
    icon: GlobeIcon,
  },
  {
    key: "fintechSummit",
    title: "Fintech & Crypto Summit",
    description:
      "Strategic sponsor at Dubai's flagship fintech summit — showcasing our commitment to emerging financial technologies and innovation.",
    footer: "2024",
    titleKey: "cards.fintechSummit.title",
    descriptionKey: "cards.fintechSummit.description",
    footerKey: "cards.fintechSummit.footer",
    icon: SummitIcon,
  },
  {
    key: "financialCommission",
    title: "Financial Commission",
    description:
      "Full membership with the Financial Commission's independent dispute resolution and compensation fund — up to $20,000 per trader claim.",
    footer: "Member Since 2022",
    titleKey: "cards.financialCommission.title",
    descriptionKey: "cards.financialCommission.description",
    footerKey: "cards.financialCommission.footer",
    icon: InstitutionIcon,
  },
];

function GlobeIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
      <path d="M12.5092 19.8935C12.745 19.8935 13.2783 19.4731 13.7842 18.3135C13.9783 17.8655 14.1458 17.3585 14.2842 16.809H10.7342C10.8725 17.3585 11.04 17.8663 11.235 18.3135C11.7408 19.4731 12.2742 19.8935 12.51 19.8935H12.5092ZM14.7292 12.9827C14.7292 12.2053 14.6767 11.44 14.5792 10.712H10.44C10.3417 11.44 10.29 12.2053 10.29 12.9827C10.29 13.7523 10.3408 14.5115 10.4367 15.2334H14.5817C14.6775 14.5115 14.7292 13.7514 14.7292 12.9818V12.9827ZM20.595 13C20.595 12.2061 20.4875 11.44 20.29 10.712H16.0425C16.13 11.4339 16.1783 12.1949 16.1783 12.9827C16.1783 13.7627 16.1308 14.5167 16.045 15.2334H20.305C20.4974 14.5058 20.595 13.7546 20.595 13ZM19.6917 9.13554C19.0329 7.80947 18.0468 6.68947 16.8346 5.89038C15.6224 5.09129 14.2276 4.64185 12.7933 4.58814C14.0942 4.81694 15.205 6.60314 15.7725 9.13554H19.6917Z" fill="#293B93" />
      <path d="M12.5 21.4188C13.9952 21.4188 15.4612 20.9881 16.7354 20.1744C18.0095 19.3607 19.042 18.1958 19.7183 16.809H15.7767C15.17 19.5347 13.935 21.4015 12.51 21.4015C11.0842 21.4015 9.84917 19.5347 9.24167 16.809H5.28167C5.95787 18.196 6.99033 19.3611 8.26449 20.1749C9.53866 20.9888 11.0047 21.4196 12.5 21.4197V21.4188ZM4.405 13C4.405 13.7739 4.50667 14.5219 4.695 15.2334H8.97417C8.88477 14.4865 8.84024 13.7345 8.84083 12.9818C8.84083 12.1949 8.88833 11.4339 8.97667 10.7111H4.71C4.50766 11.4559 4.40503 12.2261 4.405 13ZM5.30833 9.13554H9.24583C9.81417 6.60141 10.9258 4.81434 12.2283 4.58814C10.7904 4.63773 9.39115 5.08515 8.1748 5.88431C6.95845 6.68347 5.96898 7.80545 5.30833 9.13467V9.13554ZM11.235 7.65094C11.0433 8.09294 10.8767 8.59387 10.74 9.13554H14.2792C14.1539 8.62718 13.988 8.1306 13.7833 7.65094C13.2783 6.49134 12.745 6.07014 12.5092 6.07014C12.2742 6.07014 11.7408 6.49134 11.235 7.65094Z" fill="#293B93" />
      <path d="M24.0783 8.09467L22.7167 8.60427C23.2695 9.99833 23.5526 11.492 23.55 13C23.55 16.0697 22.4008 18.9557 20.3142 21.1267C19.2903 22.1971 18.0725 23.0457 16.7312 23.6234C15.3899 24.201 13.9518 24.4963 12.5 24.492C9.96094 24.4994 7.49809 23.5902 5.53167 21.9197C5.82586 21.468 5.95714 20.9228 5.90232 20.3802C5.84749 19.8376 5.6101 19.3326 5.23205 18.9544C4.854 18.5761 4.35961 18.349 3.83617 18.313C3.31272 18.2771 2.7939 18.4346 2.37129 18.7578C1.94868 19.0811 1.64948 19.5492 1.5265 20.0795C1.40353 20.6099 1.46469 21.1684 1.69919 21.6564C1.9337 22.1444 2.32646 22.5306 2.80813 22.7467C3.2898 22.9628 3.82941 22.995 4.33167 22.8375C6.59899 24.881 9.49973 26.0041 12.5 26C19.4033 26 25 20.1795 25 13C25 11.2641 24.6725 9.60874 24.0783 8.09467ZM1.45 13C1.45 9.93027 2.59917 7.04427 4.68583 4.87327C5.70968 3.80287 6.9275 2.95428 8.2688 2.37664C9.61011 1.79899 11.0483 1.50375 12.5 1.50801C15.0218 1.50074 17.4689 2.39753 19.4292 4.04734C19.1378 4.50105 19.0099 5.04725 19.0682 5.58949C19.1264 6.13172 19.367 6.63512 19.7475 7.01077C20.128 7.38643 20.6238 7.61018 21.1475 7.64252C21.6712 7.67486 22.1891 7.5137 22.6096 7.18751C23.0302 6.86132 23.3264 6.39108 23.4459 5.85982C23.5654 5.32856 23.5006 4.77046 23.2629 4.28408C23.0252 3.79769 22.6298 3.41431 22.1467 3.20163C21.6636 2.98895 21.1237 2.96066 20.6225 3.12174C18.3615 1.10377 15.4795 -0.0038753 12.5 1.01878e-05C5.59667 1.01878e-05 0 5.82054 0 13C0 14.7143 0.32 16.3505 0.9 17.849L2.23833 17.2787C1.71536 15.9179 1.44776 14.4655 1.45 13Z" fill="#293B93" />
    </svg>
  );
}

function SummitIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3.54366 9.84848C3.56991 9.87475 3.58304 9.88788 3.60929 9.90101L6.61484 12.9081C6.62797 9.38889 9.48915 6.53939 13.0197 6.53939C14.7915 6.53939 16.3927 7.26162 17.5477 8.41717L24.6613 15.5343L24.95 15.2455C25.6194 14.6939 26 13.8798 26 13.0263C26 12.2515 25.685 11.5424 25.1863 11.0172L14.9621 0.787879C13.8597 -0.262626 12.1272 -0.262626 11.0247 0.787879L3.54366 8.27273C3.11055 8.70606 3.11055 9.40202 3.54366 9.84848ZM22.522 16.0727L19.4245 12.9737C19.4114 16.4929 16.5502 19.3424 13.0197 19.3424C11.3135 19.3424 9.67289 18.6596 8.46542 17.4384L1.41747 10.4L0.905603 10.9121C0.328117 11.4505 0 12.2121 0 13C0 13.8404 0.354366 14.5889 0.931853 15.1141L10.8541 25.0414C11.3922 25.6455 12.1797 26 12.9934 26C13.794 26 14.5159 25.6717 15.0278 25.1596L22.5351 17.6485C22.9551 17.202 22.9551 16.5061 22.522 16.0727Z" fill="#293B93" />
      <path d="M12.9934 16.4667C13.1378 16.4667 13.2691 16.4141 13.3609 16.3222L16.314 13.3677C16.524 13.1576 16.524 12.8293 16.314 12.6323L13.3609 9.67778C13.1641 9.48081 12.8491 9.48081 12.6391 9.67778L9.68602 12.6323C9.47602 12.8293 9.47602 13.1576 9.67289 13.3677L12.6259 16.3222C12.7178 16.4141 12.8491 16.4667 12.9934 16.4667Z" fill="#293B93" />
    </svg>
  );
}

function InstitutionIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
      <path d="M0 24.7558V23.1182C0.00172771 22.3592 0.304924 21.6319 0.843072 21.0958C1.38122 20.5597 2.11037 20.2586 2.87056 20.2586H4.51722V12.3689C4.52532 12.1513 4.61751 11.9454 4.77444 11.7943C4.93136 11.6432 5.14082 11.5587 5.35882 11.5585C5.81289 11.5585 7.8262 11.9168 7.84186 12.3689V20.2586H11.267L10.852 12.137C10.8742 11.6888 11.5044 11.5702 11.9546 11.5702C12.4034 11.5702 14.3124 11.6888 14.3346 12.137V20.2586H17.7009L17.4791 12.137C17.5013 11.6888 18.0715 11.5585 18.5204 11.5585C18.9692 11.5585 20.7503 11.922 20.7724 12.3689V20.2586H22.1294C22.8896 20.2586 23.6188 20.5597 24.1569 21.0958C24.6951 21.6319 24.9983 22.3592 25 23.1182V24.7558C24.9993 25.086 24.8674 25.4025 24.6333 25.6357C24.3992 25.869 24.082 26 23.7513 26H1.24739C0.916894 25.9997 0.600013 25.8685 0.366194 25.6353C0.132375 25.4021 0.000690514 25.0858 0 24.7558ZM23.3142 24.3194V23.1182C23.3135 22.8047 23.1882 22.5043 22.9658 22.283C22.7434 22.0617 22.4421 21.9375 22.1281 21.9379H2.87056C2.55657 21.9375 2.25528 22.0617 2.03289 22.283C1.8105 22.5043 1.68519 22.8047 1.6845 23.1182V24.3194H23.3181H23.3142ZM1.24609 10.0968C0.916746 10.0975 0.600582 9.96769 0.36697 9.7359C0.133358 9.50411 0.0013816 9.18926 0 8.86043V7.59541C0 7.07169 0.320981 6.52712 0.782881 6.26787L11.511 0.269797C11.8502 0.088709 12.2286 -0.00378948 12.6122 0.000118901C13.0245 0.000118901 13.4277 0.100434 13.7461 0.282825L24.2171 6.26396C24.6699 6.52321 24.9987 7.08211 24.9987 7.59411V8.85913C24.9982 9.02217 24.9655 9.18352 24.9025 9.33395C24.8396 9.48439 24.7476 9.62097 24.6317 9.7359C24.5159 9.85083 24.3785 9.94185 24.2275 10.0038C24.0764 10.0657 23.9146 10.0973 23.7513 10.0968H1.24609ZM23.3142 8.41617V7.68661L12.911 1.73935C12.8179 1.69644 12.716 1.67592 12.6135 1.67942C12.517 1.67534 12.4209 1.69409 12.333 1.73414L1.6858 7.68791V8.41487H23.3155L23.3142 8.41617Z" fill="#293B93" />
    </svg>
  );
}

function RecognitionCard({ item, t }) {
  const Icon = item.icon;

  return (
    <article className="interactive-card group flex h-full min-w-0 flex-col rounded-[22px] border border-[#E1E7F6] bg-white p-6 text-left sm:p-7">
      <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6]">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="HeadingH5 mt-6 font-bold text-[#111827]">
        {t(item.titleKey, item.title)}
      </h3>

      <p className="text-xs mt-4 flex-1 font-normal leading-[1.65] text-[#666] group-hover:!text-white">
        {t(item.descriptionKey, item.description)}
      </p>

      <p className="text-xs mt-6 font-normal text-[#293B93] group-hover:!text-white">
        {t(item.footerKey, item.footer)}
      </p>
    </article>
  );
}

export default function WhyGtcGroupRecognitionSection() {
  const t = usePathTranslation("whyGtcGroupPage.recognitionSection");

  return (
    <section className=" pt-8 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
            {t("eyebrow", "Industry Recognition")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4  font-bold text-[#000]">
            {t("title", "Recognized Across Global Stages")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t(
              "description",
              "Every feature we offer exists because our clients demanded security, speed, and transparency — and we delivered."
            )}
          </p>

          <div className="mt-8 text-left sm:hidden md:mt-12">
            <MobilePeekCarousel
              items={RECOGNITION_ITEMS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <RecognitionCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-8 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 md:mt-12 lg:grid-cols-3">
            {RECOGNITION_ITEMS.map((item) => (
              <RecognitionCard key={item.key} item={item} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
