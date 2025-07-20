import { TriangleAlert } from "lucide-react";

export default function Error({ error }: { error: string }) {
  return (
    <div
      className="p-4 mb-4 text-sm w-full text-red-800 rounded-lg bg-red-50 flex justify-start gap-x-4 items-center"
      role="alert"
    >
      <TriangleAlert className="text-red-500" />
      <p>{error}</p>
    </div>
  );
}
