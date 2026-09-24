import MegaMenuHubTabs from "@/app/[locale]/components/common/MegaMenuHubTabs";

export default function MenuHubSection({ title, description, links }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #eef1f6 1px, transparent 1px), linear-gradient(to bottom, #eef1f6 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative container py-8 md:py-14">
        <div >
          <MegaMenuHubTabs links={links} />
        </div>
      </div>
    </section>
  );
}
