import { CheckCircle, MapPin, Recycle, TriangleAlert, X } from "lucide-react";
import { Button } from "../ui/button";
import ViewImage from "../dialog/view-image";

export interface IWaste {
  location: string;
  type: string;
  items: string;
  weight: string;
  createdAt: string;
  status: string;
  imageUrl: string;
}

export default function ReportCard({
  location,
  type,
  items,
  weight,
  createdAt,
  status,
  imageUrl,
}: IWaste) {
  return (
    <div className="w-full p-4 border rounded-lg flex flex-col gap-y-4 justify-center items-start h-full">
      <div className="flex justify-center items-center gap-x-2">
        <MapPin className="text-green-500" />
        <p className="text text-neutral-600">{location}</p>
      </div>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Waste Type:</span> {type}
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Waste Items:</span>{" "}
        {items}
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Weight:</span> {weight}
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Reported In:</span>{" "}
        {new Date(createdAt).toDateString()}
      </p>
      <div
        className={`py-1.5 px-2.5 border rounded-full animate-pulse flex justify-center items-center text-xs gap-x-2 ${status === "not-collected" && "bg-red-50 border-red-500 text-red-500"} ${status === "pending" && "bg-yellow-50 border-yellow-500 text-yellow-500"} ${
          status === "collected" &&
          "bg-green-50 text-green-500 border-green-500"
        }`}
      >
        {status === "not-collected" && <X size={14} />}
        {status === "pending" && <TriangleAlert size={14} />}
        {status === "collected" && <CheckCircle size={14} />}
        <p>{status}</p>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <ViewImage imageUrl={imageUrl} />
        <Button variant="outline" size="sm" className="text-green-500">
          <Recycle />
          <p>Start Collection</p>
        </Button>
      </div>
    </div>
  );
}
