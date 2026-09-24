export default function MarketNewsSectionTitle({ title, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 md:mb-8">
      <h2 className="HeadingH3 font-semibold uppercase tracking-[0.06em] text-[#293B93]">{title}</h2>
      {action ?? null}
    </div>
  );
}
