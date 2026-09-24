'use client';
import MobilePeekCarousel from "../MobilePeekCarousel";

const STAR_ORANGE = "#ea580c";
const STAR_EMPTY = "#e5e7eb";

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z";

function StarPiece({ fraction }) {
  const f = Math.min(1, Math.max(0, fraction));

  return (
    <span className="relative inline-flex h-[18px] w-[18px] shrink-0 md:h-5 md:w-5" aria-hidden>
      <svg className="absolute h-full w-full" viewBox="0 0 24 24">
        <path d={STAR_PATH} fill={STAR_EMPTY} />
      </svg>
      {f > 0 && (
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${f * 100}%` }}>
          <svg className="h-[18px] w-[18px] md:h-5 md:w-5" viewBox="0 0 24 24">
            <path d={STAR_PATH} fill={STAR_ORANGE} />
          </svg>
        </span>
      )}
    </span>
  );
}

function RatingStars({ outOfFive }) {
  const v = Math.min(5, Math.max(0, outOfFive));
  const segments = [];
  for (let i = 0; i < 5; i++) {
    segments.push(Math.min(1, Math.max(0, v - i)));
  }

  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {segments.map((frac, i) => (
        <StarPiece key={i} fraction={frac} />
      ))}
    </span>
  );
}

function LogoGoogle() {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] md:h-[60px] md:w-[60px]"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-9 w-9 md:h-10 md:w-10">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </span>
  );
}

function LogoWikiFX() {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ffd400] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] md:h-[60px] md:w-[60px]"
      aria-hidden
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
  <path d="M5.11859 15.7418C3.38731 16.8576 2.09754 18.492 0.59192 20.0647C0.471507 19.5573 0.354661 19.1367 0.273493 18.7078C-0.0208364 17.1636 -0.0780462 15.58 0.104021 14.0168C0.142846 13.767 0.270268 13.5417 0.460803 13.386C1.16246 12.8628 1.89208 12.382 2.64609 11.946C3.40336 11.5255 4.21236 11.2078 5.04813 10.8247C3.38463 10.8602 1.88882 11.3508 0.439396 12.232C0.447424 12.0694 0.427801 11.961 0.459911 11.8741C0.921052 10.6293 1.36435 9.37622 1.86652 8.14927C2.13411 7.49514 2.60952 7.19611 3.37214 7.2148C6.16574 7.27087 8.96291 7.19144 11.7565 7.25405C13.4084 7.29143 14.9586 7.85865 16.4339 8.63426C17.0529 8.96039 17.1421 9.55097 17.1537 10.1752C17.1662 10.8424 17.1618 10.8181 17.7942 11.0059C19.744 11.5844 21.8187 13.2141 21.7081 16.1651C21.6956 16.4903 21.7081 16.8193 21.7081 17.2258C21.5511 17.1024 21.4476 17.0286 21.3513 16.9454C20.4129 16.1231 19.3497 15.6615 18.109 15.7764C16.8543 15.8923 15.6005 16.0268 14.3476 16.1801C14.0524 16.2165 13.7705 16.367 13.4833 16.4716L13.4985 16.6015C13.9177 16.6296 14.3369 16.695 14.7544 16.6791C16.0097 16.6407 17.2508 16.966 18.3409 17.6192C18.7271 17.8444 19.1071 18.1088 19.1232 18.7106C19.0036 18.6807 18.8966 18.6826 18.8244 18.6312C17.8147 17.9089 16.6756 17.8743 15.5241 17.9509C14.4538 18.0229 13.395 18.1901 12.4023 18.6546C9.88787 19.8329 8.82912 22.2055 9.53644 25.0314C10.0261 26.9863 10.9636 28.7169 11.9786 30.4074C12.0633 30.5485 12.1445 30.6877 12.2587 30.8858C11.5255 30.9578 10.8699 30.8858 10.2491 30.6186C9.43833 30.2728 8.63557 29.9037 7.84797 29.5037C7.61476 29.3756 7.42065 29.1813 7.28782 28.9431C6.14612 26.8695 5.7715 24.609 5.8607 22.2457C5.86694 22.0747 5.8821 21.9037 5.89013 21.7327C5.89695 21.6381 5.88666 21.543 5.8598 21.4524C5.4388 22.3971 5.30947 23.4147 5.27557 24.4427C5.24168 25.4706 5.26041 26.5013 5.26041 27.6423C4.88133 27.2685 4.52544 26.9536 4.20434 26.6032C3.08381 25.3716 2.15117 23.9665 1.43928 22.4373C1.35966 22.2816 1.31499 22.1089 1.30865 21.9324C1.30231 21.7559 1.33448 21.5802 1.40271 21.4187C2.09058 19.5521 3.16009 17.8658 4.53614 16.4782C4.74754 16.2623 4.97231 16.0595 5.19084 15.8512L5.11859 15.7418ZM14.9631 11.7535C13.5763 11.8965 12.1827 11.5636 10.9921 10.805C11.1393 11.2564 11.2793 11.7096 11.5469 12.0553C12.6039 13.4225 13.8401 13.5383 14.9631 11.7535Z" fill="black"/>
  <path d="M19.4675 5.5692H3.57551C3.71822 5.38231 3.8092 5.2356 3.92069 5.11131C7.26731 1.39213 11.3748 -0.297393 16.243 0.0427532C16.3326 0.0540842 16.4189 0.0848698 16.4965 0.133142C16.5741 0.181414 16.6411 0.24611 16.6935 0.323094C17.5926 1.95468 18.472 3.59654 19.3533 5.23279C19.3999 5.34155 19.438 5.45405 19.4675 5.5692Z" fill="black"/>
  <path d="M18.1616 0.373555C18.398 0.415606 18.5264 0.427754 18.6486 0.461395C23.3368 1.76965 26.6762 4.75995 28.7161 9.35567C28.7937 9.53322 28.8053 9.83318 28.7117 9.98924C27.867 11.418 26.9929 12.8291 26.125 14.2439C26.0671 14.3221 26.0049 14.3967 25.9386 14.4672L18.1616 0.373555Z" fill="black"/>
  <path d="M21.667 25.0631L29.3307 11.4517L29.4805 11.4713C29.6188 12.2245 29.8025 12.9721 29.8873 13.7308C30.3333 17.7621 29.4574 21.4552 27.2337 24.7837C27.1329 24.9361 26.9189 25.0968 26.7565 25.0987C25.1225 25.1211 23.4884 25.1108 21.8508 25.108C21.7885 25.0981 21.7271 25.0831 21.667 25.0631Z" fill="black"/>
  <path d="M11.5692 26.1649H26.1562C26.0108 26.3518 25.9225 26.4835 25.8164 26.5985C24.0512 28.4964 21.981 29.9158 19.554 30.6559C18.6727 30.9241 17.7067 30.9129 16.7764 30.9671C15.9014 31.0185 15.022 30.9989 14.1452 30.9802C13.9864 30.9802 13.7491 30.8718 13.6849 30.74C12.9803 29.2991 12.3033 27.8432 11.6209 26.3901C11.5975 26.3167 11.5802 26.2414 11.5692 26.1649Z" fill="black"/>
</svg>
    </span>
  );
}

function LogoInvesting() {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] md:h-[60px] md:w-[60px]"
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="h-11 w-11 md:h-12 md:w-12">
        <path
          d="M9 30 L17 21 L23 26 L34 13 L41 18"
          stroke="#f5c400"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text x="24" y="42" textAnchor="middle" fill="#fafafa" fontSize="7" fontWeight="600">
          investing
        </text>
      </svg>
    </span>
  );
}

function LogoMyfxbook() {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2d2d2d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] md:h-[60px] md:w-[60px]"
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="h-10 w-10 md:h-11 md:w-11">
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fill={STAR_ORANGE}
          fontSize="20"
          fontWeight="700"
          fontStyle="italic"
          fontFamily="Georgia,serif"
        >
          fx
        </text>
      </svg>
    </span>
  );
}

const PLATFORMS = [
  {
    key: "google",
    name: "Google",
    scoreLabel: "4.5",
    starsOutOfFive: 4.5,
    Logo: LogoGoogle,
  },
  {
    key: "wikifx",
    name: "WikiFX",
    scoreLabel: "9.2",
    starsOutOfFive: 5,
    Logo: LogoWikiFX,
  },
  {
    key: "investing",
    name: "Investing.com",
    scoreLabel: "4.1",
    starsOutOfFive: 4.1,
    Logo: LogoInvesting,
  },
  {
    key: "myfxbook",
    name: "myfxbook",
    scoreLabel: "4.8",
    starsOutOfFive: 4.8,
    Logo: LogoMyfxbook,
  },
];

function TrustItem({ name, scoreLabel, starsOutOfFive, Logo }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-3.5 md:justify-start lg:gap-4">
      <Logo />
      <div className="min-w-0 text-start">
        <div className="HeadingH5 text-neutral-900">{name}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 md:gap-2">
          <span className="TextSmall font-medium tabular-nums text-neutral-800">{scoreLabel}</span>
          <RatingStars outOfFive={starsOutOfFive} />
        </div>
      </div>
    </div>
  );
}

export default function TrustRatingsSection() {
  return (
    <section className="bg-[#F1F2F6] py-8 md:py-10" aria-label="Platform ratings">
      <div className="container">
        <div className="md:hidden">
          <MobilePeekCarousel
            items={PLATFORMS}
            showArrows={true}
            trackClassName="-mx-4 px-4"
            renderItem={(p) => (
              <TrustItem
                name={p.name}
                scoreLabel={p.scoreLabel}
                starsOutOfFive={p.starsOutOfFive}
                Logo={p.Logo}
              />
            )}
          />
        </div>

        <div className="hidden grid-cols-1 gap-8 sm:grid-cols-2 md:grid lg:grid-cols-4 lg:gap-6 xl:gap-10">
          {PLATFORMS.map((p) => (
            <TrustItem
              key={p.key}
              name={p.name}
              scoreLabel={p.scoreLabel}
              starsOutOfFive={p.starsOutOfFive}
              Logo={p.Logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
