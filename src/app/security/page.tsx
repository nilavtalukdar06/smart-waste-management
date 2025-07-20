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
      if (!response.data.isValid) {
        setError(
          "The AADHAAR number that you provided during registration is not matching with the number in the actual image of the AADHAAR card that you provided, if you think that is a mistake please take a clear photo of the aadhaar that clearly shows the number in the card and try again, remember this step is important because if you don't verify your account within 7 days, all of your data will get deleted"
        );
        setImageUrl("");
      }
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
