import { prisma } from "@/lib/utils"

export async function GET() {
  return Response.json( { message: "Hello from GET" } )
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
  })}
