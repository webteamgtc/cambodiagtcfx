import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import { REGISTER_HREF } from "@/app/[locale]/trading/open-live-account/openLiveAccountData";

function AccountTypeIcon({ type, featured }) {
  const iconClass = featured ? "h-5 w-5 text-white" : "h-5 w-5 text-[#293B93]";

  if (type === "ecn") {
    return (
      <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden>
        <path
          d="M22.5134 0H7.56708L0 9.81609L15 28L30 9.68199L22.5134 0ZM7.03041 9.65517L9.76744 2.14559H14.7853L7.03041 9.65517ZM22.9964 9.65517L15.2415 2.14559H20.2326L22.9964 9.65517ZM22.3792 10.728L15.0268 23.5479L7.64758 10.728H22.3792ZM8.80143 9.65517L15.0268 3.43295L21.2522 9.65517H8.80143ZM6.44007 10.728L12.8801 22.046L3.54204 10.728H6.44007ZM23.6136 10.728H26.3775L17.3077 21.7778L23.6136 10.728ZM27.263 9.65517L24.2039 9.68199L21.3327 2.17241H21.4401L27.263 9.65517ZM8.6136 2.14559H8.72093L5.84973 9.65517H2.81753L8.6136 2.14559Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "pro") {
    return (
      <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path
          d="M13 2L15.8 9.4H23.6L17.4 13.8L20.2 21.2L13 16.8L5.8 21.2L8.6 13.8L2.4 9.4H10.2L13 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none" aria-hidden>
      <path
        d="M25.7197 20.3601H25.4502L18.2695 6.91135C18.8438 6.19872 19.1807 5.28584 19.1807 4.30229C19.1807 1.93176 17.2588 0 14.9004 0C12.542 0 10.6201 1.93176 10.6201 4.30229C10.6201 5.31824 10.957 6.23406 11.5312 6.94374L4.85449 20.4307C4.65234 20.3954 4.48242 20.3954 4.28027 20.3954C1.92188 20.3954 0 22.3272 0 24.6977C0 27.0682 1.92188 29 4.28027 29C6.50391 29 8.3584 27.2714 8.52832 25.0687H21.4395C21.6416 27.2714 23.4609 29 25.7197 29C28.0781 29 30 27.0682 30 24.6977C30 22.2918 28.0781 20.3601 25.7197 20.3601ZM14.8975 6.91135C14.9004 6.91135 14.9004 6.91135 14.8975 6.91135V6.91135ZM6.47168 21.005L12.8438 8.09515C13.2158 8.29833 13.6201 8.46913 14.0566 8.53686V12.3327C12.2021 12.7744 10.8193 14.4323 10.8193 16.4318C10.8193 17.2799 11.0889 18.0926 11.5283 18.7699L7.51758 21.8855C7.21289 21.5468 6.84375 21.2435 6.47168 21.005ZM21.6416 23.3755H8.3584L12.7412 19.9537C13.3828 20.3601 14.1563 20.631 15 20.631C15.8438 20.631 16.6523 20.3601 17.291 19.9184L21.709 23.1723C21.709 23.24 21.6738 23.3078 21.6416 23.3755ZM18.5068 18.6668C18.9463 18.0219 19.1807 17.2445 19.1807 16.3964C19.1807 14.3292 17.6982 12.636 15.7764 12.262V8.46913C16.2158 8.36606 16.6201 8.23061 16.9893 8.02742L23.8301 20.8018C23.3584 21.0727 22.9541 21.379 22.6172 21.7176L18.5068 18.6668Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SpecRow({ label, value, featured, valueClassName }) {
  return (
    <div
      className={clsx(
        "flex items-start justify-between gap-4 py-3.5 first:pt-0",
        "border-b border-dashed last:border-b-0",
        featured ? "border-white/15" : "border-[#E1E7F6]"
      )}
    >
      <span
        className={clsx(
          "TextSmall shrink-0 font-normal",
          featured ? "text-white/80" : "text-[#69729F]"
        )}
      >
        {label}
      </span>
      <span
        className={clsx(
          "TextSmall text-right font-medium leading-snug",
          featured ? "text-white" : "text-[#000032]",
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default function AccountTypeCard({ account }) {
  const isFeatured = account.featured;

  return (
    <div
      className={clsx(
        "relative flex h-full flex-col rounded-[20px] border p-4 md:p-6",
        isFeatured
          ? "border-[#293B93] bg-[#293B93] text-white"
          : "border-[#E1E7F6] bg-white"
      )}
    >
      {account.badge ? (
        <span className="absolute right-5 top-0 -translate-y-1/2 rounded-[10px] bg-[#B48755] px-3.5 py-2 text-[11px] font-normal text-white">
          {account.badge}
        </span>
      ) : null}

      <div
        className={clsx(
          "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E1E7F6]",
          isFeatured ? "bg-[#69729F]" : "bg-[#F8F9FC]"
        )}
      >
        <AccountTypeIcon type={account.icon} featured={isFeatured} />
      </div>

      <h3 className="HeadingH5 mt-6 text-left font-semibold">{account.name}</h3>
      <p
        className={clsx(
          "TextSmall mt-1 text-left font-normal",
          isFeatured ? "text-white" : "text-[#69729F]"
        )}
      >
        {account.subtitle}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="HeadingH2 font-semibold">{account.minDeposit}</span>
        <span
          className={clsx(
            "TextSmall font-normal",
            isFeatured ? "text-white" : "text-[#69729F]"
          )}
        >
          {account.minDepositLabel ?? "min deposit"}
        </span>
      </div>

      <div className="mt-6 flex-1">
        {account.specs?.map((spec) => (
          <SpecRow
            key={spec.key}
            label={spec.label}
            value={spec.value}
            featured={isFeatured}
          />
        ))}
        {account.swapFree ? (
          <SpecRow
            label={account.swapFree.label}
            value={account.swapFree.value}
            featured={isFeatured}
            valueClassName={
              account.swapFree.available
                ? isFeatured
                  ? "!text-[#86efac]"
                  : "!text-[#16a34a]"
                : isFeatured
                  ? "!text-[#fca5a5]"
                  : "!text-[#dc2626]"
            }
          />
        ) : null}
      </div>

      <div className="mt-6">
        <Button
          href={REGISTER_HREF}
          external
          variant={isFeatured ? "secondary" : "outline"}
          size="md"
          fullWidth
          className={clsx(
            isFeatured
              ? "!border-[#B48755] !bg-[#B48755] !font-normal !text-white hover:!bg-[#a07848]"
              : "!border-[#E1E7F6] !bg-white !font-normal !text-[#000] hover:!bg-[#F8F9FC]"
          )}
        >
          {account.cta} <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  );
}
