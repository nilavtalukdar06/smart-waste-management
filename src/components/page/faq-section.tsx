import { faqs } from "@/lib/constants";

export default function FaqSection() {
  return (
    <div className="px-5 mt-24 mb-12">
      <h3 className="text-3xl sm:text-4xl font-medium text-neutral-600">
        Frequently Asked Questions
      </h3>

      <div className="w-full my-12">
        <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
          {faqs.map((item, index) => (
            <div key={index + 1}>
              <h3 className="text-lg font-normal text-neutral-600">
                {item.question}
              </h3>
              <p className="mt-2 text-neutral-400 font-light">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
