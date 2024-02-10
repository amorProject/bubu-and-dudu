import { auth } from "@/lib/auth";
import db from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { UTApi } from 'uploadthing/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.formData();
  const title = data.get("title") as string;
  const categories = JSON.parse(data.get("categories") as string);
  const files = data.getAll("images") as File[];

  if (!title || !files || !categories) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!Array.isArray(categories)) {
    return Response.json({ error: "Categories must be an array" }, { status: 400 });
  }

  if (!Array.isArray(files)) {
    return Response.json({ error: "Images must be an array" }, { status: 400 });
  }

  if (files.length > 4) {
    return Response.json({ error: "Too many images" }, { status: 400 });
  }

  const utapi = new UTApi();

  try {
    const uploadedImages = await utapi.uploadFiles(files, {
      metadata: {
        title,
        uploader: user.id
      }
    });

    if (uploadedImages.some((img) => img.error)) {
      return Response.json({ error: "Failed to upload images" }, { status: 500 });
    }

    const images = uploadedImages.map(img => img.data);
    if (images.some(img => !img)) {
      return Response.json({ error: "Failed to upload images" }, { status: 500 });
    }

    const newImages = Array.from(images) as {
      key: string
      url: string
      name: string
      size: number
    }[];

    const newPost = await db.post.create({
      data: {
        title,
        images: {
          createMany: {
            data: newImages.map((img, idx) => ({
              url: img.url,
              key: img.key,
              title: img.name,
              sort: idx
            }))
          }         
        },
        accepted: user.role === "ADMIN",
        categories: categories || [],
        author: {
          connect: {
            id: user.id
          }
        }
      },
    })

    return Response.json(newPost, { status: 201 });
  } catch (error: any) {
    console.log(`
      Start of error log
    `)
    console.error(error.data);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const utapi = new UTApi();

  try {
    const post = await db.post.delete({
      where: {
        id: data.id,
        authorId: user.id
      },
      select: {
        images: true
      }
    })

    const images = post.images.filter((i) => i.url.includes("utfs.io")).filter((i) => i.key !== undefined).map((i) => i.key);

    const imagesDeleted = await utapi.deleteFiles(images);

    return Response.json({
      post,
      images: imagesDeleted
    }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}