"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function DownloadQR() {
  const t = usePathTranslation("common.downloadQr");
  const tA11y = usePathTranslation("common.a11y");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex xl:h-10 h-8 xl:w-10 w-8 items-center justify-center rounded-lg bg-[#29a643] transition-all duration-300 hover:bg-primary"
        aria-label={t("downloadApp", "Download App")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-y-[2px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-3 w-[170px] rounded-xl bg-white border border-gray-200 shadow-xl transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-2 invisible"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-[250px] h-[170px]">
            <Image
              src="/home/qr-app.webp"
              alt={tA11y("qrCode", "QR Code")}
              fill
              className="object-contain"
            />
          </div>

          <p className="text-sm font-medium text-primary pb-2">
            {t("downloadApp", "Download App")}
          </p>
        </div>
      </div>
    </div>
  );
}
