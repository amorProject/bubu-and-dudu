import db from '@/lib/prisma'
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
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
          }
        },
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