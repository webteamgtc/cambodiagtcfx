import Image from "next/image";
import MarketNewsArticleShareBar from "./MarketNewsArticleShareBar";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";

export default function MarketNewsArticleBodySection({ article }) {
  return (
    <section className="bg-white py-8 md:py-10">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection delay={0.1}>
            <div className="relative aspect-[18/7] w-full overflow-hidden">
              <Image src={article.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-8 space-y-5">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph} className="Text font-normal leading-[1.5] text-[#000]">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <MarketNewsArticleShareBar />
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
