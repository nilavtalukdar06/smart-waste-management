import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";

export default function ViewImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Camera /> See Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>The Image of the reported waste</DialogTitle>
        </DialogHeader>
        <Image
          className="rounded-lg"
          src={imageUrl}
          alt="reported waste image"
          height={250}
          width={550}
        />
      </DialogContent>
    </Dialog>
  );
}
