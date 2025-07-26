import { features } from "@/lib/constants";
import { Button } from "../ui/button";

export default function FeatureSection() {
  return (
    <div className="px-5 my-24">
      <h3 className="text-3xl sm:text-4xl font-medium text-neutral-600">
        Top Features
      </h3>
      <p className="my-4 sm:text-lg font-light sm:font-normal text-neutral-400">
        Eco Swachh is an AI-powered waste management platform designed for
        smarter, cleaner communities. Report waste instantly with geolocation,
        track collection status in real-time, earn coin rewards for verified
        reports, and unlock powerful insights through interactive dashboards.
        Everything you need to drive meaningful environmental action — all in
        one place.
      </p>
      <div className="my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
          {features.map((item, index) => (
            <div key={index + 1}>
              <Button
                size="sm"
                variant="secondary"
                className="pointer-events-none"
              >
                <item.Icon />
              </Button>
              <div className="mt-5">
                <h3 className="text-lg font-normal text-neutral-600">
                  {item.title}
                </h3>
                <p className="mt-1 text-neutral-400 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
