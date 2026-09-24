export default function GtcNewsSectionTitle({ title, action }) {
  return (
    <div className="flex items-center gap-4 mb-8 md:mb-10">
      <h2 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-300" />
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
