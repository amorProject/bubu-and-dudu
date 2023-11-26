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
  document.querySelector('meta[name="description"]')?.setAttribute('content', `Bubu & Dudu Time - ${post.name}`)
  document.querySelector('meta[name="og:title"]')?.setAttribute('content', `${post.name} - Bubu & Dudu Time`)
  document.querySelector('meta[name="og:description"]')?.setAttribute('content', `Bubu & Dudu Time - ${post.name} from ${post.uploader?.username || 'Anonymous'}`)
  document.querySelector('meta[name="og:image"]')?.setAttribute('content', post.images[0].url)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', `${post.name} - Bubu & Dudu Time`)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', `Bubu & Dudu Time - ${post.name}`)
  document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.images[0].url)
  document.querySelector('meta[name="twitter:card"]')?.setAttribute('content', 'summary_large_image')
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', post.categories.join(', ') || 'bubu,bubuanddudu,dudu,budududu,matching,match,pfp,status,discord,discord pfp,matching pfp,cute,cutepfp,cute pfp')
  document.querySelector('meta[name="author"]')?.setAttribute('content', post.uploader?.username || 'Anonymous')
}