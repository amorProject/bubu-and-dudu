import { ProfilePicture } from "@/lib/images"
import { prisma } from "@/lib/utils"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const filters = (request.nextUrl.searchParams.get("filters")?.split(',') ?? []).filter(Boolean);

  let postCount;

  if (filters.length > 0) {
    postCount = await prisma.post.count({
      where: {
        categories: {
          some: {
            slug: {
              in: filters
            }
          }
        }
      }
    });
  } else {
    postCount = await prisma.post.count();
  }

  const skip = Math.floor(Math.random() * postCount);

  let post;

  if (filters.length > 0) {
    post = (await prisma.post.findMany({
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
      take: 1,
      skip: skip,
      where: {
        categories: {
          some: {
            slug: {
              in: filters
            }
          }
        }
      },
      orderBy: {
        views: 'desc'
      }
    }))[0];
  } else {
    post = (await prisma.post.findMany({
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
      take: 1,
      skip: skip,
      orderBy: {
        views: 'desc'
      }
    }))[0];
  }

  await prisma.post.update({
    data: {
      views: {
        increment: 1
      },
    },
    where: {
      id: post.id
    }
  })

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