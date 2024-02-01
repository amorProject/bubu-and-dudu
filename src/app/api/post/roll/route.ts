import db from '@/lib/prisma'
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const isFirstLoad = req.nextUrl.searchParams.get('firstLoad') === 'true';

  try {
    if (isFirstLoad) {
      const results = await db.$queryRaw`SELECT id FROM "Post" WHERE accepted = true ORDER BY RANDOM() LIMIT 2` as { id: string }[];

      const posts = await db.post.findMany({
        where: {
          id: {
            in: results.map(r => r.id)
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
          },
        },      
      })

      if (!posts || posts.length === 0) {
        return Response.json({ error: "No posts found" }, { status: 404 })
      }

      return Response.json({
        post: posts[0],
        preload: posts[1]
      })
    } else {
      const results = await db.$queryRaw`SELECT id FROM "Post" WHERE accepted = true ORDER BY RANDOM() LIMIT 2` as { id: string }[];
      const id = results[0].id;

      const post = await db.post.findUnique({
        where: {
          id
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
          },
        },      
      })

      if (!post) {
        return Response.json({ error: "No posts found" }, { status: 404 })
      }

      return Response.json(post)
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}