"use client";

import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  fetchStrapiCollection,
  mapStrapiLocale,
  pickFirstMediaUrl,
  toAbsoluteStrapiMediaUrl,
} from "@/lib/strapi";

function getEntryDate(entry) {
  if (!entry) return "";
  const attrs = entry.attributes ?? entry;
  return attrs.date || attrs.publishedAt || attrs.createdAt || "";
}

function sortEntriesByDateDesc(entries = []) {
  return [...entries].sort((a, b) => {
    const aTime = new Date(getEntryDate(a)).getTime();
    const bTime = new Date(getEntryDate(b)).getTime();
    const aValue = Number.isFinite(aTime) ? aTime : 0;
    const bValue = Number.isFinite(bTime) ? bTime : 0;
    return bValue - aValue;
  });
}

function getExcelDateColumnKey(row) {
  const keys = Object.keys(row || {});
  return keys.find((key) => /date/i.test(key)) || keys[0] || null;
}

function parseExcelSortableDate(value) {
  if (value == null || value === "") return null;

  if (typeof value === "number") {
    const excelEpoch = Date.UTC(1899, 11, 30);
    const excelTime = excelEpoch + value * 86400000;
    return Number.isFinite(excelTime) ? excelTime : null;
  }

  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

function sortExcelRowsDesc(rows = []) {
  if (!rows.length) return rows;

  const dateKey = getExcelDateColumnKey(rows[0]);
  if (!dateKey) return rows;

  return [...rows].sort((a, b) => {
    const aTime = parseExcelSortableDate(a[dateKey]) ?? 0;
    const bTime = parseExcelSortableDate(b[dateKey]) ?? 0;
    return bTime - aTime;
  });
}

export default function EarningsDividendsCalendar({
  locale = "en",
  messages = {},
}) {
  const text = (key, fallback) => {
    const value = messages?.[key];
    return typeof value === "string" && value.length ? value : fallback;
  };

  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchExcelFromURL = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

      return workbook.SheetNames.map((sheetName) => ({
        name: sheetName,
        data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]),
      }));
    } catch (error) {
      console.error("Error fetching or parsing Excel:", error);
      return [];
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetchStrapiCollection("earnings", {
        locale: mapStrapiLocale(locale),
        populate: "*",
        sort: "createdAt:desc",
        cache: "no-store",
      });

      const sortedEntries = sortEntriesByDateDesc(res?.data || []);
      const url = pickFirstMediaUrl(
        { data: sortedEntries },
        ["data", "file", "attachment", "document", "spreadsheet"]
      );

      if (!url) {
        setData(sortedEntries);
        setExcelData([]);
        setLoading(false);
        return;
      }

      const fullURL = toAbsoluteStrapiMediaUrl(url);
      const parsedData = await fetchExcelFromURL(fullURL);
      const sheetRows = parsedData?.[0]?.data || [];
      setData(sortedEntries);
      setExcelData(sortExcelRowsDesc(sheetRows));
    } catch (err) {
      console.error("Error fetching earnings data:", err);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const exDividendDate = getEntryDate(data?.[0]);

  return (
    <section
      id="earning-table"
      className="scroll-mt-24 bg-[#F8F9FC] py-10 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#293B93]">
              {text(
                "earningsDividendsEyebrow",
                "Earnings & Dividends Calendar"
              )}
            </p>
            <h2 className="HeadingH2 mt-3 text-[#000032]">
              {text("bannerDatePrefix", "Ex-Dividend")}{" "}
              {exDividendDate ? `${exDividendDate} (GMT+3)` : "(GMT+3)"}
            </h2>
            <p className="Text mt-3 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mx-0 mx-auto">
              {text(
                "earningsDescription",
                "Track upcoming ex-dividend dates and calculate potential dividend payments for your trading positions."
              )}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-6 lg:flex-row">
            <div className="w-full lg:w-[67%]">
              {loading ? (
                <div className="flex min-h-[380px] items-center justify-center rounded-2xl border border-[#E1E7F6] bg-white">
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#293B93]/20 border-t-[#293B93]"
                      aria-label="Loading earnings data"
                    />
                    <p className="text-sm text-[#666666]">
                      {text("loadingText", "Loading earnings data...")}
                    </p>
                  </div>
                </div>
              ) : Array.isArray(excelData) && excelData.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-center">
                      <thead>
                        <tr className="bg-[#293B93] text-white">
                          {Object.keys(excelData[0]).map((header, index) => (
                            <th
                              key={header}
                              className={`px-5 py-4 text-left text-sm font-semibold ${
                                index === 0 ? "rounded-tl-2xl" : ""
                              } ${
                                index === Object.keys(excelData[0]).length - 1
                                  ? "rounded-tr-2xl"
                                  : ""
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="TextSmall text-[#333333]">
                        {excelData.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-b border-[#E1E7F6] odd:bg-white even:bg-[#F8F9FC] last:border-b-0 hover:bg-[#F0F2F8]"
                          >
                            {Object.values(row).map((value, colIndex) => (
                              <td
                                key={colIndex}
                                className={`px-5 py-3.5 ${
                                  colIndex === 0
                                    ? "text-left font-semibold text-[#293B93]"
                                    : "text-center"
                                }`}
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[380px] items-center justify-center rounded-2xl border border-[#E1E7F6] bg-white px-5 text-center">
                  <p className="Text text-[#69729F]">
                    {text("noData", "No earnings data available right now.")}
                  </p>
                </div>
              )}
            </div>

            <aside className="flex w-full flex-col rounded-2xl border border-[#E1E7F6] bg-white p-6 shadow-sm lg:w-[33%] md:p-7">
              <h3 className="HeadingH4 text-[#000032]">
                {text("howToCalculateHeading", "How to Calculate Dividend")}
              </h3>
              <p className="TextSmall mt-2 text-[#666666]">
                {text(
                  "howToCalculateIntro",
                  "Use these formulas to estimate dividend adjustments on open CFD positions."
                )}
              </p>

              <div className="mt-6 space-y-4 border-t border-[#E1E7F6] pt-5">
                <div>
                  <p className="TextSmall font-semibold text-[#293B93]">
                    {text(
                      "howToCalculateTitle1",
                      "Long position — dividend payment received"
                    )}
                  </p>
                  <p className="TextSmall mt-2 leading-6 text-[#666666]">
                    {text(
                      "howToCalculatePara1",
                      "Dividend Payment = Component Dividend (per index contract) × Contract Size × Volume × Currency Multiplier × Account Currency Multiplier"
                    )}
                  </p>
                </div>

                <div className="border-t border-[#E1E7F6] pt-4">
                  <p className="TextSmall font-semibold text-[#293B93]">
                    {text(
                      "howToCalculateTitle2",
                      "Short position — dividend charge deducted"
                    )}
                  </p>
                  <p className="TextSmall mt-2 leading-6 text-[#666666]">
                    {text(
                      "howToCalculatePara2",
                      "Dividend Charge = Component Dividend (per index contract) × Contract Size × Volume × Currency Multiplier × Account Currency Multiplier"
                    )}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
