"use client";
import Error from "@/components/shared/error";
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
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].ufsUrl);
        }}
        onUploadError={(error) => {
          setError(error?.message);
        }}
      />
      {imageUrl && (
        <img
          src={imageUrl}
          height={200}
          width={300}
          className="object-cover object-center"
        />
      )}
    </section>
  );
}
