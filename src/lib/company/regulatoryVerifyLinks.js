import {
  CAMBODIA_SERC_LISTING_URL,
  CAMBODIA_SERC_VERIFY_URL,
} from "@/lib/company/cambodiaSercLicense";

/** Public verify / register URLs keyed by regulationsPage entity id. */
export const REGULATORY_ENTITY_VERIFY_LINKS = {
  cambodia: CAMBODIA_SERC_VERIFY_URL,
  southAfrica: "https://www.gtcfx.com/en-za",
  vanuatu: "https://www.gtcfx.com/en-vu",
  mauritius: "https://www.gtcfx.com/en-mu",
  australia: "https://gtcau.com.au/",
  unitedKingdom: "https://gmgmarkets.co.uk/",
  comorosAnjouan:
    "https://anjouanoffshorefinanceauthority.org/register/gtc-global-trading-ltd/",
};

export const CAMBODIA_SERC_EXTRA_LINKS = [
  {
    verifyKey: "sercListed",
    verifyLink: CAMBODIA_SERC_LISTING_URL,
  },
];

export const REGULATORY_FOOTPRINT_EXTRA_LINKS = {
  cambodia: CAMBODIA_SERC_EXTRA_LINKS,
};
