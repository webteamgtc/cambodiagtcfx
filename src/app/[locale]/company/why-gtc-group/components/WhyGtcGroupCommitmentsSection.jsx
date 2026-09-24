"use client";

import Image from "next/image";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";

export const WHY_GTC_COMMITMENTS = [
  {
    key: "transparency",
    number: "01",
    title: "Transparency",
    description:
      "We provide clear information about our services, legal entities, terms, fees, and risks. Full details are in the Client Agreement and related documents, which should be reviewed before opening or funding an account.",
    titleKey: "cards.transparency.title",
    descriptionKey: "cards.transparency.description",
    icon: TransparencyIcon,
  },
  {
    key: "security",
    number: "02",
    title: "Security",
    description:
      "We apply operational and technical controls designed to protect client information and support the appropriate andling of client funds. Where applicable, client funds are held separately from company operating funds.",
    titleKey: "cards.security.title",
    descriptionKey: "cards.security.description",
    icon: SecurityIcon,
  },
  {
    key: "professionalism",
    number: "03",
    title: "Professionalism",
    description:
      "We offer a range of trading tools, account types, and support services for eligible retail and professional clients. Features and availability may vary depending on the account type, platform, client classification, and jurisdiction.",
    titleKey: "cards.professionalism.title",
    descriptionKey: "cards.professionalism.description",
    icon: ProfessionalismIcon,
  },
  {
    key: "connectivity",
    number: "04",
    title: "Connectivity",
    description:
      "We provide eligible clients with access to international markets through our trading platforms and support infrastructure. ",
    titleKey: "cards.connectivity.title",
    descriptionKey: "cards.connectivity.description",
    icon: ConnectivityIcon,
  },
];

export const CAREER_CORE_VALUES = [
  {
    key: "innovation",
    number: "01",
    title: "Innovation-Driven Culture",
    description:
      "We reward curiosity. From trading algorithms to internal tooling, new ideas move fast here. No red tape — just results.",
    titleKey: "cards.innovation.title",
    descriptionKey: "cards.innovation.description",
    icon: InnovationIcon,
  },
  {
    key: "growth",
    number: "02",
    title: "Real Growth Opportunities",
    description:
      "Clear career tracks, mentorship from senior market professionals, and cross-functional mobility. Your ceiling is high — and visible.",
    titleKey: "cards.growth.title",
    descriptionKey: "cards.growth.description",
    icon: GrowthIcon,
  },
  {
    key: "collaboration",
    number: "03",
    title: "Global Collaboration",
    description:
      "Work alongside colleagues from 18+ nationalities, across 12 offices. Every challenge benefits from a genuinely diverse perspective.",
    titleKey: "cards.collaboration.title",
    descriptionKey: "cards.collaboration.description",
    icon: HandshakeIcon,
  },
  {
    key: "compensation",
    number: "04",
    title: "Competitive Compensation",
    description:
      "Market-leading base salaries, performance bonuses, equity participation, and comprehensive benefits designed for top performers.",
    titleKey: "cards.compensation.title",
    descriptionKey: "cards.compensation.description",
    icon: CompensationIcon,
  },
];

function InnovationIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill="none">
      <path d="M19.7143 26H3.28571C1.472 26 0 24.544 0 22.75V3.25C0 1.456 1.472 0 3.28571 0H19.7143C21.528 0 23 1.456 23 3.25V22.75C23 24.544 21.528 26 19.7143 26ZM3.28571 1.625C2.37886 1.625 1.64286 2.353 1.64286 3.25V22.75C1.64286 23.647 2.37886 24.375 3.28571 24.375H19.7143C20.6211 24.375 21.3571 23.647 21.3571 22.75V3.25C21.3571 2.353 20.6211 1.625 19.7143 1.625H3.28571Z" fill="#293B93" />
      <path d="M4.92857 25.194C4.46857 25.194 4.10057 24.83 4.10057 24.375V1.625C4.10057 1.17 4.46857 0.819 4.92857 0.819C5.38857 0.819 5.75657 1.183 5.75657 1.625V24.375C5.74343 24.83 5.38857 25.194 4.92857 25.194ZM12.328 9.75C12.0651 9.75 11.8023 9.685 11.5526 9.555C11.0137 9.269 10.6851 8.723 10.6851 8.125V1.625C10.6851 1.17 11.0531 0.819 11.5131 0.819C11.9731 0.819 12.3411 1.183 12.3411 1.625V8.125L14.352 6.799C14.628 6.617 14.9829 6.617 15.2589 6.799L17.2697 8.125V1.625C17.2697 1.17 17.6377 0.819 18.0977 0.819C18.5577 0.819 18.9257 1.183 18.9257 1.625V8.125C18.9257 9.022 18.1897 9.75 17.2829 9.75C16.9543 9.75 16.6389 9.659 16.376 9.477L14.7857 8.45L13.2349 9.477C12.9589 9.659 12.6434 9.75 12.328 9.75ZM18.0714 21.125H11.5C11.04 21.125 10.672 20.761 10.672 20.306C10.672 19.851 11.04 19.487 11.5 19.487H18.0714C18.5314 19.487 18.8994 19.851 18.8994 20.306C18.8994 20.761 18.5314 21.125 18.0714 21.125Z" fill="#293B93" />
    </svg>
  );
}

function GrowthIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M16.2322 9.7188C15.7954 9.28274 15.2717 8.93286 14.7004 8.69663C14.1291 8.4604 13.5118 8.33783 12.8938 8.33783C12.2757 8.33783 11.6577 8.4604 11.0871 8.69663C10.5159 8.93286 9.99217 9.282 9.55537 9.7188C9.11857 10.1549 8.76869 10.6786 8.53171 11.2483C8.29549 11.8189 8.17217 12.4354 8.17217 13.0527C8.17217 13.6701 8.29474 14.2866 8.53171 14.8571C8.76794 15.4277 9.11783 15.9506 9.55537 16.3867C9.99217 16.8227 10.5159 17.1726 11.0871 17.4089C11.6577 17.6451 12.2757 17.7677 12.8938 17.7677C13.5118 17.7677 14.1291 17.6451 14.7004 17.4089C15.2709 17.1726 15.7954 16.8235 16.2322 16.3867C16.669 15.9506 17.0189 15.4277 17.2551 14.8571C17.4913 14.2874 17.6146 13.6701 17.6146 13.0527C17.6146 12.4354 17.4913 11.8189 17.2551 11.2483C17.0196 10.6786 16.6697 10.1556 16.2322 9.7188ZM23.3227 11.8709C22.9001 6.80457 19.185 3.02566 14.1113 2.67429V0H11.9429V2.7092C7.01109 3.16606 3.09994 6.91006 2.67726 11.8709H0V14.0831H2.67726C3.09994 19.0439 6.96429 22.7983 11.8961 23.2908V26H14.1106V23.3257C19.1835 22.9736 22.8993 19.1486 23.322 14.0823H26V11.8709H23.3227ZM13 21.5079C8.3148 21.5079 4.498 17.6622 4.498 13.0178C4.498 8.37349 8.34971 4.48091 13 4.48091C17.6859 4.48091 21.502 8.37349 21.502 13.0178C21.502 17.6614 17.6852 21.5079 13 21.5079Z" fill="#293B93" />
    </svg>
  );
}

function HandshakeIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="26" height="17" viewBox="0 0 26 17" fill="none">
      <path d="M25.9361 7.12171C26.0739 7.353 25.9815 7.65901 25.7292 7.80526L24.3351 8.61424C24.0834 8.76038 23.7674 8.69148 23.6298 8.46001L19.8739 2.1594C19.736 1.92819 19.8283 1.62215 20.0804 1.47612L21.4745 0.667136C21.7263 0.520915 22.0425 0.589679 22.1805 0.820997L25.9361 7.12171ZM2.52858 8.61171C2.50329 8.6756 2.4655 8.73394 2.41735 8.78341C2.3692 8.83288 2.31165 8.87251 2.24798 8.90004C2.18431 8.92756 2.11576 8.94244 2.04626 8.94382C1.97676 8.94521 1.90767 8.93307 1.84292 8.9081L0.336485 8.32772C0.2058 8.27731 0.100759 8.17775 0.0444604 8.05093C-0.0118379 7.92412 -0.0147837 7.78043 0.0362707 7.65147L2.93307 0.332146C2.98419 0.203211 3.08508 0.0995644 3.21359 0.0439714C3.3421 -0.0116216 3.48772 -0.0146155 3.61846 0.0356474L5.12498 0.616235C5.25575 0.666599 5.36089 0.76614 5.41729 0.892972C5.4737 1.0198 5.47674 1.16355 5.42576 1.29259L2.52858 8.61171ZM19.7728 2.43925L23.4904 8.65515L20.5816 11.648L14.2349 4.89391C14.2349 4.89391 13.8978 4.40382 13.5375 4.64942C13.1773 4.89499 9.69276 6.6753 9.69276 6.6753C9.69276 6.6753 8.5727 7.1665 8.19946 6.73671C7.82624 6.30696 7.63948 5.44536 8.19946 4.89391C8.75954 4.34249 12.8683 1.80589 13.7373 1.55292C14.4489 1.34563 15.5022 1.05516 16.4439 1.86372C17.3421 2.63492 19.0346 2.70627 19.7728 2.43925ZM13.2189 16.7041C12.852 17.0849 12.2417 17.1002 11.8556 16.7382C11.4695 16.376 11.4541 15.7737 11.8211 15.3929L12.7 14.4806C13.0669 14.0997 13.6774 14.0845 14.0635 14.4464C14.4495 14.8086 14.465 15.411 14.0981 15.7918L13.2189 16.7041ZM6.75911 12.7786C6.4272 13.1233 5.85617 13.1195 5.4841 12.7704C5.11168 12.4211 5.07905 11.8588 5.41136 11.5142L6.2065 10.6889C6.53847 10.3443 7.10931 10.348 7.48162 10.697C7.85393 11.0462 7.8864 11.6086 7.55462 11.9532L6.75911 12.7786ZM10.8789 15.5953C10.5564 15.9311 9.98678 15.9153 9.60672 15.56C9.22675 15.2049 9.17981 14.6444 9.50245 14.3087L11.3504 12.3841C11.6729 12.0481 12.2426 12.0639 12.6224 12.4193C13.0026 12.7744 13.0495 13.3347 12.7269 13.6706L10.8789 15.5953ZM8.95714 14.1142C8.67468 14.4085 8.1425 14.3637 7.7688 14.0145C7.39513 13.6652 7.32111 13.1434 7.60357 12.8492L9.22264 11.163C9.50509 10.8688 10.037 10.9135 10.4108 11.2628C10.7846 11.6121 10.8586 12.1338 10.576 12.4281L8.95714 14.1142Z" fill="#293B93" />
      <path d="M5.64335 10.6207L5.11598 11.1615L3.00391 8.94409C3.00391 8.94409 2.78607 8.86442 3.00391 8.21504C3.22153 7.56559 5.58602 1.64131 5.58602 1.64131C5.58602 1.64131 5.92824 1.33422 6.17708 1.51848C6.42608 1.70264 6.91342 2.43933 7.43203 2.31658C7.95046 2.19384 10.1282 0.690768 10.9061 0.843839C11.6838 0.996804 12.4615 1.54923 12.4615 1.54923L11.8083 1.94824C11.8083 1.94824 11.1492 1.54923 10.7476 1.57992C10.3462 1.61056 7.80525 3.2529 7.29713 3.19151C6.7891 3.12999 5.9907 2.59285 5.9907 2.59285C5.9907 2.59285 3.67016 8.14338 3.73897 8.50569C3.77379 8.68969 5.64335 10.6207 5.64335 10.6207ZM14.6589 15.653C14.6589 15.653 16.0471 16.1142 15.9771 14.6177L13.8538 12.142C13.8538 12.142 13.6828 11.625 14.3633 11.648L16.7238 14.3088C16.7238 14.3088 17.4703 14.6955 17.9602 14.1847C18.4503 13.6739 18.0769 13.1675 18.0769 13.1675L15.9069 10.6581C15.9069 10.6581 15.6508 10.3357 16.0239 10.0596C16.397 9.78329 16.7004 10.2897 16.7004 10.2897L18.9169 12.9174C18.9169 12.9174 19.5788 13.4036 20.317 12.7991C20.9351 12.2928 20.8653 11.4006 20.8653 11.4006L20.8584 10.9686L21.3903 10.6294C21.3903 10.6294 21.7845 12.4861 20.9562 13.2228C20.1277 13.9596 18.8888 13.6849 18.8888 13.6849C18.8888 13.6849 18.7769 14.664 18.1002 14.9862C17.4236 15.3087 16.7704 15.1014 16.7704 15.1014C16.7704 15.1014 16.7935 15.9532 16.0004 16.3445C15.207 16.736 14.2037 16.3445 14.2037 16.3445L14.6589 15.653Z" fill="#293B93" />
    </svg>
  );
}

function CompensationIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M0 26V23.5428H3.25V17.8092H6.5V23.5428H11.7813V4.73263L5.56075 11.0035L3.83663 9.26623L13.0293 0L22.2219 9.26705L20.4986 11.0043L14.2188 4.67284V23.5428H19.5V13.7138H22.75V23.5428H26V26H0Z" fill="#293B93" />
    </svg>
  );
}

function TransparencyIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M9.99994 0C15.4624 0 19.9124 4.3625 19.9986 9.82625C20.0419 12.4483 19.055 14.9827 17.2499 16.885C15.4448 18.7874 12.9657 19.9058 10.3449 20H9.99869C4.46997 20 0 15.53 0 10C0 4.47 4.46997 0 9.99994 0ZM9.99994 1.25C5.14997 1.25 1.24999 5.17375 1.24999 10C1.24999 14.8263 5.17372 18.75 9.99994 18.75V1.25Z" fill="#293B93" />
    </svg>
  );
}

function SecurityIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
      <path d="M9.9784 18.3865C9.57527 18.6004 9.28237 18.6956 9.02903 18.6956C8.77391 18.6956 8.48945 18.6013 8.07966 18.3795C1.2425 14.6843 1.26517 12.6604 1.34918 5.12941C1.35762 4.38071 1.36651 3.58157 1.36918 2.72547C2.42833 2.41851 3.56082 2.12894 4.7422 1.86372C6.03247 1.57372 7.46764 1.38633 9.00681 1.30589C11.9354 1.62372 14.1817 2.04286 16.6147 2.72939C16.6191 3.69679 16.632 4.59027 16.6431 5.41811C16.7493 12.9878 16.7751 14.7865 9.9784 18.3865ZM17.9765 5.40028C17.9632 4.4394 17.9485 3.39113 17.9463 2.23981C17.9458 1.95242 17.7525 1.69894 17.4707 1.61676C14.7541 0.819365 12.3292 0.351969 9.09925 0.00370449C9.0637 -0.000208579 9.0277 -0.000643369 8.99214 0.000660981C7.35474 0.0832706 5.82446 0.282403 4.44352 0.592406C3.05413 0.904584 1.72919 1.2498 0.506922 1.61807C0.2278 1.70198 0.0366812 1.95503 0.0366812 2.24112C0.0366812 3.27722 0.0255696 4.23114 0.0162359 5.11506C-0.0682118 12.6351 -0.0997694 15.4491 7.43475 19.5213C8.0561 19.857 8.53301 20 9.02903 20C9.51616 20 10.0051 19.8561 10.6135 19.5339C18.1192 15.5573 18.0863 13.2025 17.9765 5.40028ZM13.7033 5.69063L7.69156 11.5937L4.74033 8.69675C4.39409 8.35718 3.83096 8.35588 3.48295 8.69458C3.13538 9.03371 3.13449 9.58415 3.48073 9.92459L7.06175 13.4398C7.22887 13.6033 7.4551 13.6955 7.69156 13.6955C7.92801 13.6955 8.15469 13.6033 8.32136 13.4394L14.9629 6.9176C15.3092 6.5776 15.3083 6.02672 14.9603 5.68802C14.6132 5.34933 14.0496 5.34976 13.7033 5.69063Z" fill="#293B93" />
    </svg>
  );
}

function ProfessionalismIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path d="M19.8682 6.7L17.0591 0.7C16.7582 0.3 16.3569 0 15.8552 0H4.21767C3.71605 0 3.21443 0.3 3.01378 0.7L0.104389 6.7C-0.096259 7.2 0.00406494 7.8 0.305037 8.2L9.03322 17.6C9.33419 17.8 9.63516 18 10.0365 18C10.4378 18 10.7387 17.8 11.0397 17.6L19.6676 8.1C20.0689 7.7 20.0689 7.2 19.8682 6.7ZM10.0365 16.2L1.70957 7.2L4.41832 1.6H15.5543L18.263 7.2L10.0365 16.2Z" fill="#293B93" />
      <path d="M14.6514 5.7L10.0365 10.9L5.52188 5.7C5.22091 5.4 4.71929 5.3 4.318 5.6C3.9167 5.9 3.9167 6.4 4.21767 6.7L8.9329 12.1C9.23387 12.4 9.63516 12.6 10.0365 12.6C10.4378 12.6 10.8391 12.4 11.0397 12.1L15.9556 6.7C16.2565 6.4 16.1562 5.9 15.8552 5.6C15.454 5.3 14.9523 5.4 14.6514 5.7Z" fill="#293B93" />
    </svg>
  );
}

function ConnectivityIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.481 7.70746C12.3293 7.55712 12.1677 7.4172 11.9971 7.28864C11.8194 7.11888 11.5834 7.02354 11.3376 7.02215C11.0917 7.02075 10.8547 7.11341 10.675 7.28114C10.4953 7.44887 10.3865 7.67897 10.371 7.92429C10.3555 8.16961 10.4344 8.41158 10.5915 8.60062H10.5899C10.6575 8.6819 10.7378 8.75156 10.8279 8.80686C10.9183 8.88142 11.0072 8.9544 11.0913 9.03848L11.1706 9.1178C12.1701 10.1141 11.8702 11.8322 10.8723 12.8301L6.61098 17.0912C6.13046 17.5699 5.47984 17.8387 4.80158 17.8387C4.12332 17.8387 3.47269 17.5699 2.99218 17.0912L2.91285 17.0103C2.43339 16.5302 2.16409 15.8795 2.16409 15.201C2.16409 14.5225 2.43339 13.8717 2.91285 13.3917L4.79444 11.5101C4.96591 11.3758 5.09108 11.1913 5.15241 10.9823C5.21374 10.7733 5.20816 10.5504 5.13646 10.3447C5.06475 10.139 4.93051 9.96096 4.75254 9.8354C4.57457 9.70984 4.36178 9.64308 4.14397 9.6445C3.93457 9.64435 3.72999 9.70738 3.55697 9.82535L3.55221 9.819L3.53317 9.83804C3.45866 9.89146 3.39146 9.95439 3.33327 10.0252L1.3787 11.856C0.495633 12.7447 0 13.9466 0 15.1994C0 16.4522 0.495633 17.6541 1.3787 18.5428L1.45803 18.6221C2.34668 19.5047 3.54832 20 4.80079 20C6.05325 20 7.25489 19.5047 8.14354 18.6221L12.4033 14.3626C14.2405 12.5223 14.3959 9.62387 12.5588 7.78519L12.481 7.70746Z" fill="#293B93" />
      <path d="M18.6208 1.45848L18.5415 1.37916C17.6532 0.495838 16.4514 0 15.1987 0C13.946 0 12.7442 0.495838 11.8559 1.37916L7.59778 5.64192C5.75744 7.4806 5.6575 10.1363 7.49625 11.9766L7.57399 12.0527C7.65649 12.1368 7.74374 12.2161 7.83259 12.2907C7.89605 12.3621 7.9722 12.4239 8.0547 12.4715L8.05787 12.4731C8.22642 12.5706 8.42183 12.6114 8.61532 12.5895C8.8088 12.5676 8.99014 12.4841 9.13263 12.3514C9.27511 12.2187 9.37122 12.0438 9.4068 11.8523C9.44237 11.6609 9.41554 11.4631 9.33024 11.288C9.20967 11.0183 8.98439 10.8549 8.82891 10.6995L8.74958 10.6217C7.75167 9.62228 8.13085 8.17387 9.13034 7.17441L13.3917 2.91483C13.8715 2.43549 14.522 2.16623 15.2003 2.16623C15.8785 2.16623 16.5291 2.43549 17.0089 2.91483L17.0882 2.99415C18.0877 3.99202 18.0877 5.61653 17.0882 6.6144L15.213 8.48957C14.9851 8.64356 14.8278 8.88176 14.7756 9.15175C14.7234 9.42175 14.7806 9.70143 14.9346 9.92926C15.0886 10.1571 15.3268 10.3144 15.5968 10.3666C15.8668 10.4189 16.1465 10.3617 16.3743 10.2077L16.3775 10.214L16.406 10.1871C16.4961 10.1274 16.5764 10.054 16.644 9.96971L18.6208 8.14531C19.5041 7.2571 20 6.05536 20 4.80269C20 3.55002 19.5041 2.34828 18.6208 1.46007V1.45848Z" fill="#293B93" />
    </svg>
  );
}

