"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Download, Rabbit } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export function SimpleAvatar({
  imageUrl, index, title, handleMouseMove
}: SimpleAvatarProps) {

  function saveImage() {
    async function download() {
      saveAs(imageUrl, `${title}-${index + 1}.png`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    return download()
  }

  function downloadImage() {
    toast.promise(saveImage, {
      loading: `Downloading ${title} image ${index + 1}...`,
      success: `Downloaded ${title} image ${index + 1}!`,
      error: `Failed to download ${title} image ${index + 1}!`
    })
  }

  return (
    <div className="group/avatar relative overflow-hidden w-fit h-fit inline-flex justify-center items-center rounded-full p-1 border border-border" onMouseMove={handleMouseMove}>
      <Avatar className="w-16 h-16">
        <AvatarImage src={imageUrl} alt={`${title} image ${index + 1}`} />
        <AvatarFallback>
          <Rabbit size={24} className="animate-rotate" />
        </AvatarFallback>
      </Avatar>
      <div className="w-full h-full bg-black/40 absolute rounded-full top-0 left-0 hidden group-hover/avatar:flex" />
      <button onClick={downloadImage} className="hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 absolute group-hover/avatar:inline-flex h-7 w-7 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <Download size={16} />
      </button>
    </div>
  )
}

type SimpleAvatarProps = {
  imageUrl: string,
  index: number,
  title: string,
  handleMouseMove?: (event: any) => void
}