"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Recycle } from "lucide-react";
import { useState } from "react";
import Success from "../shared/success";
import Error from "../shared/error";
import { UploadButton, UploadDropzone } from "../upload/uploadthing";

export default function CollectWaste({ reportId }: { reportId: string }) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  console.log(reportId);

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
        <div>
          <UploadDropzone
            endpoint="imageUploader"
            className="hidden sm:flex"
            onClientUploadComplete={(res) => {
              console.log(res[0].ufsUrl);
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
              console.log(res[0].ufsUrl);
              setErrorMessage("");
            }}
            onUploadError={(error) => {
              (console.log(error),
                setErrorMessage("Failed to upload image, please try again"));
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
