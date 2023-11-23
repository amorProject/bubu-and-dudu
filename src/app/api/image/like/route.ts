import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({
      error: "You must be signed in to update your user data."
    })
  }

  const body = (await request.json()) as { id: number, add: boolean }
  
  if (body.add) {
    await prisma.user.update({
      where: {
        username: user.name || ''
      },
      data: {
        likedImages: {
          connect: {
            id: body.id
          }
        }
      }
    })
  } else {
    await prisma.user.update({
      where: {
        username: user.name || ''
      },
      data: {
        likedImages: {
          disconnect: {
            id: body.id
          }
        }
      }
    })
  }
  
  const profile = await prisma.user.findUnique({
    where: {
      username: user.name || ''
    },
    include: {
      posts: {
        select: {
          id: true,
          title: true,
          images: true,
          categories: true,
          createdAt: true,
          views: true,
        }
      },
      _count: {
        select: {
          images: true,
          posts: true,
          likedImages: true,
        }
      },
      images: {
        select: {
          id: true,
          title: true,
          url: true,
          downloads: true,
        }
      },
      likedImages: {
        select: {
          id: true,
          title: true,
          url: true,
        }
      }
    }
  })

  if (!profile) {
    return Response.json({
      error: "User not found."
    })
  }

  const data = {
    id: profile.id,
    username: profile.username,
    avatar: user.image,
    posts: profile.posts,
    images: profile.images,
    likedImages: profile.likedImages,
    stats: {
      posts: profile._count.posts,
      images: profile._count.images,
      likes: profile._count.likedImages,
      downloads: profile.images.reduce((acc, curr) => curr.downloads ? acc + curr.downloads : acc, 0),
      views: profile.posts.reduce((acc, curr) => curr.views ? acc + curr.views : acc, 0),
    }
  }

  return Response.json({ success: data ? true : false, user: data})
}