import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import db from "@/lib/prisma";
import { UserImage } from "@prisma/client";
import { UTApi } from "uploadthing/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) {
      throw new Error('Unauthorized');
    }

    const { image } = await req.json();
    
    if (!image) {
      throw new Error('Image is required');
    }

    const oldImage = user.image as unknown as UserImage;
    if (oldImage && oldImage.type === "UPLOADTHING" && oldImage.key !== null) {
      const utapi = new UTApi();
      await utapi.deleteFiles(oldImage.key)
    }
    
    await db.userImage.upsert({
      where: { userId: user.id },
      update: { 
        url: image.url,
        key: image.id,
        type: "BUBUANDDUDU",
      },
      create: { 
        url: image.url,
        key: image.id,
        type: "BUBUANDDUDU",
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })

    return Response.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}