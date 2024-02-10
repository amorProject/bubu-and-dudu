import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    image: z.any(),
  }),
  categories: z.array(z.string()),
  images: z.array(z.object({
    id: z.string().optional(),
    url: z.string(),
    title: z.string().optional(),
    sort: z.number().optional(),
  })),
  accepted: z.boolean().optional().default(false),
});
export type Post = z.infer<typeof PostSchema>;