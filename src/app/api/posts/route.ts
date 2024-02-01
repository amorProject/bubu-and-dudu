import { z } from 'zod';
import db from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    image: z.any(),
  }),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.any(),
  }))
});
type Post = z.infer<typeof PostSchema>;

export async function GET(req: NextRequest, res: NextResponse) {
  const pageQuery = req.nextUrl.searchParams.get("page");
  var page = pageQuery ? parseInt(pageQuery) ?? 1 : 1;
  var limit = 15;

  try {
    const posts: Post[] = await db.post.findMany({
      where: {
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
            }
          }
        },
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
          }
        },
      },
      take: limit,
      skip: (page - 1) * limit
    })
  
    return Response.json(posts)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}