export function CommitmentCard({ item, t }) {
  const iconSrc =
    item.iconSrc ?? (typeof item.icon === "string" ? item.icon : undefined);
  const Icon = typeof item.icon === "function" ? item.icon : undefined;

  return (
    <article className="interactive-card group flex h-full min-w-0 flex-col rounded-[22px] border border-[#E1E7F6] bg-white p-4 text-center sm:p-5 md:text-left">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6] md:mx-0">
        {item.iconSrc ? (
          <Image src={item.iconSrc} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
        ) : Icon ? (
          <Icon className="h-4 w-4" />
        ) : null}
      </span>

      <p className="TextSmall mt-9 font-normal text-[#999]">
        {item.number}
      </p>

      <h3 className="HeadingH5 mt-3 font-semibold text-[#000]">
        {t(item.titleKey, item.title)}
      </h3>

      <p className="text-xs mt-3 flex-1 font-normal leading-[1.65] text-[#666] group-hover:!text-white">
        {t(item.descriptionKey, item.description)}
      </p>
    </article>
  );
}

const DEFAULT_DESCRIPTION_CLASS =
  "TextSmall mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6";

export default function WhyGtcGroupCommitmentsSection({
  translationNamespace = "whyGtcGroupPage.commitmentsSection",
  items = WHY_GTC_COMMITMENTS,
  descriptionClassName = DEFAULT_DESCRIPTION_CLASS,
}) {
  const t = usePathTranslation(translationNamespace);

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">

        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
              {t("eyebrow", "Why GTCFX")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
              {t("title", "Our Four Core Commitments")}
            </h2>

            <p className={descriptionClassName}>
              {t(
                "description",
                "Our four commitments define our relationship with each client and every investment decision we make."
              )}
            </p>
          </FadeInSection>
          <div className="mt-8 text-left sm:hidden lg:mt-16">
            <MobilePeekCarousel
              items={items}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <CommitmentCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-12 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">
            {items.map((item, index) => (
              <FadeInSection key={item.key} delay={index * 0.1}>
                <CommitmentCard key={item.key} item={item} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
