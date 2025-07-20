import { CircleCheckBig } from "lucide-react";

export default function Success({ message }: { message: string }) {
  return (
    <div
      className="p-4 mb-4 w-full flex justify-start items-center gap-x-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium shrink-0">
        <CircleCheckBig className="text-green-800" />
      </span>
      <span>{message}</span>
    </div>
  );
}
