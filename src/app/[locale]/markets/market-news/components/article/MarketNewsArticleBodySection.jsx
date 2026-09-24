import Image from "next/image";
import MarketNewsArticleShareBar from "./MarketNewsArticleShareBar";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";

export default function MarketNewsArticleBodySection({ article }) {
  return (
    <section className="bg-white pb-8 md:pb-10">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* <FadeInSection delay={0.1}>
            <div className="relative aspect-[18/7] w-full overflow-hidden">
              <Image src={article.image} alt={article.title || "Article illustration"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
            </div>
          </FadeInSection> */}

          <FadeInSection delay={0.2}>
            <div className="mt-8 space-y-5">
              {article.htmlContent ? (
                <div
                  className="Text blog-content font-normal leading-[1.5] text-[#000] [&_a]:text-[#293B93] [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_li]:mb-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
                  dangerouslySetInnerHTML={{ __html: article.htmlContent }}
                />
              ) : (
                article.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="Text font-normal leading-[1.5] text-[#000]">
                    {paragraph}
                  </p>
                ))
              )}
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
