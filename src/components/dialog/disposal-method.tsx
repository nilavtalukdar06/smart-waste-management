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

export default function DisposalMethod({ reportId }: { reportId: string }) {
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
            {/* <div className="flex justify-start items-center gap-x-4">
              <Loader className="animate-spin text-green-500" size={24} />
              <p className="text-lg font-medium text-neutral-600">
                Loading...
              </p>
            </div> */}
            {/* <Error error="Failed to fetch disposal method, please try again later" /> */}
            {/* <Success message="This is the proper AI generated guideline" /> */}
          </div>
          <div className="flex flex-col justify-center items-start gap-y-4 w-full">
            <div className="w-full flex flex-col justify-center items-start gap-y-2 p-4 rounded-lg bg-green-50 text-green-500">
              <div className="flex justify-center items-center gap-x-2">
                <Check className="text-green-600" size={16} />
                <p className="text-green-600">How to dispose it?</p>
              </div>
              <p className="text-sm font-light">
                Properly dispose of e-waste at certified recycling centers or
                designated collection points. Many electronics retailers offer
                take-back programs. This ensures valuable materials are
                recovered and hazardous substances are managed safely,
                preventing environmental harm.
              </p>
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-y-2 p-4 rounded-lg bg-red-50 text-red-500">
              <div className="flex justify-center items-center gap-x-2">
                <X className="text-red-600" size={16} />
                <p className="text-red-600">How not to dispose it?</p>
              </div>
              <p className="text-sm font-light">
                Do not throw e-waste in general trash or landfills, as it
                contains toxic chemicals like lead, mercury, and cadmium that
                can leach into soil and water. Burning e-waste releases harmful
                fumes, posing severe health and environmental risks.
              </p>
            </div>
          </div>
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
