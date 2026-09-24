"use client";

import { useEffect, useRef, useState } from "react";
import { useLocaleMessages, usePathTranslation } from "../../../LocaleProvider";

function CounterItem({
  value,
  label,
  duration = 2000,
  prefix = "",
  suffix = "",
  start = false,
}) {
  const [count, setCount] = useState(0);
  const target = typeof value === "number" ? value : Number(value) || 0;

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, start]);

  const displayCount = start ? count : target;
  const displayMain = `${prefix}${displayCount.toLocaleString()}${suffix}`;

  return (
    <div className="flex min-w-0 flex-col items-center justify-center text-center">
      <p className="text-[clamp(1.25rem,3.2vw,1.875rem)] font-bold leading-tight tracking-tight text-[#222222]">
        <span className="tabular-nums">{displayMain}</span>
      </p>
      <p className="TextSmall mt-2 max-w-[11rem] text-[#6B7280] sm:max-w-none">
        {label}
      </p>
    </div>
  );
}

export default function Counter() {
  const sectionRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const messages = useLocaleMessages();
  const t = usePathTranslation("common.counter.stats");

  const cfg = messages?.common?.counter?.stats;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: Number(cfg?.servedClients?.value) || 985000,
      suffix: cfg?.servedClients?.suffix ?? " +",
      label: t("servedClients.label", "Served Clients"),
      duration: Number(cfg?.servedClients?.duration) || 2500,
    },
    {
      value: Number(cfg?.tradingInstruments?.value) || 7,
      suffix: cfg?.tradingInstruments?.suffix ?? " +",
      label: t("tradingInstruments.label", "Trading Markets"),
      duration: Number(cfg?.tradingInstruments?.duration) || 2200,
    },
    {
      value: Number(cfg?.destinationsWorldwide?.value) || 20,
      suffix: cfg?.destinationsWorldwide?.suffix ?? " +",
      label: t("destinationsWorldwide.label", "Destinations Worldwide"),
      duration: Number(cfg?.destinationsWorldwide?.duration) || 1800,
    },
    {
      value: Number(cfg?.monthlyTrades?.value) || 850,
      prefix: cfg?.monthlyTrades?.prefix ?? "$",
      suffix: cfg?.monthlyTrades?.suffix ?? " Billion",
      label: t("monthlyTrades.label", "Monthly Trades"),
      duration: Number(cfg?.monthlyTrades?.duration) || 2500,
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white mb-10 md:mb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[100px] mt-4 md:mt-0 bg-[#F4F5F8] px-6 py-10 sm:px-10 md:px-12 md:py-10 lg:px-16">
          <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-4 md:gap-y-0 lg:gap-x-6">
            {stats.map((item, index) => (
              <CounterItem
                key={index}
                value={item.value}
                label={item.label}
                duration={item.duration}
                prefix={item.prefix ?? ""}
                suffix={item.suffix}
                start={startAnimation}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
