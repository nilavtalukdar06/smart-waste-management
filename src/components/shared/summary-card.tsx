import { Recycle } from "lucide-react";
import { Button } from "../ui/button";

export default function SummaryCard() {
  return (
    <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
      <div className="w-full p-4 border rounded-lg bg-sidebar">
        <div className="flex flex-col justify-center items-start gap-y-3">
          <Button className="pointer-events-none" variant="secondary" size="sm">
            <Recycle />
          </Button>
          <h3 className="text-xl font-medium text-neutral-800">
            Total Reports Submitted
          </h3>
        </div>
        <p className="text-3xl font-semibold text-neutral-700 mt-2">17</p>
      </div>
    </div>
  );
}
