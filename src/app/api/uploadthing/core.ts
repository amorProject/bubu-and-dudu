import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
  
export const ourFileRouter = {
  uploadedAvatars: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .onUploadComplete(() => { return }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;