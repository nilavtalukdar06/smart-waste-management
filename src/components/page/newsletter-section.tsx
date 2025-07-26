"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
});

export default function NewsLetterSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendEmail = useMutation({
    mutationKey: ["send-email"],
    mutationFn: async (email: string) => {
      const response = await axios.post("/api/emails/subscribe", {
        email: email,
      });
      return response.data;
    },
    onError: (error) => {
      console.log(error?.message);
      toast.error("Failed to send email");
    },
    onSuccess: () => {
      toast.success("You are now a subscriber of Eco Swachh");
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendEmail.mutate(values.email);
  };

  return (
    <div className="w-full py-10 px-5 lg:py-16 mx-auto">
      <div className="max-w-xl text-start sm:text-center mx-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-medium text-neutral-600 md:text-3xl md:leading-tight">
            Sign up to our newsletter
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="mt-5 lg:mt-8 flex flex-col w-full items-start gap-2 sm:flex-row sm:gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="justify-self-start" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-full sm:w-fit"
                disabled={sendEmail.isPending}
              >
                {sendEmail.isPending ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <span>Subscribe Now</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
