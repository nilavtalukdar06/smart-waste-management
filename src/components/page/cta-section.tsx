import Link from "next/link";
import { Button } from "../ui/button";
import { Recycle } from "lucide-react";
import Image from "next/image";

export default function CtaSection() {
  return (
    <div className="px-5 w-full mt-24 mb-0 flex flex-col md:flex-row justify-around items-center gap-12">
      <div className="flex flex-col justify-center items-start max-w-lg gap-6">
        <h2 className="text-4xl text-neutral-600 font-medium">
          Start your journey to a cleaner community
        </h2>
        <p className="font-light text-neutral-400">
          Tired of unmanaged waste around you? Join Eco Swachh today and take
          the first step towards smarter waste reporting, tracking, and rewards
          for a cleaner tomorrow.
        </p>
        <Link href="/reports">
          <Button variant="secondary" size="lg">
            Collect Waste <Recycle />
          </Button>
        </Link>
      </div>
      <div className="md:my-6">
        <Image
          src="https://ik.imagekit.io/txlfejzn5/Untitled%20design%20(6).png?updatedAt=1753536404636"
          height={400}
          width={300}
          alt="iphone mockup image"
        />
      </div>
    </div>
  );
}
