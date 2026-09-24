import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

const SITE_NAME = "GTCFX";
const COPYRIGHT = "GTC Global SA (Pty) Ltd";
const FACEBOOK_DOMAIN_VERIFICATION = "60dqaxv53ub77e10r0xc6bmbl9y2b3";

export async function getLocaleSeoMetadata(locale) {
  const base = await getPageMetadata({
    locale,
    key: "home",
    path: "",
    fallbackTitle: "GTC FX",
    fallbackDescription: "Trading & Finance",
  });

  return {
    ...base,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    other: {
      copyright: COPYRIGHT,
      "facebook-domain-verification": FACEBOOK_DOMAIN_VERIFICATION,
    },
  };
}

