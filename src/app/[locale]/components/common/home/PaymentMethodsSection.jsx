import Image from "next/image";
import PrimaryButton from "../PrimaryButton";

export default function PaymentMethodsSection() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[28px] bg-[#F1F2F4] border border-gray-300 px-6 py-10 md:px-10 md:py-12 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">

  {/* Image FIRST on mobile */}
  <div className="order-1 lg:order-2 w-full relative h-[300px]">
    <Image
      src="/home/clientpayment.webp"
      alt="Payment Methods"
      fill
      className="object-contain"
    />
  </div>

  {/* Text SECOND on mobile */}
  <div className="order-2 lg:order-1 max-w-md flex flex-col gap-6">
    <h2 className="HeadingH3">
      Method of Payment, Card Types Accepted & Currency
    </h2>

    <p className="Text">
      We accept payments online using Visa and MasterCard credit/debit
      card in AED (and/or any other available currency listed in the
      payments section).
    </p> 
     <div className="inline-flex gap-2 flex-col md:gap-4 md:flex-row md:justify-start">
                     <PrimaryButton href="/register">
                    Open Live Account
                  </PrimaryButton>
                    <PrimaryButton variant="dark">
      Free Demo Account
    </PrimaryButton>
                  </div>
  </div>

</div>

        </div>
      </div>
    </section>
  );
}