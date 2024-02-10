import Error from "@/components/views/error";
import { SimpleView } from "@/components/views/simple";
import db from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { updated?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const post = await db.post
    .findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    })
    .catch(() => null);

  if (!post) {
    return {
      title: "Bubu & Dudu Time",
      description:
        "Bubu & Dudu Time is a website to find matching profile pictures for you and your partners/friends.",
    };
  }

  return {
    title: `${post.title} by ${post.author.name} - Bubu \& Dudu Time`,
    description: `Find matching profile pictures for you and your partners\/friends\ on Bubu & Dudu Time\.`,
    creator: post.author.name,
    openGraph: {
      title: `${post.title} by ${post.author.name} - Bubu \& Dudu Time`,
      description: `Find matching profile pictures for you and your partners\/friends\ on Bubu & Dudu Time\.`,
      type: "website",
      images: post.images.map((image) => ({
        url: image.url,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} by ${post.author.name} - Bubu \& Dudu Time`,
      description: `Find matching profile pictures for you and your partners\/friends\ on Bubu & Dudu Time\.`,
      images: post.images.map((image) => image.url),
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  if (searchParams.updated === "true") {
    redirect(`/${params.id}`);
  }

  const { id } = params;

  const post = await db.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      categories: true,
      images: {
        select: {
          url: true,
          title: true,
        },
        orderBy: {
          sort: "asc",
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          image: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });

  if (!post) {
    return <Error />;
  }

  return (
    <main className="h-screen w-screen justify-center items-center flex inset-0">
      <SimpleView selected={post as any} />
    </main>
  );
}
