import db from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Bubu & Dudu Time",
  description:
    "Bubu & Dudu Time is a website to find matching profile pictures for you and your partners/friends.",
};

export default async function Page() {
  const results =
    (await db.$queryRaw`SELECT id FROM "Post" WHERE accepted = true ORDER BY RANDOM() LIMIT 2`) as {
      id: string;
    }[];
  const id = results[0].id;

  redirect(`/${id}`);
}
