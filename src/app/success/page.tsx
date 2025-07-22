import Card from "@/components/shared/card";
import { cardItems } from "@/lib/constants";

export default function SuccessPage() {
  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="my-12 w-full flex flex-col justify-center items-center gap-6">
        <h2 className="text-2xl sm:text-3xl text-neutral-600 font-medium text-center">
          Thank You! 🌱
        </h2>
        <p className="text-center text-neutral-500">
          Your donation to <span className="text-green-500">Eco Swacch</span>{" "}
          makes a real difference!
        </p>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 place-items-center w-full h-full gap-6">
          {cardItems.map((item, index) => (
            <Card
              Icon={item.Icon}
              title={item.title}
              description={item.description}
              key={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
