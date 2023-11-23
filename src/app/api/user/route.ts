import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({
      error: "You must be signed in to get your user data."
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

  return Response.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.name) {
    return Response.json({
      error: "You must provide a username."
    })
  }

  const alreadyExists = await prisma.user.findUnique({
    where: {
      username: body.name
    }
  })

  if (alreadyExists) {
    return Response.json({
      error: "This username is already taken."
    })
  }

  const profile = await prisma.user.create({
    data: {
      username: body.name || '',
    }
  })

  return Response.json(profile)
}

export async function PUT() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({
      error: "You must be signed in to update your user data."
    })
  }

  const profile = await prisma.user.upsert({
    where: {
      username: user.name || ''
    },
    create: {
      username: user.name || '',
    },
    update: {
      downloads: {
        increment: 1
      }
    }
  })

  return Response.json(profile)
}