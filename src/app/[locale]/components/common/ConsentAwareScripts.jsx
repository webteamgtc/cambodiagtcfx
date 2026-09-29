"use client";

import { THIRD_PARTY_TRACKING_ENABLED } from "@/config/cambodiaSite";
import ThirdPartyScripts from "@/app/[locale]/components/common/seo/ThirdPartyScripts";

export default function ConsentAwareScripts() {
  if (!THIRD_PARTY_TRACKING_ENABLED) return null;
  return <ThirdPartyScripts analytics advertising />;
}
