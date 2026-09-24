"use client";

import React, { useRef, useState } from "react";
import TrustPromiseSection from "../components/common/TrustPromiseSection";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  const latestQuoteRequestId = useRef(0);
  const paymentKeyRef = useRef(null);

  async function handleAmountChange(value) {
    setAmount(value);

    const requestId = ++latestQuoteRequestId.current;

    try {
      const response = await fetchQuote(value);

      if (requestId === latestQuoteRequestId.current) {
        setQuote(response);
        paymentKeyRef.current = null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePay() {
    if (isPaying) return;
    if (!quote) return;

    setIsPaying(true);

    try {
      if (!paymentKeyRef.current) {
        paymentKeyRef.current = crypto.randomUUID();
      }

      await submitPayment({
        quoteId: quote.id,
        idempotencyKey: paymentKeyRef.current,
      });

      console.log("Payment success");
    } catch (error) {
      console.error(error);
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div>
      <div className="container py-10">
        <input value={amount} onChange={(e) => handleAmountChange(e.target.value)} />

        {quote && <div>Total: {quote.total}</div>}

        <button disabled={isPaying || !quote} onClick={handlePay}>
          {isPaying ? "Processing..." : "Pay"}
        </button>
      </div>

      <TrustPromiseSection />
    </div>
  );
}
