import Script from "next/script";
import {
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GTM_CONTAINER_ID,
  LEGACY_THIRD_PARTY_SCRIPTS_ENABLED,
  LIVE_ACCOUNT_ADS_CONVERSION,
} from "@/lib/analytics/ga4";

export default function ThirdPartyScripts({
  analytics = true,
  advertising = true,
}) {
  if (!LEGACY_THIRD_PARTY_SCRIPTS_ENABLED) return null;

  const loadGoogleTag = analytics || advertising;

  return (
    <>
      {loadGoogleTag && (
        <>
          <Script
            id="google-ads-gtag-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
              ${analytics ? `gtag('config', '${GA4_MEASUREMENT_ID}');` : ""}
            `}
          </Script>
        </>
      )}

      {analytics && (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer' ? '&l='+l : '';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
            `}
          </Script>

          <Script id="finteza-script" strategy="afterInteractive">
            {`
              (function(a,e,f,g,b,c,d){
                a[b] || (
                  a.FintezaCoreObject=b,
                  a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)},
                  a[b].l=1*new Date,
                  c=e.createElement(f),
                  d=e.getElementsByTagName(f)[0],
                  c.async=!0,
                  c.defer=!0,
                  c.src=g,
                  d && d.parentNode && d.parentNode.insertBefore(c,d)
                );
              })(window,document,"script","https://content.mql5.com/core.js","fz");

              fz("register","website",{
                id:"dzwzfjftdagmxioapjzjratbyxemivrdqi",
                trackLinks:true,
                timeOnPage:true
              });
            `}
          </Script>

          <Script
            id="umami-script"
            src="https://cloud.umami.is/script.js"
            strategy="afterInteractive"
            data-website-id="6e6d0916-5871-41f5-8ef5-1f89b83e611b"
          />

          <Script id="trustpilot-script" strategy="lazyOnload">
            {`
              (function(w,d,s,r,n){
                w.TrustpilotObject=n;
                w[n]=w[n]||function(){
                  (w[n].q=w[n].q||[]).push(arguments);
                };
                var a=d.createElement(s);
                a.async=1;
                a.src=r;
                a.type='text/javascript';
                var f=d.getElementsByTagName(s)[0];
                f.parentNode.insertBefore(a,f);
              })(window,document,'script','https://invitejs.trustpilot.com/tp.min.js','tp');

              tp('register', '4fTEXBqNZH9fKyyp');
            `}
          </Script>
        </>
      )}

      {advertising && (
        <>
          <Script id="aw-conv" strategy="afterInteractive">
            {`
              window.gtag_report_conversion = function (url) {
                var callback = function () {
                  if (typeof url != 'undefined') window.location = url;
                };
                gtag('event', 'conversion', {
                  'send_to': '${LIVE_ACCOUNT_ADS_CONVERSION}',
                  'event_callback': callback
                });
                return false;
              };
            `}
          </Script>

          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){
                if(f.fbq) return;
                n=f.fbq=function(){
                  n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
                };
                if(!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
              }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '884963704127462');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}
    </>
  );
}
