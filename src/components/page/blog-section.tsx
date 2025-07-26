import { Button } from "../ui/button";
import { blogItems } from "@/lib/constants";

export default function BlogSection() {
  return (
    <div className="px-5 mt-24 mb-12">
      <h3 className="text-3xl sm:text-4xl font-medium text-neutral-600">
        Success Stories
      </h3>
      <p className="my-4 sm:text-lg font-light sm:font-normal text-neutral-400">
        Communities and organizations are transforming their waste management
        practices with Eco Swachh. From cleaner neighborhoods and higher
        recycling rates to faster response times and increased citizen
        participation — explore how our platform is driving real environmental
        impact.
      </p>
      <div className="my-6 w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center border border-neutral-200 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 rounded-xl">
          {blogItems.map((item, index) => (
            <div
              className="group relative z-10 p-4 md:p-6 h-full flex flex-col focus:outline-hidden first:rounded-t-xl last:rounded-b-xl lg:first:rounded-l-xl lg:first:rounded-tr-none lg:last:rounded-r-xl lg:last:rounded-bl-none before:absolute before:inset-0 before:bg-linear-to-b hover:before:from-transparent hover:before:via-transparent hover:before:to-green-500/10 before:via-80% focus:before:from-transparent focus:before:via-transparent focus:before:to-green-500/10 before:-z-1 last:before:rounded-b-xl lg:first:before:rounded-s-xl lg:last:before:rounded-e-xl lg:last:before:rounded-bl before:opacity-0 hover:before:opacity-100 focus:before:opacity-100"
              key={index + 1}
            >
              <div className="mb-5">
                <Button size="sm" variant="secondary">
                  <item.Icon />
                </Button>
                <div className="mt-5">
                  <p className="font-semibold text-5xl text-neutral-600">
                    {item.value}
                  </p>
                  <h3 className="mt-5 font-medium text-lg text-neutral-500">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-neutral-400 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
              <p className="mt-auto">
                <span className="font-medium text-sm text-green-500 pb-1 group-hover:border-green-500 transition focus:outline-hidden">
                  Case study
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
