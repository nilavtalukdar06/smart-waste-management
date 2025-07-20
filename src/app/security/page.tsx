"use client";
import Error from "@/components/shared/error";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/upload/uploadthing";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Home, Loader } from "lucide-react";
import Success from "@/components/shared/success";
import Link from "next/link";

export default function VerifyAccount() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [verification, setVerification] = useState<string>("");

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
        return;
      }
      setVerification(
        "Congrats! you have verified your identity, you will soon receive an email regarding it"
      );
      setError("");
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
      {verification ? (
        <div className="flex flex-col justify-center items-center">
          <Success message={verification} />
          <Link href="/" className="w-full">
            <Button className="w-full" variant="secondary">
              Go to Home <Home />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="w-full">
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
              "Request Verification"
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
