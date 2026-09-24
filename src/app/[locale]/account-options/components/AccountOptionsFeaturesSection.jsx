import { ACCOUNT_OPTION_ITEMS } from "../accountOptionsData";
import AccountOptionsFeatureRow from "./AccountOptionsFeatureRow";

export default function AccountOptionsFeaturesSection() {
  return (
    <section className="bg-white pb-4 md:pb-8">
      <div className="">
        <div className="">
          {ACCOUNT_OPTION_ITEMS.map((item) => (
            <AccountOptionsFeatureRow
              key={item.key}
              itemKey={item.key}
              number={item.number}
              image={item.image}
              imageWidth={item.imageWidth}
              imageHeight={item.imageHeight}
              href={item.href}
              external={item.external}
              reverse={item.reverse}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
