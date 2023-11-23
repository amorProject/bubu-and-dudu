import { ProfilePicture } from "@/lib/images"
import { prisma } from "@/lib/utils"
import { NextRequest } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      images: {
        select: {
          url: true,
          title: true,
          id: true
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
          description: true
        }
      }
    }
  })

  const data: ProfilePicture[] = posts.map((post) => ({
    name: post.title,
    id: post.id,
    categories: post.categories.map((category) => category.slug),
    images: post.images.map((image) => {
      return {
        url: image.url,
        title: image.title,
        id: post.id,
      }
    }),
  }));

  return Response.json(data)
}

export async function POST(request: Request) {
  const res = await request.json()
  const newPost = await prisma.post.create({
    data: {
      title: res.title,
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