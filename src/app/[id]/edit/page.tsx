import Error from "@/components/views/error";
import { SimpleEditView } from "@/components/views/simple-edit";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";

type Props = {
  params: { id: string };
};

export const metadata = {
  title: "Edit Post - Bubu & Dudu Time",
  description:
    "Find matching profile pictures for you and your partners/friends on Bubu & Dudu Time. Edit your post.",
};

export default async function EditPage({ params }: Props) {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
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
      accepted: true,
      images: {
        select: {
          id: true,
          url: true,
          title: true,
          sort: true,
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

  if (post.author.id !== session.user.id && session.user.role !== "ADMIN") {
    return <Error />;
  }

  return (
    <main className="h-screen w-screen justify-center items-center flex inset-0">
      <SimpleEditView selected={post as any} />
    </main>
  );
}
