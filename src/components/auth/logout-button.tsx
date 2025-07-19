"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onError: () => {
      toast.error("Failed to logout");
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const logout = () => {
    mutation.mutate();
  };

  return (
    <Button
      variant="destructive"
      disabled={mutation.isPending}
      onClick={logout}
    >
      {mutation.isPending ? <Loader className="animate-spin" /> : "Logout"}
    </Button>
  );
}
