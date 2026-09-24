"use client";

import Image from "next/image";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";

export default function CategoryHeroStoreLinks() {
  return (
    <div className="flex flex-col gap-1.5">
      <StoreDownloadLink type="google" className="inline-flex transition hover:opacity-90">
        <Image
          src="/home/google-play.svg"
          alt="Get it on Google Play"
          width={120}
          height={36}
          className="h-8 w-auto md:h-9"
        />
      </StoreDownloadLink>
      <StoreDownloadLink type="apple" className="inline-flex transition hover:opacity-90">
        <Image
          src="/home/app-store.svg"
          alt="Download on the App Store"
          width={120}
          height={36}
          className="h-8 w-auto md:h-9"
        />
      </StoreDownloadLink>
    </div>
  );
}
