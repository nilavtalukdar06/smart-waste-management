"use client";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Leaf, Recycle, TriangleAlert } from "lucide-react";
import { UploadDropzone } from "../upload/uploadthing";
import Error from "../shared/error";
import Image from "next/image";

export default function ReportWaste() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Report Waste <Recycle />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Report Waste</DialogTitle>
            <DialogDescription>
              Upload a picture of the waste in your locality and let AI do the
              job for you
            </DialogDescription>
          </DialogHeader>
          <div className="grid">
            {error && <Error error={error} />}
            {!imageUrl ? (
              <UploadDropzone
                disabled={Boolean(imageUrl)}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].ufsUrl);
                  setError("");
                }}
                onUploadError={(error) => {
                  console.log(error);
                  setError("Failed to upload image, please try again later");
                  setImageUrl("");
                }}
              />
            ) : (
              <Image
                src={imageUrl}
                alt="reported-image"
                height={250}
                width={500}
                className="h-[300px] w-full object-cover rounded-lg"
              />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">
                Cancel <TriangleAlert />
              </Button>
            </DialogClose>
            <Button type="submit" variant="secondary">
              Report <Leaf />
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
