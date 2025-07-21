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
  Leaf,
  Loader,
  MapPinCheck,
  Recycle,
  TriangleAlert,
} from "lucide-react";
import { UploadButton, UploadDropzone } from "../upload/uploadthing";
import Error from "../shared/error";
import Image from "next/image";
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

const formSchema = z.object({
  location: z
    .string()
    .min(2, { message: "Location is too short" })
    .max(50, { message: "Location is too long" }),
});

export default function ReportWaste() {
  const coordMutation = useGetCoordinates();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  useEffect(() => {
    if (coordMutation.data) {
      form.setValue(
        "location",
        `Latitude: ${coordMutation.data.lat}, Longitude: ${coordMutation.data.long}`
      );
    }
  }, [coordMutation.data]);

  const getCoordinates = () => {
    coordMutation.mutate();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              {!imageUrl ? (
                <div className="w-full">
                  <UploadDropzone
                    disabled={Boolean(imageUrl)}
                    endpoint="imageUploader"
                    className="max-[400px]:hidden"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].ufsUrl);
                      setError("");
                    }}
                    onUploadError={(error) => {
                      console.log(error);
                      setError(
                        "Failed to upload image, please try again later"
                      );
                      setImageUrl("");
                    }}
                  />
                  <UploadButton
                    disabled={Boolean(imageUrl)}
                    endpoint="imageUploader"
                    className="min-[400px]:hidden"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].ufsUrl);
                      setError("");
                    }}
                    onUploadError={(error) => {
                      console.log(error);
                      setError(
                        "Failed to upload image, please try again later"
                      );
                      setImageUrl("");
                    }}
                  />
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt="reported-image"
                  height={250}
                  width={500}
                  className="h-[300px] w-full object-cover rounded-lg"
                />
              )}
              <div className="relative h-fit">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the waste location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the location" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please specify the location accurately.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  className="absolute z-10 right-2 bottom-[38px] cursor-pointer bg-white"
                  onClick={getCoordinates}
                  disabled={coordMutation.isPending}
                >
                  {coordMutation.isPending ? (
                    <Loader className="text-green-500 animate-spin" size={18} />
                  ) : (
                    <MapPinCheck size={18} className="text-green-500" />
                  )}
                </button>
              </div>
            </div>
            <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-x-4">
              <DialogClose asChild>
                <Button variant="destructive" className="">
                  Cancel <TriangleAlert />
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                disabled={Boolean(!imageUrl)}
              >
                Report <Leaf />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
