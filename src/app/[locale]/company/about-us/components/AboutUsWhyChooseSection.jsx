"use client";

import clsx from "clsx";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const CARD_CLASS =
  "interactive-card relative flex h-full flex-col p-4 sm:p-7 border border-[#E1E7F6] rounded-[10px]";

function ConcentricRings() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      {[0, 1, 2, 3].map((i) => {
        const size = 90 + i * 56;
        return (
          <span
            key={i}
            className="absolute rounded-full border border-[#D8DFF5]/90"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

function LightningIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="34" height="50" viewBox="0 0 34 50" fill="none">
      <path d="M27.892 3.125L20.5677 15.9521L18.5658 19.458C18.2679 19.9805 18.6439 20.625 19.2445 20.625H24.3568C25.0355 20.625 25.392 21.4355 24.933 21.9385L10.8363 37.2021L13.7416 28.4863L14.7718 25.4004C14.9427 24.8926 14.5619 24.3701 14.0296 24.3701H4.34215C3.77574 24.3701 3.39488 23.7842 3.62926 23.2666L12.3695 4.03809C12.6234 3.48145 13.18 3.12012 13.7904 3.12012H27.892M12.7894 0C11.5638 0 10.4505 0.717773 9.94273 1.83105L0.284531 23.0811C-0.657852 25.1514 0.85582 27.5 3.13121 27.5H10.2357C10.5043 27.5 10.6898 27.7588 10.6068 28.0127L3.27769 50L28.4388 22.7441C30.2845 20.7422 28.8685 17.5 26.1439 17.5H23.9564C23.6586 17.5 23.4681 17.1777 23.6195 16.9141L33.2777 0H12.7894Z" fill="#293B93" />
    </svg>
  );
}

function PricingNodesIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="37" height="40" viewBox="0 0 37 40" fill="none">
      <path d="M11.3122 4.86508C13.9325 3.48068 16.8985 2.88304 19.8518 3.14437C22.8051 3.4057 25.6194 4.51482 27.9546 6.33771C27.6356 7.37766 27.6949 8.49663 28.1222 9.49715C28.5495 10.4977 29.3173 11.3154 30.29 11.8061C31.2627 12.2967 32.3778 12.4287 33.4386 12.1788C34.4993 11.9289 35.4375 11.3131 36.0876 10.4402C36.7376 9.56719 37.0577 8.49314 36.9914 7.40758C36.9251 6.32201 36.4766 5.29471 35.7251 4.50699C34.9736 3.71926 33.9674 3.22174 32.8841 3.10224C31.8008 2.98273 30.71 3.24893 29.8042 3.85384C26.9527 1.65441 23.5193 0.334213 19.926 0.0555124C16.3327 -0.223189 12.7361 0.551748 9.57826 2.28508L9.64377 2.34275C10.3642 3.06309 10.9316 3.92095 11.3122 4.86508ZM3.08546 18.4648C3.08572 16.3465 3.52795 14.2514 4.38402 12.3128H4.67687C5.75469 12.3144 6.7992 11.9403 7.6299 11.255C8.4606 10.5697 9.0253 9.61639 9.22641 8.55979C9.42753 7.50318 9.25242 6.40966 8.73134 5.4682C8.21027 4.52674 7.37597 3.79649 6.37263 3.40365C5.36928 3.01081 4.25993 2.98006 3.23628 3.31672C2.21262 3.65337 1.33899 4.33627 0.76634 5.24742C0.193693 6.15856 -0.0419845 7.24069 0.100035 8.30681C0.242054 9.37293 0.752847 10.3561 1.54414 11.0863C0.568089 13.3179 0.0442067 15.7201 0.00267893 18.1546C-0.0388488 20.5892 0.402799 23.0078 1.30218 25.2713C2.20156 27.5347 3.54089 29.5982 5.24301 31.3428C6.94513 33.0875 8.97639 34.4788 11.2198 35.4367C11.2377 34.3744 11.4751 33.3272 11.9172 32.3607C9.27741 31.1168 7.0459 29.1504 5.48239 26.6904C3.91888 24.2304 3.08766 21.3779 3.08546 18.4648ZM33.488 14.889C34.4138 18.756 33.8029 22.8305 31.7834 26.2578C29.764 29.6851 26.4929 32.1989 22.6563 33.2719C22.1571 32.3056 21.332 31.5462 20.3265 31.1276C19.3209 30.7091 18.1996 30.6583 17.1602 30.9842C16.1208 31.3101 15.2301 31.9918 14.6452 32.909C14.0603 33.8262 13.8187 34.9201 13.9632 35.9977C14.1076 37.0752 14.6287 38.0673 15.4346 38.7989C16.2405 39.5305 17.2795 39.9547 18.3682 39.9966C19.4569 40.0385 20.5254 39.6954 21.3854 39.0279C22.2454 38.3603 22.8415 37.4112 23.0686 36.3479C25.4325 35.7469 27.6539 34.6852 29.6048 33.2239C31.5558 31.7626 33.1978 29.9307 34.4363 27.8336C35.6748 25.7364 36.4853 23.4156 36.8212 21.0046C37.157 18.5936 37.0116 16.1402 36.3933 13.7855C35.5107 14.3477 34.5219 14.7233 33.488 14.889Z" fill="#293B93" />
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 0C8.95313 0 0 8.95313 0 20C0 31.0469 8.95313 40 20 40C31.0469 40 40 31.0469 40 20C40 8.95313 31.0469 0 20 0ZM13.1875 36.125C11.1055 35.2422 9.23047 33.9805 7.625 32.375C6.01562 30.7656 4.75391 28.8945 3.875 26.8125C2.96094 24.6562 2.5 22.3633 2.5 20C2.5 18.8672 2.60547 17.75 2.81641 16.6602C3.07031 16.7578 3.35547 16.8125 3.63281 16.8125C4.01172 16.8125 4.38672 16.7188 4.69141 16.5156C5.00391 16.3086 5.36719 16.1992 5.72656 16.1992C6.03516 16.1992 6.34375 16.2812 6.61719 16.4492C6.93359 16.6445 7.15625 16.9023 7.15625 17.3398C7.15625 20.5273 7.26562 23.9297 10.1602 23.9766C10.2461 23.9766 11.7695 24.5586 12.4961 26.4492C12.582 26.668 12.7461 26.7383 12.9727 26.7383C13.4219 26.7383 14.1055 26.4492 14.832 26.4492C15.375 26.4492 14.832 27.3711 14.832 29.3594C14.8359 31.3281 19.1016 34.3789 19.1016 34.3789C19.0781 35.6289 19.1367 36.6641 19.2305 37.4805C17.1406 37.3945 15.1094 36.9375 13.1875 36.125ZM32.375 32.375C30.7656 33.9844 28.8945 35.2461 26.8125 36.125C25.8594 36.5273 24.8828 36.8438 23.8828 37.0664C23.8242 37.0547 23.7578 37.0508 23.6875 37.0508C23.5508 37.0508 23.3945 37.0703 23.2188 37.1172C23.8242 34.5586 24.1133 33.1172 25.3633 32.0312C27.082 30.5391 25.7422 28.8906 24.4258 28.8906C24.3516 28.8906 24.2734 28.8945 24.1992 28.9062C24.1406 28.9141 24.0898 28.918 24.043 28.918C23.1758 28.918 23.75 27.5547 22.8281 27.4766C21.8594 27.3945 20.5898 25.4688 19.1797 24.8008C18.4375 24.4492 17.7148 23.5039 16.5625 23.4531H16.4961C15.7695 23.4531 14.8438 23.8867 14.3711 23.8867C14.1836 23.8867 14.0664 23.8164 14.0664 23.625C14.0664 21.3945 13.8359 19.8086 13.8008 19.1797C13.7852 18.9648 13.7227 18.9023 13.7578 18.9023C13.8047 18.9023 14.0391 19.0273 14.8438 19.0469H14.8633C15.5898 19.0469 15.2422 17.543 15.9609 17.4844C15.9922 17.4805 16.0234 17.4805 16.0547 17.4805C16.6953 17.4805 17.9102 17.9414 18.5469 17.9414C18.6797 17.9414 18.7852 17.9219 18.8555 17.875C18.8633 17.8711 18.8711 17.8672 18.8828 17.8672C19.2266 17.8672 20.5781 21.2383 21.3359 21.2383C21.6484 21.2383 21.8594 20.6641 21.8594 19.0508C21.8594 18.3828 21.5078 17.2188 21.8594 16.5781C23.2305 14.0703 24.5117 12.0195 24.4023 11.7305C24.3672 11.6406 23.9609 11.5586 23.4258 11.5586C22.9688 11.5586 22.4219 11.6172 21.9297 11.7773C21.5625 11.8984 22.0391 12.4687 21.5312 12.5898C21.1914 12.668 20.8594 12.7031 20.5469 12.7031C19.0547 12.7031 17.9766 11.9102 18.4648 11.1484C19.0859 10.2148 21.3086 10.7344 21.5078 8.85938C21.5977 7.99219 21.6758 7.01562 21.7344 6.18359C21.7539 5.88281 21.9961 5.64844 22.2969 5.62891C23.75 5.52344 23.8984 3.79297 22.5391 2.6875C24.0039 2.89844 25.4336 3.29688 26.8047 3.87891C28.8867 4.76172 30.7617 6.02344 32.3672 7.62891C33.8281 9.08984 35 10.7656 35.8672 12.6211C35.6445 12.4844 35.4141 12.418 35.1875 12.418C34.082 12.418 33.0703 13.918 33.7031 15.6211C28.5078 19.6055 29.8398 22.3945 31.5352 23.9805C32.0352 24.4492 32.5273 25.0508 32.957 25.6484C33.3711 26.2188 33.6289 26.8789 33.7773 27.5703C33.832 27.8203 34.0273 27.9453 34.3125 27.9453C34.7422 27.9453 35.3672 27.6602 35.9961 27.0977C35.1289 29.0625 33.9102 30.8398 32.375 32.375Z" fill="#293B93" />
    </svg>
  );
}

function GlobeOrbitIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 40 39" fill="none">
      <path d="M4.87046 17.4952L6.81246 10.9346L8.33733 12.7159C16.3679 5.23785 30.0063 1.38347 39.4712 8.82351C40.4896 9.62385 39.8969 10.4197 38.8779 9.61938C30.216 2.80944 17.3152 7.83939 10.0295 14.6387L11.5502 16.4778L4.87046 17.4952ZM35.1295 21.7112L33.1874 28.2718L31.6628 26.4905C23.6322 33.9686 9.99389 37.823 0.528918 30.3829C-0.489477 29.5826 0.102914 28.7868 1.12225 29.5871C9.78379 36.3968 22.6846 31.3669 29.9706 24.5678L28.4498 22.7287L35.1295 21.7112Z" fill="#293B93" />
      <path d="M20.7249 11.3462V18.806H27.9695C27.8764 15.9532 27.2249 13.1467 26.0522 10.5472C24.3168 11.0181 22.5295 11.2885 20.7249 11.3462ZM19.2998 27.6903V20.232H12.0554C12.1492 23.1129 12.8086 25.9088 13.9623 28.4738C15.7054 28.006 17.4965 27.7431 19.2998 27.6903ZM8.09993 30.9524C9.5205 30.1061 11.0266 29.4143 12.5928 28.8885C11.4009 26.1822 10.7222 23.2465 10.6294 20.232H2.27763C2.23766 20.232 2.19835 20.2289 2.16031 20.2228C2.31818 24.0409 3.72174 27.5444 5.98311 30.3495C4.68779 29.8786 3.45777 29.2271 2.33866 28.3691C0.952372 25.7083 0.169864 22.6938 0.169864 19.4999C0.169947 14.1132 2.39558 9.23509 5.99335 5.70413C9.58319 2.18078 14.5402 0 20.0124 0C24.2711 0 28.2175 1.32115 31.4507 3.56726C29.9756 3.35622 28.474 3.29246 26.976 3.36544C25.2669 2.65608 23.4216 2.20046 21.4893 2.04561C22.1226 2.60113 22.7255 3.19074 23.2953 3.81184C22.753 3.91679 22.2139 4.03782 21.6787 4.17475C21.3697 3.8627 21.0516 3.55987 20.7249 3.26666V4.43756C20.2461 4.57727 19.7708 4.73063 19.2998 4.89466V3.26666C18.4031 4.0704 17.5738 4.94711 16.8204 5.88788C15.8949 6.30699 14.9891 6.77178 14.1061 7.2759C15.3166 5.32159 16.8092 3.55892 18.5349 2.04557C14.5494 2.36441 10.9356 3.96516 8.12143 6.42549C9.39263 7.24983 10.7457 7.93896 12.1587 8.48177C11.6904 8.79453 11.2297 9.11965 10.777 9.45382C9.5739 8.93402 8.41651 8.31317 7.31713 7.59787C7.23291 7.54254 7.16109 7.47014 7.10629 7.3853C4.18344 10.3756 2.33208 14.385 2.15862 18.8165C2.19748 18.8105 2.23708 18.806 2.27763 18.806H3.29804L3.29097 18.8287L3.42804 18.806H19.2998V11.3491C18.3626 11.3218 17.4279 11.2371 16.5009 11.0955C17.2742 10.6611 18.0673 10.2617 18.8771 9.90489C21.1125 10.0173 23.2262 9.80921 25.4132 9.24729C25.2112 8.869 24.9984 8.49672 24.7748 8.13093L25.0452 8.08706C25.4651 8.02314 25.8881 7.97303 26.3136 7.93354C26.4849 8.23146 26.6495 8.53325 26.8071 8.83869C27.6313 8.56618 28.4386 8.24469 29.2248 7.8759C30.0559 7.92142 30.8833 8.02165 31.6964 8.18109C30.3415 8.97318 28.9106 9.62599 27.4255 10.1296C28.6218 12.8389 29.3024 15.7807 29.3953 18.8061H37.7471C37.788 18.8061 37.827 18.8105 37.866 18.8166C37.7204 15.0973 36.3936 11.6772 34.2436 8.90563C35.5129 9.38849 36.7169 10.0476 37.8111 10.9087L37.8377 10.9285C39.1295 13.5164 39.855 16.4246 39.855 19.5C39.855 24.8867 37.6291 29.7648 34.0316 33.2957C30.4415 36.8191 25.4844 39 20.0125 39C15.8984 39 12.0752 37.7668 8.90546 35.6573C10.4039 35.8502 11.9273 35.8896 13.444 35.7925C15.0254 36.4061 16.7181 36.804 18.4838 36.9498C17.9097 36.4433 17.3608 35.9086 16.8392 35.3476C17.383 35.2396 17.9236 35.1155 18.4601 34.9754C18.7329 35.2477 19.013 35.5125 19.2999 35.7697V34.743C19.7789 34.6033 20.2541 34.45 20.7249 34.2859V35.7697C21.5496 35.031 22.3172 34.2304 23.0211 33.3748C23.9626 32.9553 24.8835 32.4905 25.7806 31.9821C24.6077 33.8307 23.1806 35.5032 21.5416 36.9498C25.4809 36.6232 29.0549 35.0453 31.8489 32.6229C30.627 31.829 29.3292 31.1599 27.9748 30.6258C28.4394 30.3133 28.8963 29.9892 29.3449 29.6539C30.511 30.1677 31.633 30.7772 32.6995 31.4763C32.7706 31.5231 32.8328 31.5822 32.8833 31.6509C35.8178 28.6653 37.6814 24.6559 37.8646 20.2228C37.8265 20.2288 37.7873 20.232 37.7472 20.232H20.725V27.6916C21.7237 27.7235 22.7193 27.8204 23.7055 27.9819C22.9616 28.4074 22.1988 28.7986 21.4195 29.1543C19.1365 29.0039 16.8193 29.215 14.6024 29.78C14.8301 30.2071 15.0718 30.6265 15.3271 31.0374C15.2116 31.0556 15.0956 31.0754 14.9797 31.0921C14.5852 31.1527 14.189 31.2019 13.7916 31.2394C13.5894 30.8916 13.3958 30.5408 13.2114 30.1841C12.2783 30.4883 11.3667 30.8556 10.4828 31.2835C9.68061 31.2272 8.88305 31.1179 8.09993 30.9524Z" fill="#293B93" />
    </svg>
  );
}

function DevicesIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M36.875 13.032H36.0344V3.06025C36.0299 2.65387 35.9455 2.25236 35.786 1.87864C35.6265 1.50492 35.3951 1.16631 35.1049 0.882151C34.8147 0.597994 34.4715 0.373851 34.0948 0.222524C33.718 0.0711967 33.3153 -0.0043515 32.9094 0.000193536H3.125C2.71913 -0.0043515 2.31633 0.0711967 1.93962 0.222524C1.56291 0.373851 1.21966 0.597994 0.929475 0.882151C0.639286 1.16631 0.407844 1.50492 0.248364 1.87864C0.0888835 2.25236 0.00448916 2.65387 0 3.06025V25.7917C0.00448917 26.1981 0.0888835 26.5996 0.248364 26.9733C0.407844 27.347 0.639286 27.6856 0.929475 27.9698C1.21966 28.2539 1.56291 28.4781 1.93962 28.6294C2.31633 28.7807 2.71913 28.8563 3.125 28.8517H22.2844V33.0351H8.75L8.23438 33.057V33.1352C7.92037 33.242 7.64766 33.4446 7.45452 33.7145C7.26139 33.9845 7.15753 34.3082 7.15753 34.6402C7.15753 34.9722 7.26139 35.296 7.45452 35.5659C7.64766 35.8358 7.92037 36.0384 8.23438 36.1452V36.2641H22.2969V36.8711C22.2969 37.7009 22.6261 38.4968 23.2122 39.0836C23.7982 39.6703 24.5931 40 25.4219 40H36.875C37.7038 40 38.4987 39.6703 39.0847 39.0836C39.6708 38.4968 40 37.7009 40 36.8711V16.1578C39.9992 15.3285 39.6696 14.5335 39.0836 13.9474C38.4976 13.3613 37.7033 13.032 36.875 13.032ZM31.875 36.2923C31.8753 36.4038 31.8501 36.514 31.8013 36.6143C31.7526 36.7146 31.6816 36.8025 31.5938 36.8711C31.4644 36.9725 31.3049 37.0276 31.1406 37.0276C30.9955 37.0269 30.8538 36.9833 30.7335 36.9021C30.6131 36.8209 30.5195 36.7059 30.4644 36.5715C30.4093 36.4371 30.3952 36.2893 30.4239 36.1469C30.4526 36.0045 30.5227 35.8738 30.6256 35.7712C30.7284 35.6687 30.8593 35.599 31.0016 35.5709C31.144 35.5428 31.2915 35.5575 31.4255 35.6132C31.5595 35.669 31.674 35.7632 31.7546 35.8841C31.8351 36.0049 31.8781 36.147 31.8781 36.2923H31.875ZM32.8125 13.032H25.4062C24.5774 13.032 23.7826 13.3617 23.1965 13.9485C22.6105 14.5353 22.2813 15.3311 22.2813 16.1609V25.6259H3.21875V3.22296H32.8125V13.032ZM36.7719 16.2548V32.863H25.5031V16.2548H36.7719Z" fill="#293B93" />
    </svg>
  );
}

function LanguageIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M36.4911 40H7.67857V0H36.4911C38.558 0 40 1.61607 40 3.92857V36.0714C40 38.3839 38.558 40 36.4911 40ZM10.5357 37.1429H36.4911C36.7634 37.1429 36.8527 37.0536 36.9196 36.9688C37.0625 36.7812 37.1473 36.4554 37.1473 36.0714V3.92857C37.1473 3.54464 37.0625 3.21875 36.9196 3.03125C36.8527 2.94643 36.7634 2.85714 36.4911 2.85714H10.5357V37.1429Z" fill="#293B93" />
      <path d="M33.125 25.625H30.1786L28.0714 20.9554H19.4821L17.5 25.625H14.5536L22.4152 8.57143H25.2679L33.125 25.625ZM27.25 19.0312L24.1339 11.942C24.0357 11.7143 23.9286 11.317 23.8125 10.7545H23.7455C23.6473 11.2679 23.5357 11.6652 23.4107 11.942L20.3214 19.0312H27.25Z" fill="#293B93" />
      <path d="M14.5536 28.5714H33.125V31.4286H14.5536V28.5714ZM2.86607 40C1.51339 40 0 38.9018 0 37.5536V2.44643C0 1.09821 1.09821 0.0267856 2.45089 0.0267856L4.73214 0V40H2.86607Z" fill="#293B93" />
    </svg>
  );
}

