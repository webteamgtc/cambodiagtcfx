"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import EventsExhibitionsMasonryGallery from "./EventsExhibitionsMasonryGallery";
import { usePathTranslation } from "../../../LocaleProvider";

export default function EventAndExhibitionGallery() {
    const t = usePathTranslation("eventsAndExhibitionsPage.visualArchiveSection");

    return (
        <section id="journey" className=" pb-12 md:pb-12">
            <div className="container min-w-0 max-w-full">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <FadeInSection>
                            <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                                {t("eyebrow", "Visual Archive")}
                            </SectionEyebrow>

                            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                                {t("title", "The Stages We've Walked")}
                            </h2>

                            <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.6] text-[#000032]/60 md:mt-6">
                                {t(
                                    "description",
                                    "Every feature we offer exists because our clients demanded security, speed, and transparency — and we delivered."
                                )}
                            </p>
                        </FadeInSection>
                    </div>

                    <EventsExhibitionsMasonryGallery t={t} />

                </div>
            </div>
        </section>
    );
}
