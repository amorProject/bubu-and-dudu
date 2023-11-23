import { prisma } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const res = await request.json()
  const data = await prisma.image.update({
    data: {
      downloads: {
        increment: 1
      },
    },
    where: {
      id: res.id
    }
  })

  return Response.json({
    totalDownloads: data.downloads
  })
}