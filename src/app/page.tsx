import { SimpleView } from "@/components/views/simple";
import { Metadata, ResolvingMetadata } from "next";
import db from "@/lib/prisma";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = searchParams[''] as string | undefined;

  if (!id) {
    return {
      title: 'Bubu \& Dudu Time - Loading',
      description: 'Bubu & Dudu Time is a website to find matching profile pictures for you and your partners\/friends\.'
    }
  }

  const post = await db.post.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      author: {
        select: {
          id: true,
          name: true,
        }
      },
      images: {
        select: {
          url: true
        }
      }
    }
  })

  if (!post) {
    return {
      title: 'Bubu \& Dudu Time',
      description: 'Bubu & Dudu Time is a website to find matching profile pictures for you and your partners\/friends\.'
    }
  }

  return {
    title: `${post.title} by ${post.author.name} - Bubu \& Dudu Time`,
    description: `Find matching profile pictures for you and your partners\/friends\ on Bubu & Dudu Time\.`,
    creator: post.author.name,
    openGraph: {
      title: `${post.title} by ${post.author.name} - Bubu \& Dudu Time`,
      description: `Find matching profile pictures for you and your partners\/friends\ on Bubu & Dudu Time\.`,
      type: 'website',
      images: post.images.map(image => ({
        url: image.url
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} by ${post.author.name} - Bubu \& Dudu Time`,
      description: `Find matching profile pictures for you and your partners\/friends\ on Bubu & Dudu Time\.`,
      images: post.images.map(image => image.url),
    }
  }
}

export default async function Page() {
  return (
    <main className="h-screen w-screen justify-center items-center flex inset-0">
      <SimpleView />
    </main>
  );
}
