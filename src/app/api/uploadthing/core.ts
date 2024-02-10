import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();
const utapi = new UTApi();
  
export const ourFileRouter = {
  uploadedAvatars: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      const session = await auth();
      if (!session || !session.user) {
        return { error: "You must be logged in to upload files" };
      }

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(metadata);

      return {
        metadata,
        file,
      };
    }),
  avatarUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();

      if (!session || !session.user) {
        return { error: "You must be logged in to upload files" };
      }
      
      return {
        userId: session.user.id,
        oldImage: (session.user as any).image,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (!metadata.userId) {
        return { error: "You must be logged in to upload files" };
      }

      if (metadata.oldImage && metadata.oldImage.type === $Enums.UserImageUploadType["UPLOADTHING"]) {
        await utapi.deleteFiles(metadata.oldImage.key);
      }
      
      await db.userImage.upsert({
        where: {
          userId: metadata.userId,
        },
        update: {
          key: file.key,
          type: "UPLOADTHING",
          url: file.url,
        },
        create: {
          key: file.key,
          type: "UPLOADTHING",
          url: file.url,
          userId: metadata.userId,
        }
      })

      return {
        metadata,
        file,
      };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;