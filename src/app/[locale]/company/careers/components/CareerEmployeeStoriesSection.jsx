"use client";

import { usePathTranslation } from "../../../LocaleProvider";

const STATS = [
  {
    key: "recommend",
    value: "92%",
    description: "of employees recommend GTC to peers",
    valueKey: "stats.recommend.value",
    descriptionKey: "stats.recommend.description",
  },
  {
    key: "progression",
    value: "2.4x",
    description: "average career progression vs industry",
    valueKey: "stats.progression.value",
    descriptionKey: "stats.progression.description",
  },
];

function QuoteMark({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="40"
      viewBox="0 0 40 29"
      fill="none"
      aria-hidden
    >
      <path
        d="M40 0C39.2836 2.99864 38.5274 6.23401 37.7313 9.70612C36.9353 13.1782 36.2189 16.5714 35.5821 19.8857C34.9453 23.2 34.4279 26.2381 34.0299 29H22.6866L21.8507 27.698C22.5672 24.936 23.4826 21.9769 24.597 18.8204C25.7114 15.585 26.9453 12.3497 28.2985 9.11429C29.6517 5.87891 30.9652 2.84082 32.2388 0H40ZM17.9104 0C17.194 2.99864 16.4378 6.23401 15.6418 9.70612C14.8458 13.1782 14.1294 16.5714 13.4925 19.8857C12.8557 23.2 12.3383 26.2381 11.9403 29H0.716418L0 27.698C0.716418 24.936 1.63184 21.9769 2.74627 18.8204C3.8607 15.585 5.05473 12.3497 6.32836 9.11429C7.68159 5.87891 8.99502 2.84082 10.2687 0H17.9104Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AuthorMeta({ initial, name, role, nameKey, roleKey, t, centered = false }) {
  return (
    <div
      className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-semibold uppercase text-white"
        style={{
          borderRadius: "9998px",
          border: "1px solid #E1E7F6",
          background: "linear-gradient(138deg, #4B5FC1 12.98%, #293B93 64.07%)",
        }}
      >
        {initial}
      </span>
      <div className={`min-w-0 ${centered ? "text-left" : "text-left"}`}>
        <p className="TextSmall font-bold text-[#000]">
          {t(nameKey, name)}
        </p>
        <p className="text-xs mt-0.5 font-normal text-[#666666]">
          {t(roleKey, role)}
        </p>
      </div>
    </div>
  );
}

function StatCard({ stat, t }) {
  return (
    <article className="interactive-card flex items-center gap-5 rounded-[10px] border border-[#E1E7F6] bg-white px-5 py-5 ">
      <p className="HeadingH3 shrink-0 font-bold text-[#293B93]">
        {t(stat.valueKey, stat.value)}
      </p>
      <p className="Text font-normal leading-[1.55] text-[#666]">
        {t(stat.descriptionKey, stat.description)}
      </p>
    </article>
  );
}

export default function CareerEmployeeStoriesSection() {
  const t = usePathTranslation("careerPage.employeeStoriesSection");

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="relative px-2 sm:px-0">
            <QuoteMark className="absolute left-0 top-0 h-6 w-8 text-[#293B93] sm:h-10 sm:w-14" />

            <div className="mx-auto max-w-4xl pt-10 text-center sm:pt-16">
              <blockquote className="HeadingH4 font-medium leading-[1.65] text-[#293B93]">
                {t(
                  "featured.quote",
                  "GTC gave me the tools to grow faster than I thought possible. Within two years, I moved from analyst to leading my own portfolio — with genuine support at every step."
                )}
              </blockquote>

              {/* <div className="mt-8">
                <AuthorMeta
                  initial="J"
                  name="Jamie L."
                  role=""
                  nameKey="featured.name"
                  roleKey="featured.role"
                  t={t}
                  centered
                />
              </div> */}
            </div>
          </div>

          <div className="my-10 border-t border-[#E1E7F6] md:my-12" />

          <div className="grid max-w-5xl mx-auto items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 text-left">
              <p className="Text font-normal leading-[1.7] text-[#69729F]">
                {t(
                  "secondary.quote",
                  "The culture here is unlike any firm I've worked at. Decisions are made quickly, talent is recognized, and you always feel like you're building something meaningful."
                )}
              </p>

              {/* <div className="mt-8">
                <AuthorMeta
                  initial="S"
                  name="Sofia R."
                  role="Senior Risk Analyst · London"
                  nameKey="secondary.name"
                  roleKey="secondary.role"
                  t={t}
                />
              </div> */}
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              {STATS.map((stat) => (
                <StatCard key={stat.key} stat={stat} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
