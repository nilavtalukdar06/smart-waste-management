import { MapPin, Recycle, X } from "lucide-react";
import { Button } from "../ui/button";
import ViewImage from "../dialog/view-image";

export default function ReportCard() {
  return (
    <div className="w-full p-4 border rounded-lg flex flex-col gap-y-4 justify-center items-start">
      <div className="flex justify-center items-center gap-x-2">
        <MapPin className="text-green-500" />
        <p className="text text-neutral-600">Guwahati, Assam, India</p>
      </div>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Waste Type:</span>{" "}
        Electronic Waste
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Waste Items:</span>{" "}
        Contains hard disc, Laptop, Tv, Computer Etc.
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Weight:</span> 2500 Kg
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Reported In:</span>{" "}
        22/7/2013
      </p>
      <div className="py-1.5 px-2.5 border rounded-full animate-pulse flex justify-center items-center bg-red-50 border-red-500 text-red-500 text-xs gap-x-2">
        <X size={14} />
        <p>Not Collected</p>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <ViewImage />
        <Button variant="outline" size="sm" className="text-green-500">
          <Recycle />
          <p>Start Collection</p>
        </Button>
      </div>
    </div>
  );
}
