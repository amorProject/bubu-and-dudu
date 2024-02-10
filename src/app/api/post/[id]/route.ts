import { auth } from '@/lib/auth';
import db from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const post = await db.post.findUnique({
      where: {
        id: id,
        accepted: {
          equals: true
        }
      },
      select: {
        id: true,
        title: true,
        author: {
          select: {
            id: true,
            name: true,
            image: {
              select: {
                url: true
              }
            },
          }
        },
        categories: true,
        images: {
          select: {
            url: true
          }
        }
      }
    })

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(post);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.title || !data.images || !data.categories) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!Array.isArray(data.categories)) {
    return Response.json({ error: "Categories must be an array" }, { status: 400 });
  }

  if (!Array.isArray(data.images)) {
    return Response.json({ error: "Images must be an array" }, { status: 400 });
  }

  const post = await db.post.findUnique({
    where: {
      id: params.id
    }, 
    select: {
      authorId: true,
      title: true,
    }
  })

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.authorId !== user.id && user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const images = data.images.map((image: any, idx: number) => ({
    id: image.id,
    url: image.url,
    title: image.title || `${post.title}-${idx}`,
    sort: image.sort
  })) as { id: string, url: string, title: string, sort: number }[];
  
  try {
    const updatedPost = await db.post.update({
      where: {
        id: params.id
      },
      data: {
        title: data.title,
        accepted: data.accepted,
        images: {
          updateMany: images.map(image => ({
            where: {
              id: image.id
            },
            data: {
              url: image.url,
              title: image.title,
              sort: image.sort
            }
          }))
        },
        categories: data.categories || [],
      }
    })

    return Response.json(updatedPost);
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}