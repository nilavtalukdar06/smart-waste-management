"use client";
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
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Leaf,
  Loader,
  MapPinCheck,
  Recycle,
  TriangleAlert,
} from "lucide-react";
import { UploadButton, UploadDropzone } from "../upload/uploadthing";
import Error from "../shared/error";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import useGetCoordinates from "@/hooks/use-get-coordinates";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useRewards from "@/store/rewards";
import Success from "../shared/success";

interface IWaste {
  type: string;
  items: string;
  weight: string;
  confidenceScore: number;
}

const formSchema = z.object({
  location: z
    .string()
    .min(2, { message: "Location is too short" })
    .max(50, { message: "Location is too long" }),
});

export default function ReportWaste() {
  const coordMutation = useGetCoordinates();
  const [success, setSuccess] = useState<string>("");
  const [wasteReport, setWasteReport] = useState<null | IWaste>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });
  const { setRewards } = useRewards();

  useEffect(() => {
    if (coordMutation.data) {
      form.setValue(
        "location",
        `Latitude: ${coordMutation.data.lat}, Longitude: ${coordMutation.data.long}`
      );
    }
  }, [coordMutation.data, form]);

  const getCoordinates = () => {
    coordMutation.mutate();
  };

  const analyzeImage = useMutation({
    mutationFn: async (imageUrl: string) => {
      const response = await axios.post("/api/waste/report/verify", {
        imageUrl: imageUrl,
      });
      setWasteReport(response.data);
    },
    onError: () => {
      setError("Failed to analyze image, please try again!");
      setWasteReport(null);
    },
  });

  const handleSubmit = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await axios.post("/api/waste/report", {
        ...wasteReport,
        ...values,
        imageUrl,
      });
    },
    onSuccess: () => {
      setError("");
      setSuccess("Congrats, you got 10 points for reporting waste");
      setRewards(10);
      setWasteReport(null);
    },
    onError: () => {
      setError("Failed to submit report!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    handleSubmit.mutate(values);
    setError("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Report Waste <Recycle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Report Waste</DialogTitle>
              <DialogDescription>
                Upload a picture of the waste in your locality and let AI do the
                job for you
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 w-full">
              {error && <Error error={error} />}
              {success && <Success message={success} />}
              {analyzeImage.isPending ? (
                <div className="flex justify-start my-4">
                  <Loader className="animate-spin text-green-500" />
                </div>
              ) : !wasteReport ? (
                <div className="w-full">
                  <UploadDropzone
                    endpoint="imageUploader"
                    className="max-[400px]:hidden"
                    onClientUploadComplete={(res) => {
                      if (res.length > 0) {
                        setImageUrl(res[0].ufsUrl);
                        analyzeImage.mutate(res[0].ufsUrl);
                        setError("");
                        setSuccess("");
                      }
                    }}
                    onUploadError={(error) => {
                      console.log(error);
                      setError(
                        "Failed to upload image, please try again later"
                      );
                      setSuccess("");
                      setWasteReport(null);
                    }}
                  />
                  <UploadButton
                    endpoint="imageUploader"
                    className="min-[400px]:hidden"
                    onClientUploadComplete={(res) => {
                      if (res.length > 0) {
                        setImageUrl(res[0].ufsUrl);
                        analyzeImage.mutate(res[0].ufsUrl);
                        setError("");
                        setSuccess("");
                      }
                    }}
                    onUploadError={(error) => {
                      console.log(error);
                      setError(
                        "Failed to upload image, please try again later"
                      );
                      setSuccess("");
                      setWasteReport(null);
                    }}
                  />
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg flex flex-col gap-y-2 justify-center items-start font-light ${wasteReport?.confidenceScore < 50 ? "bg-yellow-50 text-yellow-600" : "text-green-600 bg-green-50"}`}
                >
                  <div className="flex justify-center items-center gap-x-2 mb-4">
                    {wasteReport?.confidenceScore < 50 ? (
                      <TriangleAlert />
                    ) : (
                      <CheckCircle />
                    )}
                    <p className="font-medium">Here are the results</p>
                  </div>
                  <p>
                    <span className="font-medium">Waste Type:</span>{" "}
                    {wasteReport.type}
                  </p>
                  <p>
                    <span className="font-medium">Waste Items:</span>{" "}
                    {wasteReport.items}
                  </p>
                  <p>
                    <span className="font-medium">Estimated Weight:</span>{" "}
                    {wasteReport.weight}
                  </p>
                  <p>
                    <span className="font-medium">Confidence Score:</span>{" "}
                    {wasteReport.confidenceScore}%
                  </p>
                  {wasteReport.confidenceScore < 50 && (
                    <p className="text-red-600">
                      Confidence score below 50% is not accepted, please take a
                      valid or more clear image
                    </p>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      (setWasteReport(null),
                        setError(""),
                        setSuccess(""),
                        setImageUrl(""));
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormLabel>Enter the waste location</FormLabel>
                    <FormControl>
                      <div className="flex justify-center items-center gap-x-4">
                        <Input placeholder="Enter the location" {...field} />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={getCoordinates}
                          disabled={coordMutation.isPending}
                        >
                          {coordMutation.isPending ? (
                            <Loader className="animate-spin" size={18} />
                          ) : (
                            <MapPinCheck size={18} />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Please specify the location accurately.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-x-4">
              <DialogClose asChild>
                <Button variant="destructive" disabled={handleSubmit.isPending}>
                  Cancel <TriangleAlert />
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                disabled={
                  !wasteReport ||
                  analyzeImage.isPending ||
                  wasteReport.confidenceScore < 50 ||
                  handleSubmit.isPending
                }
              >
                {handleSubmit.isPending ? (
                  <div className="flex jusitfy-center items-center gap-x-4">
                    <Loader className="animate-spin" />
                    <p>Submitting...</p>
                  </div>
                ) : (
                  <div className="flex jusitfy-center items-center gap-x-4">
                    <p>Report Waste</p>
                    <Leaf />
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
