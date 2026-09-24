import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import { REGISTER_HREF } from "../accountTypesData";

function ComparisonIcon({ type, featured }) {
  const fill = featured ? "#fff" : "#293B93";

  if (type === "ecn") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19" fill="none" aria-hidden>
        <path d="M23.2683 5.25351L23.2247 5.22688L12.7491 0.192384C12.5205 0.0662701 12.2623 0 11.9997 0C11.7371 0 11.479 0.0662701 11.2503 0.192384L0.82169 5.19918L0.731149 5.24925C0.393464 5.45284 0.149275 5.77585 0.0494893 6.15094C-0.0502965 6.52604 0.00202164 6.92427 0.195537 7.26262C0.323167 7.48633 0.507523 7.67595 0.730058 7.81017L0.774783 7.83787L11.2492 12.8798C11.478 13.0062 11.7363 13.0727 11.9992 13.0727C12.262 13.0727 12.5204 13.0062 12.7491 12.8798L23.1778 7.86876L23.2672 7.8187C23.6056 7.61545 23.8504 7.29232 23.9504 6.91688C24.0504 6.54144 23.9979 6.14278 23.8039 5.80426C23.6758 5.57999 23.491 5.39149 23.2672 5.25671V5.25245L23.2683 5.25351ZM11.9997 10.8739L2.98486 6.53397L11.9997 2.20149L21.0135 6.53504L11.9997 10.8728V10.8739Z" fill={fill} />
        <path d="M21.944 11.8902L11.9975 16.7947L2.05109 11.8902C1.79394 11.7654 1.49665 11.7453 1.22432 11.8341C0.951989 11.923 0.726803 12.1136 0.598064 12.3642C0.468878 12.6148 0.446137 12.9051 0.534778 13.1719C0.623419 13.4388 0.816285 13.6607 1.0715 13.7896L11.2416 18.8038C11.4718 18.9324 11.7324 19 11.9975 19C12.2627 19 12.5233 18.9324 12.7535 18.8038L22.9225 13.7896C23.1778 13.6614 23.3709 13.4399 23.4597 13.1733C23.5486 12.9068 23.5261 12.6168 23.3971 12.3663C23.2681 12.1159 23.043 11.9254 22.7709 11.8362C22.4988 11.7471 22.2016 11.7664 21.944 11.8902Z" fill={fill} />
      </svg>
    );
  }

  if (type === "pro") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden>
        <path d="M19.8021 0H4.19789L0 8.23283L12 20L24 8.23283L19.8021 0ZM2.49234 7.83603L5.46352 2.00858H18.5362L21.5074 7.83603L12 17.1592L2.49234 7.83603Z" fill={fill} />
        <path d="M12 12.1377L7.60336 7.82642L6.15492 9.24672L12 14.9786L17.8451 9.24672L16.3966 7.82642L12 12.1377Z" fill={fill} />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 0L0 4.32867V18.1179L12 24L24 18.1179V4.32867L12 0ZM20.903 5.27742L12 8.91961L3.09703 5.27742L12 2.08031L20.903 5.27742ZM1.99992 6.98953L10.9999 10.6716V21.382L1.99992 16.882V6.98953ZM13.0001 21.382V10.6716L22.0001 6.98953V16.882L13.0001 21.382Z" fill={fill} />
    </svg>
  );
}

export default function AccountTypesComparisonCard({ account, t }) {
  const isFeatured = account.featured;
  const features = Array.from({ length: account.featureCount }, (_, index) =>
    t(`items.${account.key}.features.${index}`, "")
  ).filter(Boolean);

  return (
    <div
      className={clsx(
        "relative flex h-full flex-col rounded-[20px] border p-5 md:p-6",
        isFeatured
          ? "z-[1] border-[#293B93] bg-[#293B93] text-white lg:-mt-2 lg:mb-2 lg:min-h-[calc(100%+1rem)]"
          : "border-[#E1E7F6] bg-white"
      )}
    >
      {account.badge ? (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[8px] bg-[#B48755] px-4 py-1.5 text-[11px] font-normal text-white">
          {t(`items.${account.key}.badge`, account.badge)}
        </span>
      ) : null}

      <div
        className={clsx(
          "flex h-11 w-11 items-center justify-center rounded-[10px]",
          isFeatured ? "bg-[#69729F]" : "bg-[#F4F6FB]"
        )}
      >
        <ComparisonIcon type={account.icon} featured={isFeatured} />
      </div>

      <h3 className="HeadingH5 mt-5 text-left font-semibold">
        {t(`items.${account.key}.accountTitle`, t(`items.${account.key}.name`, account.key))}
      </h3>
      <p
        className={clsx(
          "mt-1 text-left text-xs font-normal leading-snug",
          isFeatured ? "text-white/80" : "text-[#69729F]"
        )}
      >
        {t(`items.${account.key}.subtitle`, "")}
      </p>

      <ul
        className={clsx(
          "mt-5 flex-1 border-t border-dashed pt-4",
          isFeatured ? "border-white/20" : "border-[#E1E7F6]"
        )}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            className={clsx(
              "py-2.5 text-center",
              (index < features.length - 1 || account.swapFreeAvailable !== undefined) &&
                (isFeatured
                  ? "border-b border-dashed border-white/15"
                  : "border-b border-dashed border-[#E1E7F6]")
            )}
          >
            <span
              className={clsx(
                "TextSmall block font-medium leading-snug",
                isFeatured ? "text-white" : "text-[#293B93]"
              )}
            >
              {feature}
            </span>
          </li>
        ))}

        <li className="py-2.5">
          <div className="flex items-center justify-between gap-3 px-1">
            <span
              className={clsx(
                "TextSmall text-left font-normal",
                isFeatured ? "text-white/80" : "text-[#69729F]"
              )}
            >
              {t("swapFreeLabel", "Swap-free option")}
            </span>
            <span
              className={clsx(
                "TextSmall shrink-0 text-right font-semibold",
                account.swapFreeAvailable
                  ? isFeatured
                    ? "text-[#86efac]"
                    : "text-[#16a34a]"
                  : isFeatured
                    ? "text-[#fca5a5]"
                    : "text-[#dc2626]"
              )}
            >
              {account.swapFreeAvailable
                ? t("swapFree.available", "Available on request")
                : t("swapFree.no", "No")}
            </span>
          </div>
        </li>
      </ul>

      <div className="mt-5">
        <Button
          href={REGISTER_HREF}
          external
          variant="brand"
          size="md"
          fullWidth
          className={clsx(
            "!h-10 !rounded-full !text-sm !font-normal",
            isFeatured
              ? "!border-[#B48755] !bg-[#B48755] !text-white hover:!bg-[#a07848]"
              : "!border-[#293B93] !bg-[#293B93] !text-white hover:!bg-[#243575]"
          )}
        >
          {t(`items.${account.key}.cta`, "Open now")} <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  );
}
