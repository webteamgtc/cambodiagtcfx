function TickerCardSkeleton() {
  return (
    <div
      className="flex max-w-[340px] shrink-0 animate-pulse items-center gap-2.5 rounded-[999px] border border-neutral-100/80 bg-white px-3.5 py-3 sm:min-w-[280px] sm:gap-3 sm:px-4 md:min-w-[300px] md:px-5"
      aria-hidden
    >
      <span className="h-9 w-9 shrink-0 rounded-full bg-neutral-200 sm:h-10 sm:w-10" />
      <span className="h-4 min-w-0 flex-1 rounded bg-neutral-200" />
      <span className="h-10 w-16 shrink-0 rounded bg-neutral-200" />
    </div>
  );
}

function FallbackBody({ isFloating, hideTabs }) {
  return (
    <>
      <div
        className={`gtc-market-ticker__tabs flex w-full flex-nowrap items-center justify-center gap-2 overflow-x-auto md:gap-3 ${isFloating ? "mb-2 md:mb-2" : "-mx-1 mb-2 md:mb-2"} ${hideTabs ? "hidden" : ""}`}
        aria-hidden
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`inline-block h-9 shrink-0 animate-pulse rounded-full bg-neutral-200 ${
              index === 0 ? "w-24" : "w-20"
            }`}
          />
        ))}
      </div>

      <div className="gtc-market-ticker__viewport relative overflow-hidden rounded-xl" dir="ltr" aria-hidden>
        <div className="gtc-market-ticker__track flex min-w-max items-center gap-2.5 px-0.5 py-2 sm:gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TickerCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

/** Static placeholder — identical on server and first client paint (no live data / i18n). */
export default function MarketTickerFallback({
  variant = "standalone",
  fullWidth = false,
  hideTabs = false,
}) {
  const isFloating = variant === "floating";
  const body = <FallbackBody isFloating={isFloating} hideTabs={hideTabs} />;

  if (isFloating) {
    return (
      <div
        className="w-full bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.04] md:rounded-[28px] md:p-3 lg:p-4"
        aria-busy="true"
        aria-label="Markets"
      >
        {body}
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-5 md:py-6" aria-busy="true" aria-label="Markets">
      {fullWidth ? (
        <div className="px-3 sm:px-4 md:px-6">{body}</div>
      ) : (
        <div className="mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6">{body}</div>
      )}
    </section>
  );
}
