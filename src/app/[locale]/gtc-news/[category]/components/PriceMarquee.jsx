"use client";

import Image from "next/image";

const PRICE_DATA = [
  { icon: "/flags/US.svg", name: "US Tech 100", price: "26,962.50", change: "+0.58%", up: true },
  { icon: "/flags/US.svg", name: "Spot Gold", price: "4,678.61", change: "+0.31%", up: true },
  { icon: "/flags/US.svg", name: "NVIDIA Corp (All Sessions)", price: "178.42", change: "+1.24%", up: true },
  { icon: "/flags/US.svg", name: "Apple Inc (All Sessions)", price: "229.87", change: "-0.45%", up: false },
  { icon: "/flags/US.svg", name: "US 500", price: "5,983.20", change: "+0.22%", up: true },
  { icon: "/flags/US.svg", name: "WTI Crude Oil", price: "71.89", change: "-0.67%", up: false },
  { icon: "/flags/US.svg", name: "EURUSD", price: "1.0589", change: "+0.12%", up: true },
  { icon: "/flags/US.svg", name: "Bitcoin (USD)", price: "97,840.00", change: "+2.15%", up: true },
];

function ArrowIcon({ up }) {
  return (
    <svg
      className={`h-3 w-3 shrink-0 ${up ? "text-[#16A34A]" : "text-[#DC2626]"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      {up ? (
        <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
      ) : (
        <path d="M6 10L2 4H10L6 10Z" fill="currentColor" />
      )}
    </svg>
  );
}

function PriceItem({ item }) {
  return (
    <div className="flex items-center gap-2 px-5 py-2 shrink-0">
      <Image
        src={item.icon}
        alt={item.name}
        width={20}
        height={14}
        className="h-3.5 w-auto shrink-0"
      />
      <span className="text-xs font-medium text-[#000032] md:text-sm">{item.name}</span>
      <span className="text-xs font-semibold text-[#000032] md:text-sm">{item.price}</span>
      <span
        className={`inline-flex items-center gap-0.5 text-xs font-semibold md:text-sm ${
          item.up ? "text-[#16A34A]" : "text-[#DC2626]"
        }`}
      >
        <ArrowIcon up={item.up} />
        {item.change}
      </span>
      <span className="ml-3 h-4 w-px bg-gray-200" aria-hidden />
    </div>
  );
}

export default function PriceMarquee() {
  // Duplicate the items to create a seamless infinite loop.
  // Two identical groups each animated with the `marquee` keyframe (0% -> -100%)
  // produce a continuous scroll with no visible jump.
  return (
    <section className="border-y border-gray-200 bg-white py-0">
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max">
          <div className="flex shrink-0 animate-marquee">
            {PRICE_DATA.map((item, index) => (
              <PriceItem key={`a-${index}`} item={item} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee" aria-hidden>
            {PRICE_DATA.map((item, index) => (
              <PriceItem key={`b-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
