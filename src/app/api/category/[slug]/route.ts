import { prisma } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany({
    where: {
      slug: request.nextUrl.pathname.split("/category/")[1]
    }
  });

  const data = categories.map((category) => ({
    name: category.title,
    id: category.slug,
    description: category.description ?? "",
  }))

  return Response.json(data[0]);
}

export async function POST() {
  return Response.json( { message: "Hello from POST" } )
}
