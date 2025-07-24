"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle, Loader, Recycle } from "lucide-react";
import { useState } from "react";
import Success from "../shared/success";
import Error from "../shared/error";
import { UploadButton, UploadDropzone } from "../upload/uploadthing";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useRewards from "@/store/rewards";

export default function CollectWaste({
  reportId,
  reportedImageUrl,
}: {
  reportId: string;
  reportedImageUrl: string;
}) {
  const { setRewards } = useRewards();
  const [successMessage, setSuccessMessage] = useState<string>("");
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
        setSuccessMessage(
          "Congrats!, You earned 50 points for collecting waste"
        );
      } else {
        setErrorMessage("The image is not a valid, please take a clear image");
      }
    },
    onError: (error) => {
      console.log(error?.message);
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
        <div>
          {successMessage && <Success message={successMessage} />}
          {errorMessage && <Error error={errorMessage} />}
        </div>
        {uploadImageAndVerify.isPending ? (
          <div className="flex justify-center items-center gap-x-4">
            <Loader className="text-green-500 animate-spin" size={24} />
            <p className="text-lg font-medium text-neutral-600">
              Verifying Image...
            </p>
          </div>
        ) : uploadImageAndVerify.data?.isValid &&
          uploadImageAndVerify.isSuccess ? (
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="bg-green-50 border border-green-500 text-green-500 p-4 rounded-lg">
              <div className="flex justify-start items-center gap-x-2">
                <CheckCircle className="text-green-600" size={16} />
                <p className="font-medium text-green-600">How to dispose it?</p>
              </div>
              <p className="text-sm font-light mt-4">
                {uploadImageAndVerify?.data?.disposalMethod}
              </p>
            </div>
            <div className="bg-red-50 border border-red-500 text-red-500 p-4 rounded-lg">
              <div className="flex justify-start items-center gap-x-2">
                <CheckCircle className="text-red-600" size={16} />
                <p className="font-medium text-red-600">
                  How not to dispose it?
                </p>
              </div>
              <p className="text-sm font-light mt-2">
                {uploadImageAndVerify.data?.howNottoDispose}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <UploadDropzone
              endpoint="imageUploader"
              className="hidden sm:flex"
              onClientUploadComplete={(res) => {
                uploadImageAndVerify.mutate(res[0].ufsUrl);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              onUploadError={(error) => {
                (console.log(error),
                  setSuccessMessage(""),
                  setErrorMessage("Failed to upload image, please try again"));
              }}
            />
            <UploadButton
              endpoint="imageUploader"
              className="sm:hidden"
              onClientUploadComplete={(res) => {
                uploadImageAndVerify.mutate(res[0].ufsUrl);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              onUploadError={(error) => {
                (console.log(error),
                  setSuccessMessage(""),
                  setErrorMessage("Failed to upload image, please try again"));
              }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
