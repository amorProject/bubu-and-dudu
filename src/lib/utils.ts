import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PrismaClient } from "@prisma/client"
import { Image } from "./images"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const prisma = new PrismaClient()

export function setMetadata(post: Image) {
  document.title = `${post.name} - Bubu & Dudu Time`
}