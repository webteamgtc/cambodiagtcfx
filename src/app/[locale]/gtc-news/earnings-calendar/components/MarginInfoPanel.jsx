import Button from "@/app/[locale]/components/common/Button";

export default function MarginInfoPanel({ messages = {} }) {
  const t = (path, fallback = "") => {
    const value = path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] != null ? acc[key] : undefined),
        messages
      );
    return typeof value === "string" && value.length ? value : fallback;
  };

  const cards = [
    {
      title: t("howStockEarning.item1.heading", "1) What is an Earnings Announcement?"),
      content: [
        t(
          "howStockEarning.item1.para1",
          "Public companies release quarterly earnings reports, and these events often increase volatility in related stock and index CFDs."
        ),
      ],
    },
    {
      title: t("howStockEarning.item2.heading", "2) What is Ex-Dividend Date?"),
      content: [
        t(
          "howStockEarning.item2.para1",
          "The ex-dividend date is when dividend entitlement is determined. Open positions may receive or pay adjustments depending on direction."
        ),
      ],
    },
    {
      title: t("howStockEarning.item3.heading", "3) Why This Matters for CFD Traders"),
      content: [
        t(
          "howStockEarning.item3.para1",
          "Dividend and earnings events can change pricing and margin dynamics. Before holding positions overnight, consider:"
        ),
        `• ${t("howStockEarning.item3.list1", "Scheduled earnings dates")}`,
        `• ${t("howStockEarning.item3.list2", "Expected market volatility")}`,
        `• ${t("howStockEarning.item3.list3", "Potential dividend adjustments")}`,
        `• ${t("howStockEarning.item3.list4", "Your available free margin")}`,
        t(
          "howStockEarning.item3.para2",
          "This helps reduce surprises and supports better risk planning."
        ),
      ],
    },
    {
      title: t("howStockEarning.item4.heading", "4) Dividend Adjustment Notes"),
      content: [
        t(
          "howStockEarning.item4.para1",
          "Adjustments vary by instrument and market conditions. Keep these points in mind:"
        ),
        `• ${t("howStockEarning.item4.list1", "Long positions typically receive adjustment")}`,
        `• ${t("howStockEarning.item4.list2", "Short positions are typically charged")}`,
        `• ${t("howStockEarning.item4.list3", "Values can differ from cash market dividends")}`,
        `• ${t("howStockEarning.item4.list4", "Contract specifications always apply")}`,
        `• ${t("howStockEarning.item4.list5", "Platform timing may vary by instrument")}`,
      ],
    },
    {
      title: t("howStockEarning.item5.heading", "5) Best Practices Before Events"),
      content: [
        t(
          "howStockEarning.item5.para1",
          "Prepare your positions before major earnings/dividend dates:"
        ),
        `• ${t("howStockEarning.item5.list.one", "Review risk exposure and stop levels")}`,
        `• ${t("howStockEarning.item5.list.two", "Check margin requirements and account buffers")}`,
      ],
    },
    {
      title: t("howStockEarning.item6.heading", "6) Important Reminder"),
      content: [
        t(
          "howStockEarning.item6.para1",
          "Corporate action handling may differ across brokers and products. Always verify details in your trading platform."
        ),
      ],
    },
  ];

  return (
    <section id="earning-margin-guide" className="bg-[#F8F9FC] py-10 md:py-16 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="HeadingH1 mx-auto max-w-2xl leading-[1.3] font-semibold text-[#000]">
            {t(
              "howStockEarning.title",
              "How Stock & Index Earnings & Dividends Affect Your Margin"
            )}
          </h2>
          <p className="Text mx-auto mt-3 max-w-4xl leading-[1.7] text-[#666666]">
            {t(
              "howStockEarning.desc",
              "We've prepared a quick guide that explains the calendar, when corporate events hit, and how margin can be affected."
            )}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-[#E1E7F6] bg-white p-5 shadow-sm md:p-8"
            >
              <h3 className="HeadingH5 text-[#293B93]">{card.title}</h3>
              <div className="mt-3 space-y-2">
                {card.content.map((line, lineIndex) => (
                  <p key={lineIndex} className="TextSmall leading-6 text-[#666666]">
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <article className="mx-auto mt-4 max-w-6xl rounded-2xl border border-[#E1E7F6] bg-white p-5 shadow-sm md:p-6">
          <h3 className="HeadingH5 text-[#293B93]">
            {t("howStockEarning.item7.heading", "7) Need More Support?")}
          </h3>
          <p className="TextSmall mt-3 leading-6 text-[#666666]">
            {t(
              "howStockEarning.item7.para1",
              "If you are unsure how an event affects your open position, contact support before market close."
            )}
          </p>
          <p className="TextSmall mt-2 leading-6 text-[#666666]">
            {t(
              "howStockEarning.item7.para2",
              "Our team can help you understand margin impact, adjustment timing, and contract specifications."
            )}
          </p>
        </article>

        {/* <div className="mt-8 flex justify-center">
          <Button
            href="https://web.mygtc.app/login/register?code=2544249&scope=1"
            external
            variant="primary"
            size="md"
          >
            {t("btnText", "Refer Your Traders")}
          </Button>
        </div> */}
      </div>
    </section>
  );
}
