import { ProfilePicture } from "@/lib/images"
import { prisma } from "@/lib/utils"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")
  if (!id) return Response.json({ error: "No id provided" }, { status: 400 })

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      images: {
        select: {
          url: true,
          title: true,
          id: true,
          downloads: true
        }
      },
      User: {
        select: {
          username: true,
          id: true
        }
      },
      categories: {
        select: {
          title: true,
          slug: true,
          description: false
        }
      }
    },
  })

  if (!post) return Response.json({ error: "No post found" }, { status: 404 })

  const data: ProfilePicture = {
    id: post.id,
    name: post.title,
    categories: post.categories.map((category) => category.slug),
    images: post.images.map((image) => {
      return {
        url: image.url,
        title: image.title,
        id: image.id,
        downloads: image.downloads,
      }
    }),
    uploader: {
      id: post.User?.id || 0,
      username: post.User?.username || '',
    }
  };

  return Response.json(data)
}

export async function POST(request: Request) {
  const res = await request.json()
  if (!res.title) return Response.json({ error: "No title provided" }, { status: 400 })
  if (!res.userId) return Response.json({ error: "No userId provided" }, { status: 400 })
  if (!res.images) return Response.json({ error: "No images provided" }, { status: 400 })
  const newPost = await prisma.post.create({
    data: {
      title: res.title,
      userId: res.userId,
      categories: {
        connect: res.categories.map((category: any) => {
          return {
            slug: category,
          }
        }),
      },
      images: {
        create: res.images.map((image: any) => {
          return {
            url: image.url,
            title: image.name,
          }
        }),
      }
    }
  })
  return Response.json({
    success: newPost ? true : false,
    data: newPost ? newPost : null,
  })
}