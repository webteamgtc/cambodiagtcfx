import Image from "next/image";

export default function HeroStats({ items = [] }) {
  return (
    <div className="mt-7 inline-flex flex-wrap items-center border border-gray-500 gap-x-6 gap-y-3 rounded-xl bg-gradient-to-r from-[#F0F3FA] via-[#f2f2f2] to-[#F0F3FA]  px-5 py-3 md:px-6 md:py-4 text-[13px] md:text-[17px] font-medium text-primary shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
                <Image
               src={item.icon}
                width={20}
                height={20}
                alt=""
                />
          <span>{item.label}</span>

          {index !== items.length - 1 && (
            <div className="ml-4 h-4 w-px bg-white/20" />
          )}
        </div>
      ))}
    </div>
  );
}