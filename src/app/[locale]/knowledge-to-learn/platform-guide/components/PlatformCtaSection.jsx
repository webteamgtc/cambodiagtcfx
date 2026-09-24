import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";

const REGISTER_HREF = "/live-account-application";

export default function PlatformCtaSection({ locale = "en" }) {
  return (
    <section
      className="py-20 lg:py-36 relative overflow-hidden bg-[url('/platform/bottom.webp')] bg-cover bg-bottom"
  
    >
      <div className="container pb-48">
        {/* Centered content */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <h2 className="HeadingH1 font-bold text-[#111827]">
            Trade the World&apos;s{" "}
            <span className="text-[#293B93]">markets.</span>
          </h2>

          {/* Subtitle */}
          <p className="TextRegular mx-auto mt-5 max-w-2xl leading-relaxed md:mt-6">
            Open a live account and access 7+ trading markets including Forex,
            Metals, Indices, Shares, Crypto & more — from a broker trusted globally.
          </p>
  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow arrowPosition="right">
              Open Live Account
            </Button>
            
          </div>
        </div>

      </div>
    </section>
  );
}
