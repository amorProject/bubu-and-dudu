import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    image: z.any(),
  }),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.any(),
  })),
  images: z.array(z.object({
    url: z.string()
  }))
});
export type Post = z.infer<typeof PostSchema>;