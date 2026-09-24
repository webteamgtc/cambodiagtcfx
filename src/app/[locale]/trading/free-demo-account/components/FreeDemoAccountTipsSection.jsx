"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { localizedHref } from "@/i18n/localizedHref";
import { EDITOR_NOTE, TIPS } from "../freeDemoAccountData";
import { Icon1, Icon2, Icon3, Icon4 } from "@/app/[locale]/trading/deposit/depositData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function TipIcon({ type, page }) {
  const className = "h-4 w-4 text-[#293B93]";

  if (page === "deposit") {
    if (type === "icon1") {
      return <Icon1 />;
    }
    if (type === "icon2") {
      return <Icon2 />;
    }
    if (type === "icon3") {
      return <Icon3 />;
    }
    if (type === "icon4") {
      return <Icon4 />;
    }
  }

  if (type === "dollar") {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
        <path d="M13 15.8698C13 17.2368 12.538 18.4128 11.614 19.3998C10.689 20.3858 9.48895 20.9958 8.01193 21.2278V23.5707C8.01381 23.628 8.00366 23.685 7.98213 23.738C7.96059 23.7911 7.92816 23.839 7.88692 23.8787C7.84427 23.9191 7.79401 23.9506 7.73907 23.9714C7.68414 23.9921 7.62562 24.0018 7.56692 23.9997H5.68489C5.6269 24.0004 5.56936 23.9895 5.51562 23.9677C5.46188 23.9459 5.41302 23.9136 5.37189 23.8727C5.32971 23.8346 5.29606 23.788 5.27315 23.7359C5.25023 23.6839 5.23855 23.6276 5.23889 23.5707V21.2278C4.63441 21.1491 4.0394 21.0097 3.46286 20.8118C2.97633 20.6517 2.50346 20.4527 2.04884 20.2168C1.6917 20.0248 1.34731 19.8101 1.01782 19.5738C0.793257 19.4175 0.576963 19.2496 0.369813 19.0708C0.284582 18.9949 0.203149 18.9148 0.125809 18.8308C-0.0321931 18.6428 -0.0411936 18.4598 0.0978085 18.2808L1.53283 16.4728C1.59783 16.3828 1.70483 16.3298 1.85283 16.3128C1.99284 16.2948 2.10384 16.3348 2.18784 16.4328L2.21584 16.4598C3.26586 17.3438 4.39387 17.9018 5.60189 18.1338C5.9449 18.2048 6.2889 18.2408 6.63191 18.2408C7.38492 18.2408 8.04693 18.0488 8.61794 17.6648C9.18894 17.2808 9.47495 16.7368 9.47495 16.0308C9.47495 15.7808 9.40495 15.5448 9.26494 15.3208C9.13757 15.112 8.98061 14.9227 8.79894 14.7588C8.62694 14.6068 8.35593 14.4388 7.98393 14.2568C7.68115 14.1056 7.37436 13.9626 7.06391 13.8279C6.69553 13.6754 6.32412 13.5304 5.9499 13.3929C5.58789 13.2499 5.30189 13.1379 5.09288 13.0579C4.805 12.9449 4.51928 12.8266 4.23587 12.7029C3.93955 12.5782 3.64923 12.4397 3.36586 12.2879C3.0982 12.1376 2.83539 11.9789 2.57785 11.8119C2.31183 11.6466 2.06234 11.456 1.83283 11.2429C1.61941 11.0351 1.41712 10.8161 1.22683 10.5869C1.02586 10.3526 0.859195 10.091 0.731818 9.8099C0.607637 9.52263 0.509573 9.22477 0.438814 8.91991C0.358599 8.57742 0.318992 8.22668 0.320812 7.87492C0.320812 6.64294 0.775819 5.56195 1.68583 4.63396C2.59585 3.70497 3.78086 3.10698 5.23889 2.83898V0.430013C5.23889 0.314014 5.28289 0.213015 5.37189 0.128017C5.41294 0.0869581 5.46176 0.0544921 5.51551 0.032515C5.56925 0.0105379 5.62683 -0.000509505 5.68489 1.80403e-05H7.56592C7.69592 1.80403e-05 7.80292 0.0400176 7.88592 0.120017C7.96993 0.200016 8.01193 0.304014 8.01193 0.429013V2.78598C8.54193 2.83898 9.05494 2.94198 9.55195 3.09398C10.049 3.24598 10.452 3.39498 10.764 3.54198C11.074 3.68997 11.37 3.85697 11.648 4.04497C11.928 4.23197 12.108 4.36197 12.192 4.43297C12.275 4.50396 12.345 4.56696 12.401 4.62096C12.559 4.78096 12.582 4.95096 12.471 5.12896L11.342 7.08493C11.3125 7.14587 11.2673 7.19783 11.2111 7.23545C11.1548 7.27307 11.0895 7.29499 11.022 7.29893C10.9561 7.31192 10.8881 7.31024 10.823 7.29399C10.7578 7.27774 10.697 7.24734 10.645 7.20493C10.5801 7.14857 10.5127 7.09518 10.443 7.04493C10.2671 6.91896 10.0859 6.80052 9.89995 6.68994C9.6376 6.52989 9.36539 6.38661 9.08494 6.26094C8.74953 6.11547 8.40225 5.99905 8.04693 5.91295C7.65788 5.81222 7.25778 5.76048 6.85591 5.75895C5.9729 5.75895 5.25289 5.95095 4.69588 6.33494C4.13887 6.71894 3.85986 7.21493 3.85986 7.82092C3.85986 8.05392 3.89987 8.26792 3.97787 8.46392C4.05787 8.66091 4.19387 8.84591 4.38887 9.01991C4.58388 9.19391 4.76788 9.34191 4.93888 9.46191C5.11188 9.5819 5.37189 9.7209 5.71989 9.8769C6.0679 10.0329 6.3499 10.1539 6.5629 10.2389C6.77691 10.3239 7.10191 10.4459 7.53792 10.6069C8.03093 10.7859 8.40693 10.9269 8.66694 11.0289C8.92694 11.1319 9.27995 11.2879 9.72595 11.4979C10.172 11.7079 10.522 11.8979 10.778 12.0669C11.033 12.2369 11.321 12.4599 11.642 12.7369C11.962 13.0129 12.208 13.2969 12.38 13.5869C12.552 13.8769 12.698 14.2188 12.819 14.6118C12.939 15.0038 13 15.4228 13 15.8698Z" fill="#293B93" />
      </svg>
    );
  }

  if (type === "journal") {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M1.26371 0H20.7363C21.5788 0 22 0.421236 22 1.26371C22 2.10618 21.5788 2.52742 20.7363 2.52742H1.26371C0.421236 2.52742 0 2.10618 0 1.26371C0 0.421236 0.421236 0 1.26371 0Z" fill="#293B93" />
        <path d="M1.26371 9.73629H20.7363C21.5788 9.73629 22 10.1575 22 11C22 11.8425 21.5788 12.2637 20.7363 12.2637H1.26371C0.421236 12.2637 0 11.8425 0 11C0 10.1575 0.421236 9.73629 1.26371 9.73629Z" fill="#293B93" />
        <path d="M1.26371 19.4726H20.7363C21.5788 19.4726 22 19.8938 22 20.7363C22 21.5788 21.5788 22 20.7363 22H1.26371C0.421236 22 0 21.5788 0 20.7363C0 19.8938 0.421236 19.4726 1.26371 19.4726Z" fill="#293B93" />
      </svg>
    );
  }

  if (type === "flag") {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
        <path d="M21 3.4113L15.6257 8.72114L20.8946 13.4386L20.1138 15.4286L2.31193 15.37V24H0V0H2.31193V1.46032H20.182L21 3.4113ZM2.31193 3.74603V13.0842L17.1077 13.133L13.1716 9.60876L13.1304 7.95378L17.3894 3.74603H2.31193Z" fill="#293B93" />
      </svg>
    );
  }

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="26" height="21" viewBox="0 0 26 21" fill="none">
      <path d="M11.8486 10.498L1 19.6025V1.39551L11.8486 10.498ZM24.8486 10.498L13.999 19.6025V1.39551L24.8486 10.498Z" stroke="#293B93" stroke-width="2" />
    </svg>
  );
}

