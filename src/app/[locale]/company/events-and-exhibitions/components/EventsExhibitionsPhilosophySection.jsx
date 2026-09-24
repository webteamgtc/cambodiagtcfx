"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "../../../LocaleProvider";

const PHILOSOPHY_CARDS = [
  {
    key: "faceToFace",
    number: "01",
    title: "Face-to-Face with Traders",
    description:
      "Exhibitions are our most important channel for genuinely listening to the market — collecting first-hand feedback, understanding real needs, and building relationships that no digital channel can replicate.",
    titleKey: "cards.faceToFace.title",
    descriptionKey: "cards.faceToFace.description",
    icon: UsersIcon,
  },
  {
    key: "industrySync",
    number: "02",
    title: "Staying in Industry Sync",
    description:
      "Understanding regulatory shifts, emerging technologies, and competitive dynamics in real time — so our products evolve continuously and our clients always operate with the most current intelligence.",
    titleKey: "cards.industrySync.title",
    descriptionKey: "cards.industrySync.description",
    icon: GlobeIcon,
  },
  {
    key: "lastingTrust",
    number: "03",
    title: "Building Lasting Trust",
    description:
      "Physical presence is the most powerful complement to digital credibility. When you meet our team in person, you experience the people and values behind the brand — and that builds the kind of trust that lasts.",
    titleKey: "cards.lastingTrust.title",
    descriptionKey: "cards.lastingTrust.description",
    icon: ShieldIcon,
  },
];

function UsersIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25" fill="none">
      <path d="M21.3 25C20.7 25 20.1 24.5455 20.1 23.7879V21.2121C20.1 20.1515 19.65 19.2424 18.9 18.4848C18.15 17.7273 17.25 17.2727 16.2 17.2727H6.3C5.25 17.2727 4.35 17.7273 3.6 18.4848C2.85 19.2424 2.4 20.1515 2.4 21.2121V23.7879C2.4 24.3939 1.95 25 1.2 25C0.45 25 0 24.5455 0 23.7879V21.2121C0 19.5455 0.6 18.0303 1.8 16.8182C3 15.6061 4.5 15 6.15 15H16.2C17.85 15 19.35 15.6061 20.55 16.8182C21.75 18.0303 22.35 19.5455 22.35 21.2121V23.7879C22.35 24.5455 21.9 25 21.3 25ZM11.25 12.4242C7.8 12.4242 5.1 9.69697 5.1 6.21212C5.1 2.72727 7.8 0 11.25 0C14.7 0 17.4 2.72727 17.4 6.21212C17.4 9.69697 14.7 12.4242 11.25 12.4242ZM11.25 2.27273C9.15 2.27273 7.35 4.09091 7.35 6.21212C7.35 8.33333 9.15 10.1515 11.25 10.1515C13.35 10.1515 15.15 8.33333 15.15 6.21212C15.15 4.09091 13.35 2.27273 11.25 2.27273ZM28.8 25C28.2 25 27.6 24.5455 27.6 23.7879V21.2121C27.6 20.303 27.3 19.5455 26.85 18.7879C26.4 18.0303 25.65 17.5758 24.75 17.4242C24.15 17.2727 23.85 16.6667 24 16.0606C24.15 15.4545 24.75 15.1515 25.35 15.303C26.7 15.6061 27.9 16.3636 28.65 17.5758C29.55 18.6364 30 20 30 21.3636V23.9394C29.85 24.5455 29.4 25 28.8 25ZM19.95 12.2727C19.5 12.2727 19.05 11.9697 18.9 11.3636C18.75 10.7576 19.05 10.1515 19.65 10C20.55 9.84848 21.3 9.24242 21.75 8.63636C22.35 7.87879 22.5 7.12121 22.5 6.21212C22.5 5.30303 22.2 4.54545 21.75 3.78788C21.3 3.0303 20.55 2.57576 19.65 2.42424C19.05 2.27273 18.75 1.66667 18.9 1.06061C19.05 0.454545 19.65 0.151515 20.25 0.30303C21.6 0.606061 22.8 1.36364 23.55 2.57576C24.45 3.63636 24.9 5 24.9 6.36364C24.9 7.72727 24.45 9.09091 23.55 10.1515C22.65 11.2121 21.6 11.9697 20.25 12.4242C20.25 12.2727 20.1 12.2727 19.95 12.2727Z" fill="#293B93" />
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
      <path d="M12.5092 19.8935C12.745 19.8935 13.2783 19.4731 13.7842 18.3135C13.9783 17.8655 14.1458 17.3585 14.2842 16.809H10.7342C10.8725 17.3585 11.04 17.8663 11.235 18.3135C11.7408 19.4731 12.2742 19.8935 12.51 19.8935H12.5092ZM14.7292 12.9827C14.7292 12.2053 14.6767 11.44 14.5792 10.712H10.44C10.3417 11.44 10.29 12.2053 10.29 12.9827C10.29 13.7523 10.3408 14.5115 10.4367 15.2334H14.5817C14.6775 14.5115 14.7292 13.7514 14.7292 12.9818V12.9827ZM20.595 13C20.595 12.2061 20.4875 11.44 20.29 10.712H16.0425C16.13 11.4339 16.1783 12.1949 16.1783 12.9827C16.1783 13.7627 16.1308 14.5167 16.045 15.2334H20.305C20.4974 14.5058 20.595 13.7546 20.595 13ZM19.6917 9.13554C19.0329 7.80947 18.0468 6.68947 16.8346 5.89038C15.6224 5.09129 14.2276 4.64185 12.7933 4.58814C14.0942 4.81694 15.205 6.60314 15.7725 9.13554H19.6917Z" fill="#293B93" />
      <path d="M12.5 21.4188C13.9952 21.4188 15.4612 20.9881 16.7354 20.1744C18.0095 19.3607 19.042 18.1958 19.7183 16.809H15.7767C15.17 19.5347 13.935 21.4015 12.51 21.4015C11.0842 21.4015 9.84917 19.5347 9.24167 16.809H5.28167C5.95787 18.196 6.99033 19.3611 8.26449 20.1749C9.53866 20.9888 11.0047 21.4196 12.5 21.4197V21.4188ZM4.405 13C4.405 13.7739 4.50667 14.5219 4.695 15.2334H8.97417C8.88477 14.4865 8.84024 13.7345 8.84083 12.9818C8.84083 12.1949 8.88833 11.4339 8.97667 10.7111H4.71C4.50766 11.4559 4.40503 12.2261 4.405 13ZM5.30833 9.13554H9.24583C9.81417 6.60141 10.9258 4.81434 12.2283 4.58814C10.7904 4.63773 9.39115 5.08515 8.1748 5.88431C6.95845 6.68347 5.96898 7.80545 5.30833 9.13467V9.13554ZM11.235 7.65094C11.0433 8.09294 10.8767 8.59387 10.74 9.13554H14.2792C14.1539 8.62718 13.988 8.1306 13.7833 7.65094C13.2783 6.49134 12.745 6.07014 12.5092 6.07014C12.2742 6.07014 11.7408 6.49134 11.235 7.65094Z" fill="#293B93" />
      <path d="M24.0783 8.09467L22.7167 8.60427C23.2695 9.99833 23.5526 11.492 23.55 13C23.55 16.0697 22.4008 18.9557 20.3142 21.1267C19.2903 22.1971 18.0725 23.0457 16.7312 23.6234C15.3899 24.201 13.9518 24.4963 12.5 24.492C9.96094 24.4994 7.49809 23.5902 5.53167 21.9197C5.82586 21.468 5.95714 20.9228 5.90232 20.3802C5.84749 19.8376 5.6101 19.3326 5.23205 18.9544C4.854 18.5761 4.35961 18.349 3.83617 18.313C3.31272 18.2771 2.7939 18.4346 2.37129 18.7578C1.94868 19.0811 1.64948 19.5492 1.5265 20.0795C1.40353 20.6099 1.46469 21.1684 1.69919 21.6564C1.9337 22.1444 2.32646 22.5306 2.80813 22.7467C3.2898 22.9628 3.82941 22.995 4.33167 22.8375C6.59899 24.881 9.49973 26.0041 12.5 26C19.4033 26 25 20.1795 25 13C25 11.2641 24.6725 9.60874 24.0783 8.09467ZM1.45 13C1.45 9.93027 2.59917 7.04427 4.68583 4.87327C5.70968 3.80287 6.9275 2.95428 8.2688 2.37664C9.61011 1.79899 11.0483 1.50375 12.5 1.50801C15.0218 1.50074 17.4689 2.39753 19.4292 4.04734C19.1378 4.50105 19.0099 5.04725 19.0682 5.58949C19.1264 6.13172 19.367 6.63512 19.7475 7.01077C20.128 7.38643 20.6238 7.61018 21.1475 7.64252C21.6712 7.67486 22.1891 7.5137 22.6096 7.18751C23.0302 6.86132 23.3264 6.39108 23.4459 5.85982C23.5654 5.32856 23.5006 4.77046 23.2629 4.28408C23.0252 3.79769 22.6298 3.41431 22.1467 3.20163C21.6636 2.98895 21.1237 2.96066 20.6225 3.12174C18.3615 1.10377 15.4795 -0.0038753 12.5 1.01878e-05C5.59667 1.01878e-05 0 5.82054 0 13C0 14.7143 0.32 16.3505 0.9 17.849L2.23833 17.2787C1.71536 15.9179 1.44776 14.4655 1.45 13Z" fill="#293B93" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="26" viewBox="0 0 21 26" fill="none">
      <path d="M10.5 0C14.4 2.14118 17.7 3.97647 21 5.81176C21 13.4588 17.55 21.2588 10.5 26C3.45 21.2588 0 13.4588 0 5.81176C3 3.97647 6.6 2.14118 10.5 0ZM8.55 4.12941L7.35 4.74118C6.9 5.04706 6.6 5.2 6.3 5.35294C4.8 6.11765 3.75 6.72941 2.7 7.34118C2.85 13.3059 5.7 18.8118 10.5 22.3294C15.3 18.8118 18 13.3059 18.3 7.34118C17.55 6.88235 16.65 6.42353 15.75 5.96471C14.85 5.50588 11.85 3.82353 10.5 3.05882C9.9 3.51765 9.3 3.82353 8.55 4.12941Z" fill="#293B93" />
    </svg>
  );
}

