"use client";
import Error from "@/components/shared/error";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/upload/uploadthing";
import { useState } from "react";

export default function VerifyAccount() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  return (
    <section className="my-6 w-full">
      {error && (
        <Error error="Failed to upload image, please try again later" />
      )}
      <UploadDropzone
        disabled={Boolean(imageUrl)}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].ufsUrl);
        }}
        onUploadError={(error) => {
          setError(error?.message);
        }}
      />
      <Button variant="secondary" className="w-full my-4" disabled={!imageUrl}>
        Verify Account
      </Button>
    </section>
  );
}
