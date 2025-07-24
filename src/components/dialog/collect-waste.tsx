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
import { UploadDropzone } from "../upload/uploadthing";

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
          {errorMessage && <Error error={successMessage} />}
        </div>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => console.log(res[0].ufsUrl)}
          onUploadError={(error) => {
            (console.log(error),
              setErrorMessage("Failed to upload image, please try again"));
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
