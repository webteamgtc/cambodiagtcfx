"use client";

import clsx from "clsx";
import Image from "next/image";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";

const GALLERY_COLUMNS = [
  [
    {
      key: "exhibitionHall",
      src: "/new-design/company/events/event-one-big.webp",
      tall: true,
      altKey: "gallery.images.exhibitionHall.alt",
      alt: "GTC exhibition booth at a crowded global financial expo",
    },
    {
      key: "teamPhoto",
      src: "/new-design/company/events/event-one-small-4.webp",
      tall: false,
      altKey: "gallery.images.teamPhoto.alt",
      alt: "GTC team posing together at an industry exhibition",
    },
  ],
  [
    {
      key: "boothInteraction",
      src: "/new-design/company/events/event-two-small-1.webp",
      tall: false,
      altKey: "gallery.images.boothInteraction.alt",
      alt: "GTC staff engaging with visitors at an event booth",
    },
    {
      key: "boothDetails",
      src: "/new-design/company/events/event-two-big.webp",
      tall: true,
      altKey: "gallery.images.boothDetails.alt",
      alt: "Close-up of GTC branded banners and exhibition stand details",
    },
  ],
  [
    {
      key: "boothOverview",
      src: "/new-design/company/events/event-three-small-2.webp",
      tall: false,
      altKey: "gallery.images.boothOverview.alt",
      alt: "Wide view of the GTC booth with visitors at a global expo",
    },
    {
      key: "boothLighting",
      src: "/new-design/company/events/event-three-big.webp",
      tall: true,
      altKey: "gallery.images.boothLighting.alt",
      alt: "GTC exhibition stand with blue lighting at an international show",
    },
  ],
];

const MOBILE_SLIDES = GALLERY_COLUMNS.map((column, index) => ({
  key: `column-${index + 1}`,
  column,
}));

function GalleryImage({ item, t, className = "" }) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-[#E8EDF8]",
        item.tall ? "aspect-[3/4]" : "aspect-[4/3]",
        className
      )}
    >
      <Image
        src={item.src}
        alt={t(item.altKey, item.alt)}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 33vw"
      />
    </div>
  );
}

function GalleryColumn({ column, t, className = "" }) {
  return (
    <div className={clsx("flex min-w-0 flex-col gap-4 md:gap-2", className)}>
      {column.map((item) => (
        <GalleryImage key={item.key} item={item} t={t} />
      ))}
    </div>
  );
}

export default function EventsExhibitionsMasonryGallery({ t }) {
  return (
    <>
      <div className="mt-10 w-full min-w-0 sm:hidden md:mt-14">
        <MobilePeekCarousel
          items={MOBILE_SLIDES}
          showArrows
          className="w-full min-w-0"
          trackClassName="-mx-4 px-4 min-w-0"
          slideClassName="!h-auto"
          renderItem={({ column }) => (
            <div className="w-full min-w-0 max-w-full px-1">
              <GalleryColumn column={column} t={t} />
            </div>
          )}
        />
      </div>

      <div className="mt-10 hidden min-w-0 gap-2 sm:grid sm:grid-cols-2 md:gap-2 md:mt-14 md:grid-cols-3 ">
        {GALLERY_COLUMNS.map((column, index) => (
          <FadeInSection key={`col-${index}`} delay={index * 0.1}>
            <GalleryColumn column={column} t={t} />
          </FadeInSection>
        ))}
      </div>
    </>
  );
}
