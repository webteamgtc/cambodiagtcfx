"use client";

import Link from "next/link";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const contactItems = [
  {
    href: "https://wa.me/448000488461",
    icon: <FaWhatsapp  size={28} />,
    bg: "bg-[#25D366]",
  },
  {
    href: "tel:+971800667788",
    icon: <FaPhoneAlt size={28} />,
    bg: "bg-[#080b21]",
  },
  {
    href: "mailto:support@gtcfx.com",
    icon: <FaEnvelope  size={28} />,
    bg: "bg-[#B68756]",
  },
  {
    href: "https://www.google.com/maps/place/GTCFX+%7C+%231+Global+STP+Broker./data=!4m2!3m1!1s0x0:0x86ff19d564223048?sa=X&ved=1t:2428&ictx=111",
    icon: <FaMapMarkerAlt  size={28} />,
    bg: "bg-[#080b21]",
  },
];

export default function StickyContactBar() {
  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {contactItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-lg transition hover:scale-105 ${item.bg}`}
        >
          {item.icon }
        </Link>
      ))}
    </div>
  );
}