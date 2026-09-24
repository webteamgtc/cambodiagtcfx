"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import TextArrowLink from "@/app/[locale]/components/common/TextArrowLink";
import { usePathTranslation } from "../../../LocaleProvider";

const FILTERS = [
  { key: "all", labelKey: "filters.all", label: "All" },
  { key: "technology", labelKey: "filters.technology", label: "Technology" },
  { key: "trading", labelKey: "filters.trading", label: "Trading" },
  { key: "remote", labelKey: "filters.remote", label: "Remote" },
];

const DEPARTMENT_BADGE = {
  trading: "bg-[#E1E7F6] text-[#293B93]",
  technology: "bg-[#F3E8FF] text-[#7C3AED]",
  compliance: "bg-[#F5F6F9] text-[#666666]",
  sales: "bg-[#EEF2FF] text-[#293B93]",
  marketing: "bg-[#FFF7ED] text-[#EA580C]",
  risk: "bg-[#F0FDF4] text-[#16A34A]",
  finance: "bg-[#F5F6F9] text-[#666666]",
};

const TYPE_BADGE = {
  fulltime: "bg-[#04C1201A] text-[#04C120]",
  remote: "bg-[#FFA5001A] text-[#FFA500]",
};

const OPEN_POSITIONS = [
  {
    key: "quant-analyst",
    departmentKey: "trading",
    type: "fulltime",
    title: "Senior Quantitative Analyst",
    department: "Trading",
    location: "London, UK",
    titleKey: "positions.quantAnalyst.title",
    departmentLabelKey: "positions.quantAnalyst.department",
    locationKey: "positions.quantAnalyst.location",
    typeKey: "positions.quantAnalyst.type",
    typeLabel: "Full-time",
  },
  {
    key: "backend-engineer",
    departmentKey: "trading",
    type: "fulltime",
    title: "Backend Engineer – Trading Infrastructure",
    department: "Technology",
    location: "Singapore",
    titleKey: "positions.backendEngineer.title",
    departmentLabelKey: "positions.backendEngineer.department",
    locationKey: "positions.backendEngineer.location",
    typeKey: "positions.backendEngineer.type",
    typeLabel: "Full-time",
  },
  {
    key: "compliance-officer",
    departmentKey: "trading",
    type: "fulltime",
    title: "Compliance Officer",
    department: "Compliance",
    location: "Dubai, UAE",
    titleKey: "positions.complianceOfficer.title",
    departmentLabelKey: "positions.complianceOfficer.department",
    locationKey: "positions.complianceOfficer.location",
    typeKey: "positions.complianceOfficer.type",
    typeLabel: "Full-time",
  },
  {
    key: "sales-executive",
    departmentKey: "trading",
    type: "fulltime",
    title: "Institutional Sales Executive",
    department: "Sales",
    location: "Hong Kong",
    titleKey: "positions.salesExecutive.title",
    departmentLabelKey: "positions.salesExecutive.department",
    locationKey: "positions.salesExecutive.location",
    typeKey: "positions.salesExecutive.type",
    typeLabel: "Full-time",
  },
  {
    key: "marketing-manager",
    departmentKey: "trading",
    type: "fulltime",
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "London, UK",
    titleKey: "positions.marketingManager.title",
    departmentLabelKey: "positions.marketingManager.department",
    locationKey: "positions.marketingManager.location",
    typeKey: "positions.marketingManager.type",
    typeLabel: "Full-time",
  },
  {
    key: "risk-analyst",
    departmentKey: "trading",
    type: "fulltime",
    title: "Market Risk Analyst",
    department: "Risk Management",
    location: "Dubai, UAE",
    titleKey: "positions.riskAnalyst.title",
    departmentLabelKey: "positions.riskAnalyst.department",
    locationKey: "positions.riskAnalyst.location",
    typeKey: "positions.riskAnalyst.type",
    typeLabel: "Full-time",
  },
  {
    key: "financial-controller",
    departmentKey: "trading",
    type: "fulltime",
    title: "Financial Controller",
    department: "Finance",
    location: "Singapore",
    titleKey: "positions.financialController.title",
    departmentLabelKey: "positions.financialController.department",
    locationKey: "positions.financialController.location",
    typeKey: "positions.financialController.type",
    typeLabel: "Full-time",
  },
  {
    key: "devops-engineer",
    departmentKey: "trading",
    type: "remote",
    title: "DevOps Engineer",
    department: "Technology",
    location: "Remote",
    titleKey: "positions.devopsEngineer.title",
    departmentLabelKey: "positions.devopsEngineer.department",
    locationKey: "positions.devopsEngineer.location",
    typeKey: "positions.devopsEngineer.type",
    typeLabel: "Remote",
  },
];

function PinIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M2.4225 7.73705C1.59312 6.69213 1.25 5.8751 1.25 4.9003C1.25 2.88935 2.92562 1.25216 5 1.25216C5.68562 1.25216 6.34187 1.43059 6.91687 1.76429C7.06034 1.84748 7.23092 1.87017 7.39109 1.82737C7.55125 1.78458 7.68789 1.6798 7.77094 1.53609C7.85398 1.39237 7.87664 1.2215 7.83391 1.06106C7.79119 0.900613 7.68659 0.763742 7.54312 0.680553C6.77013 0.2331 5.89278 -0.00168116 5 9.06202e-06C2.2425 9.06202e-06 0 2.19065 0 4.9003C0 6.19002 0.4525 7.26687 1.44375 8.51652C2.0375 9.26405 3.075 10.3622 4.56312 11.8209C4.67799 11.9334 4.83166 11.9972 4.99225 11.9992C5.15284 12.0012 5.30803 11.9412 5.42562 11.8316C6.98312 10.3822 8.04875 9.27845 8.63312 8.50462C9.58375 7.24558 10 6.1944 10 4.9003C10.0006 4.05969 9.78079 3.23367 9.3625 2.50494C9.32298 2.43118 9.26909 2.3661 9.20403 2.31357C9.13897 2.26103 9.06405 2.2221 8.9837 2.19908C8.90336 2.17605 8.81922 2.1694 8.73626 2.17952C8.65331 2.18964 8.57322 2.21632 8.50074 2.25798C8.42825 2.29964 8.36485 2.35544 8.31427 2.42208C8.26369 2.48872 8.22697 2.56485 8.20627 2.64595C8.18557 2.72705 8.18132 2.81149 8.19377 2.89427C8.20622 2.97705 8.23512 3.05649 8.27875 3.12788C8.58625 3.66568 8.75 4.27047 8.75 4.9003C8.75 5.89451 8.43437 6.69213 7.63625 7.74895C7.15937 8.38066 6.28187 9.30287 5.01125 10.5056C3.78437 9.28972 2.92 8.36438 2.4225 7.73705Z" fill="#666666" />
      <path d="M5.03187 7.35953C6.43125 7.35953 7.57062 6.24136 7.57062 4.85523C7.57062 3.46909 6.43125 2.35092 5.03187 2.35092C3.63187 2.35092 2.4925 3.46909 2.4925 4.85523C2.4925 6.24136 3.6325 7.35953 5.03187 7.35953ZM5.03187 6.10738C4.31687 6.10738 3.7425 5.54391 3.7425 4.85523C3.7425 4.16654 4.3175 3.60307 5.03187 3.60307C5.74625 3.60307 6.32062 4.16654 6.32062 4.85523C6.32062 5.54391 5.74625 6.10738 5.03187 6.10738ZM0.855625 12H8.83687C8.91896 12 9.00024 11.9838 9.07608 11.9524C9.15192 11.9209 9.22083 11.8748 9.27887 11.8167C9.33692 11.7585 9.38296 11.6895 9.41438 11.6135C9.44579 11.5376 9.46196 11.4561 9.46196 11.3739C9.46196 11.2917 9.44579 11.2103 9.41438 11.1343C9.38296 11.0584 9.33692 10.9893 9.27887 10.9312C9.22083 10.8731 9.15192 10.8269 9.07608 10.7955C9.00024 10.764 8.91896 10.7478 8.83687 10.7478H0.85625C0.774166 10.7478 0.692885 10.764 0.617046 10.7955C0.541207 10.8269 0.472298 10.8731 0.414252 10.9312C0.356206 10.9893 0.310161 11.0584 0.278746 11.1343C0.247332 11.2103 0.231163 11.2917 0.231163 11.3739C0.231163 11.4561 0.247332 11.5376 0.278746 11.6135C0.310161 11.6895 0.356206 11.7585 0.414252 11.8167C0.472298 11.8748 0.541207 11.9209 0.617046 11.9524C0.692885 11.9838 0.774166 12 0.85625 12H0.855625Z" fill="#666666" />
    </svg>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "text-xs rounded-full border px-4 py-2 font-normal transition",
        active
          ? "border-[#293B93] bg-[#293B93] text-white"
          : "border-[#E1E7F6] bg-white text-[#666666] hover:border-[#D8DFF5]"
      )}
    >
      {children}
    </button>
  );
}