function PhilosophyCard({ item, t }) {
  const Icon = item.icon;

  return (
    <article
      className="flex h-full min-w-0 flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-4 text-left md:p-6"
    >
      <span
        className="flex h-10 w-10 items-center justify-center"
        style={{
          borderRadius: "10px",
          border: "1px solid #E1E7F6",
          background: "#E1E7F6",
        }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="HeadingH5 mt-7 font-semibold text-[#000]">
        {t(item.titleKey, item.title)}
      </h3>

      <p className="text-xs mt-6 flex-1 font-normal leading-[1.65] text-[#666]">
        {t(item.descriptionKey, item.description)}
      </p>

      <p className="text-xs mt-8 font-normal text-[#999]">{item.number}</p>
    </article>
  );
}

export default function EventsExhibitionsPhilosophySection() {
  const t = usePathTranslation("eventsAndExhibitionsPage.philosophySection");

  return (
    <section className="bg-white pt-8 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
              {t("eyebrow", "Our Philosophy")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
              {t("title", "Why We Show Up, Every Time")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
              {t(
                "description",
                "Every feature we offer exists because our clients demanded security, speed, and transparency — and we delivered."
              )}
            </p>
          </FadeInSection>

          <div className="mt-10 text-left sm:hidden md:mt-14">
            <MobilePeekCarousel
              items={PHILOSOPHY_CARDS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <PhilosophyCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-10 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 md:mt-14 lg:grid-cols-3">
            {PHILOSOPHY_CARDS.map((item, index) => (
              <FadeInSection key={item.key} delay={index * 0.1}>
                <PhilosophyCard item={item} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
