export default function FormSection({ icon, title, required = false, children }) {
  return (
    <section className="mb-6 rounded-lg border border-[#E1E7F6] bg-white">
      <div className="flex items-center justify-between bg-[#293B93] px-4 py-3 text-sm font-semibold text-white">
        <span className="flex items-center gap-2">
          {icon ? <span aria-hidden>{icon}</span> : null}
          {title}
        </span>
        {required ? <span className="text-red-300" aria-hidden>*</span> : null}
      </div>
      <div className="space-y-4 p-4 sm:p-6">{children}</div>
    </section>
  );
}
