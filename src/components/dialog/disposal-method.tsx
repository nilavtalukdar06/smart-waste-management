"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { AlertCircle, Check, Loader, Recycle, X } from "lucide-react";
import Error from "../shared/error";
import Success from "../shared/success";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function DisposalMethod({ reportId }: { reportId: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["dispose"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/waste/dispose/get-disposal-method?reportId=${reportId}`
      );
      return response.data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Disposal Method <Recycle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disposal Method</DialogTitle>
          <DialogDescription>
            Follow this AI powered guideline to dispose your collected waste
          </DialogDescription>
          <div className="mt-4">
            {isLoading && (
              <div className="flex justify-start items-center gap-x-4">
                <Loader className="animate-spin text-green-500" size={24} />
                <p className="text-lg font-medium text-neutral-600">
                  Loading...
                </p>
              </div>
            )}
            {isError && (
              <Error error="Failed to fetch disposal method, please try again later" />
            )}
            {data && (
              <Success message="This is the proper AI generated guideline" />
            )}
          </div>
          {data && (
            <div className="flex flex-col justify-center items-start gap-y-4 w-full">
              <div className="w-full flex flex-col justify-center items-start gap-y-2 p-4 rounded-lg bg-green-50 text-green-500">
                <div className="flex justify-center items-center gap-x-2">
                  <Check className="text-green-600" size={16} />
                  <p className="text-green-600">How to dispose it?</p>
                </div>
                <p className="text-sm font-light">
                  {data?.disposalMethod || ""}
                </p>
              </div>

              <div className="w-full flex flex-col justify-center items-start gap-y-2 p-4 rounded-lg bg-red-50 text-red-500">
                <div className="flex justify-center items-center gap-x-2">
                  <X className="text-red-600" size={16} />
                  <p className="text-red-600">How not to dispose it?</p>
                </div>
                <p className="text-sm font-light">{data?.warning || ""}</p>
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" variant="destructive">
              Close <AlertCircle />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
