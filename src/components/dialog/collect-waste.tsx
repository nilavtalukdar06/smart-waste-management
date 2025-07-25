"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleAlert, Loader, Recycle } from "lucide-react";
import { useState } from "react";
import Error from "../shared/error";
import { UploadButton, UploadDropzone } from "../upload/uploadthing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useRewards from "@/store/rewards";
import toast from "react-hot-toast";

export default function CollectWaste({
  reportId,
  reportedImageUrl,
}: {
  reportId: string;
  reportedImageUrl: string;
}) {
  const { setRewards } = useRewards();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const uploadImageAndVerify = useMutation({
    mutationFn: async (collectedImageUrl: string) => {
      const response = await axios.post("/api/waste/collect/verify", {
        reportId: reportId,
        collectedImageUrl: collectedImageUrl,
        reportedImageUrl: reportedImageUrl,
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.isValid) {
        setRewards(50);
        toast.success("Congrats! You got 50 points for collecting waste");
      } else {
        setErrorMessage("The image is not a valid, please take a clear image");
      }
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
    onError: (error) => {
      console.log(error);
      setErrorMessage("Failed to verify");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Verify Waste <Recycle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload the image of the collected waste</DialogTitle>
        </DialogHeader>
        <div>{errorMessage && <Error error={errorMessage} />}</div>
        {uploadImageAndVerify.isPending ? (
          <div className="flex justify-center items-center gap-x-4">
            <Loader className="text-green-500 animate-spin" size={24} />
            <p className="text-lg font-medium text-neutral-600">
              Verifying Image...
            </p>
          </div>
        ) : (
          <div>
            <UploadDropzone
              endpoint="imageUploader"
              className="hidden sm:flex"
              onClientUploadComplete={(res) => {
                uploadImageAndVerify.mutate(res[0].ufsUrl);
                setErrorMessage("");
              }}
              onUploadError={(error) => {
                (console.log(error),
                  setErrorMessage("Failed to upload image, please try again"));
              }}
            />
            <UploadButton
              endpoint="imageUploader"
              className="sm:hidden"
              onClientUploadComplete={(res) => {
                uploadImageAndVerify.mutate(res[0].ufsUrl);
                setErrorMessage("");
              }}
              onUploadError={(error) => {
                (console.log(error),
                  setErrorMessage("Failed to upload image, please try again"));
              }}
            />
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">
              Cancel <CircleAlert />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
