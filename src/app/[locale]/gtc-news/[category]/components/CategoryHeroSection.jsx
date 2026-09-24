import Image from "next/image";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import CategoryHeroStoreLinks from "./CategoryHeroStoreLinks";

export default function CategoryHeroSection({ locale, category }) {
  return (
    <section className="pt-16 pb-6 md:pt-20 md:pb-8">
      <div className="container">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[20px] min-h-[250px] md:min-h-[350px] lg:min-h-[420px]">
          {/* Background image */}
          <Image
            src="/detail-bg.webp"
            alt="Trade Anytime Anywhere with GTC Go"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Content overlay: left image + right text */}
          <div className="relative z-10 flex h-full min-h-[250px] md:min-h-[350px] lg:min-h-[420px] items-center">
            {/* Left side - phone mockups */}
            <div className="hidden md:flex w-[50%] items-center justify-center">
              <Image
                src="/detail-new.webp"
                alt="GTC Go App"
                width={500}
                height={400}
                className="object-contain max-h-[380px] w-auto"
              />
            </div>

            {/* Right side - content */}
            <div className="w-full md:w-[50%] px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
              <h1 className="text-xl font-bold leading-tight text-white md:text-2xl lg:text-[36px] lg:leading-[1.15]">
                Trade Anytime,Anywhere
                <br />
                with GTC Go
              </h1>
              <p className="mt-2 text-sm font-normal text-white/80 md:text-base">
                Fast execution. Smart tools.
                <br />
                Full control.
              </p>

              {/* Store badges + QR */}
              <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-6 md:gap-4">
                <CategoryHeroStoreLinks />
                <Image
                  src="/home/qr-app.webp"
                  alt="Scan QR code to download"
                  width={80}
                  height={80}
                  className="h-16 w-16 rounded-lg bg-white p-1 md:h-[72px] md:w-[72px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