function CardLabel({ children }) {
  return (
    <p className="TextSmall text-left text-[11px] font-medium uppercase tracking-[0.14em] text-[#000032]">
      <span className="mr-1.5 text-[#000032]">/</span>
      {children}
    </p>
  );
}

function CardIcon({ icon: Icon }) {
  return (
    <div className="mt-5 text-left">
      <Icon className="h-7 w-7" />
    </div>
  );
}

function WhyCard({
  label,
  title,
  description,
  icon,
  footer,
  className = "",
  children,
}) {
  return (
    <article className={clsx(CARD_CLASS, "text-left", className)}>
      <CardLabel>{label}</CardLabel>
      <CardIcon icon={icon} />

      <h3 className="HeadingH5 mt-5 font-bold text-[#111827]">{title}</h3>
      <p className="TextSmall mt-3 flex-1 font-normal leading-[1.65] text-[#666666]">
        {description}
      </p>

      {footer ? (
        <p className="text-xs mt-3 font-normal uppercase tracking-[0.08em] text-[#293B93]">
          {footer}
        </p>
      ) : null}

      {children}
    </article>
  );
}

function FeaturedExecutionCard({ t }) {
  const stats = [
    {
      value: t("featured.stat1Value", "<10ms"),
      label: t("featured.stat1Label", "EXECUTION"),
    },
    {
      value: t("featured.stat2Value", "0"),
      label: t("featured.stat2Label", "REQUOTES"),
    },
    {
      value: t("featured.stat3Value", "NDD"),
      label: t("featured.stat3Label", "MODEL"),
    },
  ];

  return (
    <article className={clsx(CARD_CLASS, "")}
    >
      <ConcentricRings />

      <div className="relative z-[1] flex h-full flex-1 flex-col">
        <CardLabel>{t("featured.label", "FOCUS")}</CardLabel>
        <div className=" flex-1 flex flex-col justify-center">
          <CardIcon icon={LightningIcon} />
          <h3 className="HeadingH4 mt-5 font-bold text-[#111827]">
            {t("featured.title", "Lightning-fast order execution")}
          </h3>
          <p className="TextSmall mt-3 max-w-md  font-normal leading-[1.65] text-[#666]">
            {t(
              "featured.description",
              "Order execution time < 10ms, NDD (No Dealing Desk Intervention) mode, zero duplicate quotes. Deep liquidity pools support institutional-level price response."
            )}
          </p>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-[#E1E7F6] pt-6 sm:pt-8">
          {stats?.map((stat,index) => (
            <div key={index} className="min-w-0 text-left">
              <p className="font-bold leading-none text-[#293B93] HeadingH4">
                {stat?.value}
              </p>
              <p className="text-xs mt-2 font-normal uppercase tracking-[0.14em] text-[#666]">
                {stat?.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AboutUsWhyChooseSection() {
  const t = usePathTranslation("aboutUsPage.whyChooseSection");

  const bottomCards = [
    // {
    //   key: "coverage",
    //   label: t("cards.coverage.label"),
    //   title: t("cards.coverage.title"),
    //   description: t("cards.coverage.description"),
    //   icon: GlobeOrbitIcon,
    // },
    {
      key: "platforms",
      label: t("cards.platforms.label"),
      title: t("cards.platforms.title"),
      description: t("cards.platforms.description"),
      icon: DevicesIcon,
    },
    {
      key: "support",
      label: t("cards.support.label"),
      title: t("cards.support.title"),
      description: t("cards.support.description"),
      icon: LanguageIcon,
    },
  ];

  const mobileCarouselItems = [
    { key: "featured" },
    { key: "pricing" },
    { key: "compliance" },
    ...bottomCards.map(({ key }) => ({ key })),
  ];

  function renderMobileCard(item) {
    switch (item.key) {
      case "featured":
        return <FeaturedExecutionCard t={t} />;
      case "pricing":
        return (
          <WhyCard
            label={t("cards.pricing.label")}
            title={t("cards.pricing.title", "Ultra-low spread cost")}
            description={t("cards.pricing.description")}
            footer={t("cards.pricing.footer")}
            icon={PricingNodesIcon}
            className="h-full"
          />
        );
      case "compliance":
        return (
          <WhyCard
            label={t("cards.compliance.label", "03 · COMPLIANCE")}
            title={t("cards.compliance.title")}
            description={t("cards.compliance.description")}
            footer={t("cards.compliance.footer", "5+ REGULATORS")}
            icon={GlobeIcon}
            className="h-full"
          />
        );
      default: {
        const card = bottomCards.find((entry) => entry.key === item.key);
        return card ? (
          <WhyCard
            label={card.label}
            title={card.title}
            description={card.description}
            icon={card.icon}
            className="h-full"
          />
        ) : null;
      }
    }
  }

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>{t("eyebrow", "WHY GTCFX")}</SectionEyebrow>
          <h2 className="HeadingH1 mx-auto mt-4 max-w-2xl font-semibold leading-[1.2] text-[#000]">
            {t(
              "title",
              "Why do over 985,000 traders worldwide choose GTCFX?"
            )}
          </h2>
          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.6] text-[#000032] md:mt-6">
            {t(
              "description",
              "Starting from Dubai, serving over 985,000 active clients worldwide, covering over 100 countries and regions—every number reflects traders' trust in GTCFX."
            )}
          </p>

          <div className="mt-12 lg:hidden">
            <MobilePeekCarousel
              items={mobileCarouselItems}
              showArrows
              trackClassName="-mx-4 px-4"
              renderItem={(item) => renderMobileCard(item)}
            />
          </div>

          <div className="mt-12 hidden flex-col gap-5 text-left sm:gap-6 lg:mt-16 lg:flex">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
              <div className="">
                <FeaturedExecutionCard t={t} />
              </div>

              <div className="flex flex-col gap-3 lg:gap-4">
                <WhyCard
                  label={t("cards.pricing.label", "02 · PRICING")}
                  title={t("cards.pricing.title", "Ultra-low spread cost")}
                  description={t(
                    "cards.pricing.description",
                    "EURUSD as low as 0.0 pips, gold as low as 0.12 pips. Institutional-grade liquidity providers make every trade more cost-effective."
                  )}
                  footer={t("cards.pricing.footer", "EURUSD · 0.0 PIPS")}
                  icon={PricingNodesIcon}
                  className="flex-1"
                />

                <WhyCard
                  label={t("cards.compliance.label", "03 · COMPLIANCE")}
                  title={t("cards.compliance.title", "Global multi-regulation")}
                  description={t(
                    "cards.compliance.description",
                    "Subject to multiple regulatory bodies including UAE, SCA, FCA, ASIC, FSC, and FSCA, client funds are held in segregated accounts, ensuring comprehensive protection of rights and interests."
                  )}
                  footer={t("cards.compliance.footer", "5+ REGULATORS")}
                  icon={GlobeIcon}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
              {bottomCards.map((card) => (
                <WhyCard
                  key={card.key}
                  label={card.label}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
