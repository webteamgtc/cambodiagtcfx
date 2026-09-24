"use client";

function SectionTitle({ children }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="h-5 w-1 rounded-full bg-[#293B93]" aria-hidden />
      <h2 className="text-lg font-semibold text-[#0B0F2A] md:text-xl">{children}</h2>
    </div>
  );
}

export function SymbolSpecsSection({ specs = [] }) {
  return (
    <section>
      <SectionTitle>Trading Specifications</SectionTitle>
      <div className="overflow-hidden rounded-2xl border border-[#DDE2EF]">
        <div className="grid grid-cols-2">
          {specs.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={clsxCell(index, specs.length)}
            >
              <p className="TextSmall font-normal text-[#8B97A6]">{item.label}</p>
              <p className="mt-1 Text leading-snug font-medium text-[#0B0F2A]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function clsxCell(index, total) {
  const base = "border-[#E6EAF5] px-4 py-4 md:px-5 md:py-5";
  const rightBorder = index % 2 === 0 ? "border-r" : "";
  const bottomBorder = index < total - 2 ? "border-b" : "";
  return `${base} ${rightBorder} ${bottomBorder}`.trim();
}

export function SymbolAboutSection({ title, body, tags = [] }) {
  return (
    <section className=" h-full flex flex-col justify-center">
      <SectionTitle>{title}</SectionTitle>
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-center"
        style={{
          borderRadius: "20px",
          border: "1px solid #DDE2EF",
          background: "linear-gradient(119deg, #FFF 2.56%, #F7F7FA 97.44%)",
        }}
      >
        <p className="TextSmall font-normal leading-[1.6] text-[#4E4E4E] md:text-[15px]">{body}</p>
        {tags.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full bg-[#F4F5F9] px-3 py-2 text-sm font-medium text-[#293B93]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
