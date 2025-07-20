"use client";
import Error from "@/components/shared/error";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/upload/uploadthing";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

export default function VerifyAccount() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/verify-account", {
        imageUrl,
      });
      console.log(response.data);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error?.message);
        setError("Failed to verify your account");
      }
      console.log(error);
      setError("Failed to verify your account");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <section className="my-6 w-full">
      {error && <Error error={error} />}
      <UploadDropzone
        disabled={Boolean(imageUrl)}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].ufsUrl);
        }}
        onUploadError={(error) => {
          console.log(error);
          setError("Failed to upload image, please try again later");
          setImageUrl("");
        }}
      />
      <Button
        variant="secondary"
        className="w-full my-4"
        disabled={!imageUrl || mutation.isPending}
        onClick={handleSubmit}
      >
        {mutation.isPending ? (
          <span className="flex justify-center items-center gap-x-4">
            <Loader className="animate-spin" />
            Wait...
          </span>
        ) : (
          "Reqeust Verification"
        )}
      </Button>
    </section>
  );
}
