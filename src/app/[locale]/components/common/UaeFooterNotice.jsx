"use client";

function FooterParagraph({ children, className = "" }) {
  return (
    <p className={`text-xs leading-[1.75] text-black/70 ${className}`.trim()}>
      {children}
    </p>
  );
}

function FooterSectionTitle({ children, isRtl }) {
  return (
    <h6
      className={`mb-3 mt-0 text-xs font-semibold text-black/90 ${
        isRtl
          ? "text-start normal-case tracking-normal"
          : "uppercase tracking-[0.06em]"
      }`}
    >
      {children}
    </h6>
  );
}

export default function UaeFooterNotice({ content, isRtl = false }) {
  if (!content) return null;

  const {
    firstPara,
    secondPara,
    regulatedActivities = [],
    thirdPara,
    geographicalRestriction,
    riskWarning,
    entity,
  } = content;

  return (
    <div className="space-y-5 text-start">
      {firstPara ? <FooterParagraph>{firstPara}</FooterParagraph> : null}

      {secondPara ? <FooterParagraph>{secondPara}</FooterParagraph> : null}

      {regulatedActivities.length > 0 ? (
        <ul className="my-1 list-disc space-y-2 ps-5 text-xs leading-[1.75] text-black/70">
          {regulatedActivities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {thirdPara ? <FooterParagraph>{thirdPara}</FooterParagraph> : null}

      {geographicalRestriction ? (
        <section className="space-y-4">
          <FooterSectionTitle isRtl={isRtl}>
            {geographicalRestriction.title}
          </FooterSectionTitle>
          {geographicalRestriction.firstPara ? (
            <FooterParagraph>{geographicalRestriction.firstPara}</FooterParagraph>
          ) : null}
          {geographicalRestriction.secondPara ? (
            <FooterParagraph>{geographicalRestriction.secondPara}</FooterParagraph>
          ) : null}
        </section>
      ) : null}

      {riskWarning ? (
        <section className="space-y-4">
          <FooterSectionTitle isRtl={isRtl}>{riskWarning.title}</FooterSectionTitle>
          {riskWarning.firstPara ? (
            <FooterParagraph>{riskWarning.firstPara}</FooterParagraph>
          ) : null}
          {riskWarning.secondPara ? (
            <FooterParagraph>{riskWarning.secondPara}</FooterParagraph>
          ) : null}
          {riskWarning.thirdPara ? (
            <FooterParagraph>{riskWarning.thirdPara}</FooterParagraph>
          ) : null}
        </section>
      ) : null}

      {entity ? (
        <section className="mt-6 rounded-md border border-black/10 bg-[#f8f9fb] p-4">
          <p className="text-xs font-semibold text-black/90">{entity.name}</p>
          <dl className="mt-2 space-y-1.5 text-xs leading-[1.6] text-black/70">
            {entity.licenseLabel && entity.licenseNo ? (
              <div>
                <dt className="inline font-medium text-black/85">
                  {entity.licenseLabel}{" "}
                </dt>
                <dd className="inline">{entity.licenseNo}</dd>
              </div>
            ) : null}
            {entity.addressLabel && entity.address ? (
              <div>
                <dt className="inline font-medium text-black/85">
                  {entity.addressLabel}{" "}
                </dt>
                <dd className="inline">{entity.address}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}
    </div>
  );
}
