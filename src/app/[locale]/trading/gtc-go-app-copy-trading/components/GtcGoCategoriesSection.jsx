"use client";

import Image from "next/image";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const LINE = "#C5CEE8";
const PILL_BORDER = "#C5CEE8";
const PILL_TEXT = "#293B93";

function Pill({ children }) {
  return (
    <span
      className="relative z-[1] inline-flex shrink-0 items-center whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm font-medium"
      style={{ borderColor: PILL_BORDER, color: PILL_TEXT }}
    >
      {children}
    </span>
  );
}

/** Horizontal connector segment */
function Rail({ w = "w-5" }) {
  return <span className={`block h-px shrink-0 ${w}`} style={{ backgroundColor: LINE }} aria-hidden />;
}

/**
 * One child row: ── Pill [── Grandchild]
 * Vertical spine for siblings is drawn by the parent list.
 */
function ChildRow({ item, isFirst, isLast, isOnly }) {
  return (
    <div className="relative flex items-center py-2 pl-5">
      {/* horizontal stub from spine to pill */}
      <span
        className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2"
        style={{ backgroundColor: LINE }}
        aria-hidden
      />
      {/* vertical spine segment */}
      {!isOnly ? (
        <span
          className="absolute left-0 w-px"
          style={{
            backgroundColor: LINE,
            top: isFirst ? "50%" : 0,
            bottom: isLast ? "50%" : 0,
          }}
          aria-hidden
        />
      ) : null}

      <Pill>{item.label}</Pill>
      {item.children?.[0] ? (
        <>
          <Rail />
          <Pill>{item.children[0].label}</Pill>
        </>
      ) : null}
    </div>
  );
}

function BranchRow({ branch, isFirst, isLast, isOnly }) {
  const children = branch.children ?? [];

  return (
    <div className="relative flex items-center py-2.5 pl-6">
      {/* horizontal stub from main spine to branch pill */}
      <span
        className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2"
        style={{ backgroundColor: LINE }}
        aria-hidden
      />
      {/* main vertical spine segment */}
      {!isOnly ? (
        <span
          className="absolute left-0 w-px"
          style={{
            backgroundColor: LINE,
            top: isFirst ? "50%" : 0,
            bottom: isLast ? "50%" : 0,
          }}
          aria-hidden
        />
      ) : null}

      <Pill>{branch.label}</Pill>

      {children.length > 0 ? (
        <>
          <Rail w="w-5" />
          <div className="relative flex flex-col">
            {children.map((child, index) => (
              <ChildRow
                key={child.key}
                item={child}
                isFirst={index === 0}
                isLast={index === children.length - 1}
                isOnly={children.length === 1}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function CategoryTreeDiagram({ branches }) {
  return (
    <div className="relative flex min-w-[560px] items-center sm:min-w-[640px] lg:min-w-0">
      <span
        className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-[#293B93] ring-4 ring-white"
        aria-hidden
      />
      <Rail w="w-3" />
      <div className="relative flex flex-col">
        {branches.map((branch, index) => (
          <BranchRow
            key={branch.key}
            branch={branch}
            isFirst={index === 0}
            isLast={index === branches.length - 1}
            isOnly={branches.length === 1}
          />
        ))}
      </div>
    </div>
  );
}

export default function GtcGoCategoriesSection({ data }) {
  const { categories } = data;
  const t = usePathTranslation("gtcGoAppPage.categories");

  const branches = categories.tree.map((branch, branchIndex) => ({
    key: branch.key,
    label: t(`tree.${branchIndex}.label`, branch.label),
    children: branch.children?.map((child, childIndex) => ({
      key: child.key,
      label: t(`tree.${branchIndex}.children.${childIndex}.label`, child.label),
      children: child.children?.map((grandchild, grandchildIndex) => ({
        key: grandchild.key,
        label: t(
          `tree.${branchIndex}.children.${childIndex}.children.${grandchildIndex}.label`,
          grandchild.label
        ),
      })),
    })),
  }));

  return (
    <section className="bg-white py-8 sm:py-10 md:py-16">
      <div className="container min-w-0 max-w-full px-4">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow>{t("eyebrow", categories.eyebrow)}</SectionEyebrow>
              <h2 className="HeadingH1 mx-auto mt-4 max-w-2xl px-1 font-semibold leading-[1.25] text-[#000]">
                {t("title", categories.title)}
              </h2>
              <p className="Text mx-auto mt-4 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 sm:mt-5">
                {t("description", categories.description)}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-8 sm:mt-12 sm:gap-10 lg:mt-16 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
              <div className="flex shrink-0 flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative h-14 w-36 sm:h-16 sm:w-40 md:h-[72px] md:w-48">
                  <Image
                    src={categories.logo}
                    alt="GTC"
                    fill
                    className="object-contain object-center lg:object-left"
                    sizes="192px"
                  />
                </div>
                <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] text-[#B48755] sm:text-xs">
                  {t("tagline", categories.tagline)}
                </p>
              </div>

              <div className="w-full min-w-0 max-w-3xl overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] lg:overflow-visible lg:pb-0">
                <CategoryTreeDiagram branches={branches} />
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