function PositionRow({ position, t, applyLabel }) {
  const applyHref = `mailto:careers@gtcfx.com?subject=${encodeURIComponent(
    t(position.titleKey, position.title)
  )}`;

  return (
    <>
      <div className="hidden border-b border-[#E1E7F6] px-5 py-4 last:border-b-0 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto] md:items-center md:gap-4 md:px-4">
        <p className="Text font-medium text-[#000]">
          {t(position.titleKey, position.title)}
        </p>

        <span
          className={clsx(
            "inline-flex w-fit rounded-full px-4 py-1 text-xs font-normal",
            DEPARTMENT_BADGE[position.departmentKey] ?? DEPARTMENT_BADGE.compliance
          )}
        >
          {t(position.departmentLabelKey, position.department)}
        </span>

        <p className="TextSmall inline-flex items-center gap-1.5 font-normal text-[#666]">
          <PinIcon className="h-3.5 w-3.5 shrink-0 text-[#666]" />
          {t(position.locationKey, position.location)}
        </p>

        <span
          className={clsx(
            "inline-flex w-fit rounded-full px-4 py-1 text-xs font-normal",
            TYPE_BADGE[position.type] ?? TYPE_BADGE.fulltime
          )}
        >
          {t(position.typeKey, position.typeLabel)}
        </span>

        <TextArrowLink href={applyHref} lowercase={false} className="justify-self-end !font-medium">
          {applyLabel}
        </TextArrowLink>
      </div>

      <article className="border-b border-[#E1E7F6] p-5 last:border-b-0 md:hidden">
        <p className="Text font-medium text-[#000]">
          {t(position.titleKey, position.title)}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={clsx(
              "inline-flex rounded-full px-4 py-1 text-xs font-normal",
              DEPARTMENT_BADGE[position.departmentKey] ?? DEPARTMENT_BADGE.compliance
            )}
          >
            {t(position.departmentLabelKey, position.department)}
          </span>
          <span
            className={clsx(
              "inline-flex rounded-full px-4 py-1 text-xs font-normal",
              TYPE_BADGE[position.type] ?? TYPE_BADGE.fulltime
            )}
          >
            {t(position.typeKey, position.typeLabel)}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="TextSmall inline-flex items-center gap-1.5 font-normal text-[#666]">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-[#666]" />
            {t(position.locationKey, position.location)}
          </p>

          <TextArrowLink href={applyHref} lowercase={false} className=" !pl-4 !font-medium">
            {applyLabel}
          </TextArrowLink>
        </div>
      </article>
    </>
  );
}

export default function CareerOpenPositionsSection() {
  const t = usePathTranslation("careerPage.openPositionsSection");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPositions = useMemo(() => {
    if (activeFilter === "all") return OPEN_POSITIONS;
    if (activeFilter === "remote") {
      return OPEN_POSITIONS.filter((position) => position.type === "remote");
    }
    return OPEN_POSITIONS.filter(
      (position) => position.departmentKey === activeFilter
    );
  }, [activeFilter]);

  return (
    <section className=" py-8 md:py-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                {t("eyebrow", "Current Openings")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mt-4 font-semibold text-[#000]">
                {t("titleBefore", "Open")}{" "}
                <span className="text-[#293B93]">
                  {t("titleAccent", "Positions")}
                </span>
              </h2>

              <p className="Text mt-4 max-w-md font-normal leading-[1.7] text-[#000032]/60">
                {t(
                  "description",
                  "Click any department to explore current openings or express interest directly."
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <FilterButton
                  key={filter.key}
                  active={activeFilter === filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {t(filter.labelKey, filter.label)}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto] gap-4 px-5 py-3 text-left md:px-4 md:grid"
              style={{
                borderRadius: '10px',
                border: '1px solid #E1E7F6',
                background: '#F8F9FC',
              }}
            >
              <p className="text-xs font-normal  text-[#666]">
                {t("columns.position", "Position")}
              </p>
              <p className="text-xs font-normal text-[#666]">
                {t("columns.department", "Department")}
              </p>
              <p className="text-xs font-normal text-[#666]">
                {t("columns.location", "Location")}
              </p>
              <p className="text-xs font-normal text-[#666]">
                {t("columns.type", "Type")}
              </p>
              <span className="sr-only">{t("columns.apply", "Apply")}</span>
            </div>

            {filteredPositions.map((position) => (
              <PositionRow
                key={position.key}
                position={position}
                t={t}
                applyLabel={t("apply", "Apply")}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6  bg-white p-4 md:p-6 lg:flex-row lg:items-center lg:justify-between"

            style={{
              borderLeft: '3px solid #293B93',
              background: '#FFF',
            }}
          >
            <div className="min-w-0 md:pl-5">
              <h3 className="HeadingH5 font-bold text-[#000]">
                {t("cta.title", "Don't see your role? Tell us what you bring.")}
              </h3>
              <p className="TextSmall mt-2 max-w-4xl font-normal leading-[1.65] text-[#666]">
                {t(
                  "cta.description",
                  "We build around exceptional people. If you think you belong here, reach out — we read every message."
                )}
              </p>
            </div>

            <Button
              href="mailto:careers@gtcfx.com?subject=Open%20Application"
              external
              variant="primary"
              size="md"
              className="!rounded-[0px] shrink-0 self-start lg:self-center"
            >
              {t("cta.button", "Send Open Application")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
