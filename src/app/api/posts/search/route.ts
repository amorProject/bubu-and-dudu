import db from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    image: z.any(),
  }),
  categories: z.array(z.string())
});
type Post = z.infer<typeof PostSchema>;

export async function GET(req: NextRequest, res: NextResponse) {
  const pageQuery = req.nextUrl.searchParams.get("page");
  var page = pageQuery ? parseInt(pageQuery) ?? 1 : 1;
  var limit = 15;
  const searchQuery = decodeURI(req.nextUrl.searchParams.get("search") ?? "");
  var search = searchQuery && searchQuery.length >= 1 ? decodeURI(searchQuery) : undefined;
  const categoryQuery = req.nextUrl.searchParams.get("category");
  var categories = categoryQuery ? categoryQuery.split(",") : [];
  if (!Array.isArray(categories) && categories) {
    categories = [categories];
  }


  try {
    const count = await db.post.count({
      where: {
        accepted: {
          equals: true
        }
      }
    })

    const posts: Post[] = await db.post.findMany({
      where: {
        accepted: {
          equals: true
        },
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive"
            },
          },
          {
            categories: {
              hasSome: categories
            }
          }
        ]        
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
        categories: true
      },
      take: limit,
      skip: (page - 1) * limit
    })

    return Response.json({
      count: {
        total: count,
        filtered: posts.length,
        pages: Math.ceil(posts.length / limit)
      },
      posts
    })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}