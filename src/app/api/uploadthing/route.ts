import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/utils/upload/uploadthing";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