export function TipCard({ item, page }) {
  return (
    <article className="interactive-card flex gap-4 rounded-[16px] border border-[#E1E7F6] bg-white p-5 md:gap-5 md:p-6">
      <span className="interactive-card__keep flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#F2F3F8]">
        {item.iconSrc ? (
          <Image src={item.iconSrc} alt="" width={22} height={22} />
        ) : (
          <TipIcon type={item.icon} page={page}/>
        )}
      </span>
      <div className="min-w-0 text-left">
        <h3 className="Text font-semibold leading-snug text-[#000032]">{item.title}</h3>
        <p className="TextSmall mt-1 font-normal leading-[1.65] text-[#69729F]">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function NavyAsidePanel({ children, className = "" }) {
  return (
    <aside
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] bg-[#293B93] p-6 text-left md:p-8 lg:p-10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.06]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-8 bottom-16 h-28 w-28 rounded-full bg-white/[0.05]"
        aria-hidden
      />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </aside>
  );
}

function EditorsNoteCard({ locale, t }) {
  return (
    <NavyAsidePanel className="h-fit">
        <span className="inline-flex w-fit rounded-full bg-[#69729F] px-3.5 py-1 text-xs font-normal uppercase tracking-[0.14em] text-white">
          {t("editorNote.badge", EDITOR_NOTE.badge)}
        </span>

        <h3 className="HeadingH2 mt-6 font-semibold leading-[1.2] text-white">
          {t("editorNote.title", EDITOR_NOTE.title)}
        </h3>

        <p className="TextSmall mt-4 font-normal leading-[1.7] text-white">
          {t("editorNote.description", EDITOR_NOTE.description)}
        </p>

        <blockquote className="mt-6 border-l-2 border-[#69729F] pl-4">
          <p className="TextSmall italic leading-[1.65] text-white">
            &ldquo;{t("editorNote.quote", EDITOR_NOTE.quote)}&rdquo;
          </p>
        </blockquote>

        <div className="mt-auto pt-8">
          <Button
            href="/live-account-application"
            variant="secondary"
            size="lg"
            fullWidth
            className="!border-white !bg-white !text-[#293B93] hover:!bg-white/90"
          >
            {t("editorNote.cta", EDITOR_NOTE.cta)}
          </Button>
        </div>
    </NavyAsidePanel>
  );
}

export default function FreeDemoAccountTipsSection({ locale = "en" }) {
  const t = usePathTranslation("freeDemoAccountPage.tipsSection");

  const tips = TIPS.map((item) => ({
    ...item,
    title: t(`tips.${item.key}.title`, item.title),
    description: t(`tips.${item.key}.description`, item.description),
  }));

  return (
    <section className="py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow variant="compact" className="capitalize">
              {t("eyebrow", "Tips")}
            </SectionEyebrow>
            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-[#000]">
              {t("titleStart", "Demo account")}{" "}
              <span className="text-[#293B93]">{t("titleHighlight", "management tips.")}</span>
            </h2>
            <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
              {t("description", "Most traders use demo accounts wrong — they treat them as games. Here is how serious traders extract real intelligence.")}
            </p>
          </div>

          <div className="mt-10 grid items-end gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10">
            <div className="flex flex-col gap-4 md:gap-5">
              {tips.map((item) => (
                <TipCard key={item.key} item={item} />
              ))}
            </div>

            <EditorsNoteCard locale={locale} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
