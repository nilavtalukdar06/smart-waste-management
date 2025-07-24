"use client";
import {
  CheckCircle,
  Loader,
  MapPin,
  Recycle,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import ViewImage from "../dialog/view-image";
//@ts-ignore
import Highlight from "react-highlighter";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import CollectWaste from "../dialog/collect-waste";

export interface IWaste {
  reportId: string;
  location: string;
  type: string;
  items: string;
  weight: string;
  reporter: string;
  createdAt: string | Date;
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
  reporter,
  reportId,
}: IWaste) {
  const queryClient = useQueryClient();
  const { data: session, status: userStatus } = useSession();

  const updateStatus = useMutation({
    mutationFn: async () => {
      const response = await axios.patch("/api/waste/collect", {
        reportId: reportId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          toast.error("You cannot collect your own waste");
        } else {
          toast.error("Failed to collect");
        }
      }
      console.log(error.message);
      toast.error("Failed to collect");
    },
  });

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
        {!collector &&
          userStatus === "authenticated" &&
          reporter !== session.user.id && (
            <Button
              size="sm"
              variant="outline"
              className="text-green-500"
              onClick={() => updateStatus.mutate()}
              disabled={updateStatus.isPending}
            >
              {updateStatus.isPending ? (
                <Loader className="animate-spin" size={14} />
              ) : (
                <span className="flex justify-center items-center gap-x-3">
                  Start Collection <Recycle />
                </span>
              )}
            </Button>
          )}
        {collector &&
          userStatus === "authenticated" &&
          collector === session.user.id &&
          status === "pending" && (
            <CollectWaste reportId={reportId} reportedImageUrl={imageUrl} />
          )}
      </div>
      {collector &&
        userStatus === "authenticated" &&
        collector !== session.user.id &&
        status === "pending" && (
          <p className="text-sm text-start text-green-500 font-light">
            Already in collection by another user
          </p>
        )}
      {collector &&
        userStatus === "authenticated" &&
        collector !== session.user.id &&
        status === "collected" && (
          <p className="text-sm text-start text-green-500 font-light">
            Waste is collected by other user
          </p>
        )}
    </div>
  );
}
