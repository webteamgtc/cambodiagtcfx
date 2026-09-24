"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";

function normalizePath(path = "") {
  if (!path) return "/";
  try {
    const { pathname } = new URL(path, "http://localhost");
    const normalized = pathname.replace(/\/$/, "") || "/";
    return normalized;
  } catch {
    const withoutQuery = path.split("?")[0].split("#")[0];
    return withoutQuery.replace(/\/$/, "") || "/";
  }
}

function isLinkActive(pathname, href) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (current === target) return true;
  if (target === "/") return false;

  return current.startsWith(`${target}/`);
}

function HubTabCard({ item, active }) {
  const className =
    "flex w-full flex-col items-center justify-center md:min-h-[125px] min-h-[100px] gap-2 rounded-2xl border border-[#e5eaf4] bg-white px-2 py-2 text-center text-primary transition hover:border-[#cfd8ea] hover:no-underline";

  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-[#3347a8]">
        <Image src={item.icon} alt={item.label || "Menu icon"} width={20} height={20} />
      </span>
      <span className="TextSmall line-clamp-2 font-semibold leading-snug text-primary">{item.label}</span>
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} aria-current={active ? "page" : undefined}>
      {content}
    </Link>
  );
}

export default function MegaMenuHubTabs({ links = [] }) {
  const pathname = usePathname();

  if (!links.length) return null;

  const tabs = links.map((item) => ({
    ...item,
    active: isLinkActive(pathname, item.href),
  }));

  const activeIndex = Math.max(
    0,
    tabs.findIndex((item) => item.active)
  );

  const gridCols =
    tabs.length <= 4
      ? "md:grid-cols-4"
      : tabs.length <= 6
        ? "md:grid-cols-3 lg:grid-cols-6"
        : "md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8";

  return (
    <div className="container relative z-10 mx-auto">
      <div className="md:hidden">
        <MobilePeekCarousel
          items={tabs}
          showArrows
          slidesPerView={2}
          spaceBetween={12}
          initialIndex={activeIndex}
          className="w-full min-w-0"
          trackClassName="min-w-0"
          slideClassName="!h-auto"
          renderItem={(item) => (
            <div className="w-full min-w-0 px-1">
              <HubTabCard item={item} active={item.active} />
            </div>
          )}
        />
      </div>

      <div className={`hidden gap-3 md:grid ${gridCols}`}>
        {tabs.map((item) => (
          <HubTabCard key={item.href} item={item} active={item.active} />
        ))}
      </div>
    </div>
  );
}
