import { prisma } from "@/lib/utils"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const filters = request.nextUrl.searchParams.get("filters")?.split(',')
  const filteredPostCount = await prisma.post.count({
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

  const postCount = await prisma.post.count()

  return Response.json({
    postCount,
    filteredPostCount,
  })
}