export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/gtcfx/meeting";

export const HERO_EVENTS = [
  {
    id: "profex-africa",
    title: "ProFx Expo Africa 2026",
    date: "20–21 August 2026",
    location: "Cape Town, South Africa",
    cardMeta: "20–21 Aug · Cape Town",
    thumb: "/fxpro.png",
    mainImage: "/fxpro.png",
    descriptionKey: "africa",
  },
  {
    id: "vip-gala-vietnam",
    title: "Vietnam Gala Night 2026",
    date: "21 August 2026",
    location: "Hanoi, Vietnam",
    cardMeta: "21 Aug · Hanoi",
    thumb: "/dalw.webp",
    mainImage: "/dalw.webp",
    descriptionKey: "vietnam",
  },
  {
    id: "svs-manama-bahrain",
    title: "SVS Manama, Bahrain 2026",
    date: "9–10 September 2026",
    location: "Manama, Bahrain",
    cardMeta: "9–10 Sep · Manama",
    thumb: "/smart-new.webp",
    mainImage: "/smart-new.webp",
    descriptionKey: "bahrain",
  },
];

export const DEFAULT_HERO_EVENT = HERO_EVENTS[0];
