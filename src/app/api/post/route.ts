import db from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/auth";
import { UTApi } from 'uploadthing/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const newPost = await db.post.create({
      data: {
        title: data.title,
        images: data.images,
        categories: {
          connect: data.categories
        },
        author: {
          connect: {
            id: user.id
          }
        }
      },
    })

    return Response.json(newPost, { status: 201 });
  } catch (error: any) {
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