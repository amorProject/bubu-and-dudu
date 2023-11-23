import { prisma } from "@/lib/utils";

export async function GET() {
  const categories = await prisma.category.findMany();
  const data = categories.map((category) => ({
    name: category.title,
    id: category.slug,
    description: category.description ?? "",
  }))

  return Response.json(data);
}

export async function POST() {
  return Response.json( { message: "Hello from POST" } )
}
