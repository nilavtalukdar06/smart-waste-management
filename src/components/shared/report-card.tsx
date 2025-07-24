"use client";
import { CheckCircle, MapPin, Recycle, TriangleAlert, X } from "lucide-react";
import { Button } from "../ui/button";
import ViewImage from "../dialog/view-image";
//@ts-ignore
import Highlight from "react-highlighter";
import { useSession } from "next-auth/react";

export interface IWaste {
  location: string;
  type: string;
  items: string;
  weight: string;
  createdAt: string;
  status: string;
  imageUrl: string;
  searchTerm: string;
  collector: string;
}

export default function ReportCard({
  location,
  type,
  items,
  weight,
  createdAt,
  status,
  searchTerm,
  imageUrl,
  collector,
}: IWaste) {
  const { data: session, status: userStatus } = useSession();
  return (
    <div className="w-full p-4 border rounded-lg flex flex-col gap-y-4 justify-center items-start h-full">
      <div className="flex justify-center items-center gap-x-2">
        <MapPin className="text-green-500" />
        <Highlight className="text text-neutral-600" search={searchTerm}>
          {location}
        </Highlight>
      </div>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Waste Type:</span>{" "}
        <Highlight search={searchTerm}>{type}</Highlight>
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Waste Items:</span>{" "}
        <Highlight search={searchTerm}>{items}</Highlight>
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Weight:</span>{" "}
        <Highlight search={searchTerm}>{weight}</Highlight>
      </p>
      <p className="text-sm text-neutral-600 font-light">
        <span className="font-normal text-neutral-700">Reported In:</span>{" "}
        <Highlight search={searchTerm}>
          {new Date(createdAt).toDateString()}
        </Highlight>
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
        {!collector ? (
          <Button variant="outline" size="sm" className="text-green-500">
            <Recycle />
            <p>Start Collection</p>
          </Button>
        ) : (
          session &&
          userStatus === "authenticated" &&
          collector === session.user.id && (
            <Button size="sm">Verify Collection</Button>
          )
        )}
        {!collector &&
          session &&
          userStatus === "authenticated" &&
          collector !== session.user.id && (
            <p className="text-sm text-green-500 font-light text-start">
              Already in collection by another user
            </p>
          )}
      </div>
    </div>
  );
}
