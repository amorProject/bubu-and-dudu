import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const onlyGetCount = req.nextUrl.searchParams.get("count") === "true";
  const count = await db.post.count({
    where: {
      accepted: false
    }
  });

  if (onlyGetCount) {
    try {
      return Response.json({ count });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  const page = req.nextUrl.searchParams.get("page") || "1";
  const limit = req.nextUrl.searchParams.get("limit") || "10";

  try {
    const unverifiedPosts = await db.post.findMany({
      where: {
        accepted: false
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
        },
      }, 
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    })
  
    return Response.json({
      posts: unverifiedPosts,
      count
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json() as { postIds: string[] };

  if (!data.postIds || !Array.isArray(data.postIds)) {
    return Response.json({ error: "No posts provided" }, { status: 400 });
  }

  try {
    await db.post.updateMany({
      where: {
        id: {
          in: data.postIds
        }
      },
      data: {
        accepted: true
      }
    });

    return Response.json({ message: `Successfully approved ${data.postIds.length} posts.` });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}