import Image from "next/image";

export default function PageHeroCommon({
  title,
  description,
  right,
  backgroundSrc = "/home/homehero1.webp",
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative pt-28 md:pb-20">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={backgroundSrc}
            alt=""
            fill
            priority
            className="object-cover object-[50%_30%]"
          />
        </div>

        {/* Blue overlay like the reference */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#223a93]/85 via-[#3a57b7]/70 to-transparent" />

        {/* White fade bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-transparent to-white" />

        <div className="container relative z-10">
          <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2">
            <div className="max-w-[720px] text-center lg:text-left">
              <h1 className="text-[34px] font-extrabold uppercase tracking-[0.02em] text-white md:text-[46px] lg:text-[52px]">
                {title}
              </h1>
              <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#0D153A] md:text-[16px] lg:mx-0 lg:text-[17px]">
                {description}
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">{right}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

