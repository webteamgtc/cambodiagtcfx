import Image from "next/image";
import Link from "next/link";
import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function ManagedAccountBannerSection({
  title,
  content,
  content2,
  subtitle,
  subtitle2,
  imageUrl,
  buttonText,
  buttonLink,
  imageAlt = "Managed Account",
}) {
  return (
    <section className="container py-8 md:py-12">
      <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">
        <div className="lg:max-w-3xl xl:max-w-[700px]">
          <h1 className="HeadingH3 mb-4 text-primary ltr:md:text-left rtl:md:text-right">
            {title}
          </h1>
          <p className="Text pb-5 ltr:lg:text-left rtl:lg:text-right">{content}</p>
          {content2 ? (
            <p className="Text ltr:lg:text-left rtl:lg:text-right">{content2}</p>
          ) : null}
        </div>

        <div className="relative h-36 w-full md:h-96">
          <Image
            src={imageUrl}
            fill
            alt={imageAlt}
            className="mx-auto block object-contain"
          />
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full flex-col items-center justify-between bg-primary px-8 py-8 md:flex-row">
        <div>
          <h2 className="HeadingH3 text-secondary ltr:md:text-left rtl:md:text-right">
            {subtitle}
          </h2>
          <h3 className="HeadingH3 text-white ltr:md:text-left rtl:md:text-right">
            {subtitle2}
          </h3>
        </div>

        <div>
          <PrimaryButton href={buttonLink} target="_blank" variant="dark">
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

