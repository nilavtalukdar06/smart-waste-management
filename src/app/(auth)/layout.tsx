import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="max-w-sm mx-auto my-12 p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-x-3">
          <Button className="pointer-events-none" variant="secondary">
            <Leaf />
          </Button>
          <p className="text-xl font-medium text-gray-600">Eco Swachh</p>
        </div>
        <p className="text text-neutral-400 font-light">
          One more step towards the clean India
        </p>
      </div>
      {children}
    </section>
  );
}
