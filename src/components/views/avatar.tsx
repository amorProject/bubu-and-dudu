"use client";

import { Post } from "@/lib/types";
import { saveAs } from "file-saver";
import { Download, Rabbit } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface SimpleAvatarWrapperProps {
  images: Post["images"];
  title: string;
  forceRow?: boolean;
}

export function SimpleAvatarWrapper({
  images,
  title,
  forceRow = false,
}: SimpleAvatarWrapperProps) {
  if (!images || images.length === 0 || images.length > 4) return null;

  if (images.length <= 3 || forceRow) {
    return (
      <div className="flex w-full gap-x-2 justify-center items-center">
        {images.map((img, idx) => (
          <SimpleAvatar image={img} key={idx} index={idx} postTitle={title} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 w-fit h-fit gap-2 justify-center items-center">
        {images.map((img, idx) => (
          <SimpleAvatar image={img} key={idx} index={idx} postTitle={title} />
        ))}
      </div>
    );
  }
}

export function SimpleAvatar({
  image,
  index,
  postTitle,
  hasDownload = false,
}: SimpleAvatarProps) {
  const title = image.title || `${postTitle} ${index + 1}`;

  function saveImage() {
    const extension = image.url.split(".").pop();

    async function download() {
      saveAs(
        image.url,
        `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${extension}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return download();
  }

  function downloadImage() {
    if (!hasDownload) return;
    toast.promise(saveImage, {
      loading: `Downloading `,
      success: `Downloaded ${title}!`,
      error: `Failed to download ${title}!`,
    });
  }

  if (!hasDownload) {
    return (
      <div className="w-fit h-fit inline-flex justify-center items-center rounded-full p-1 border border-border">
        <Avatar className="w-16 h-16">
          <AvatarImage src={image.url} alt={title} />
          <AvatarFallback>
            <Rabbit size={24} className="animate-rotate" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipContent side="bottom">{title}</TooltipContent>
      <TooltipTrigger>
        <div className="group/avatar relative overflow-hidden w-fit h-fit inline-flex justify-center items-center rounded-full p-1 border border-border">
          <Avatar className="w-16 h-16">
            <AvatarImage src={image.url} alt={title} />
            <AvatarFallback>
              <Rabbit size={24} className="animate-rotate" />
            </AvatarFallback>
          </Avatar>
          <div className="w-full h-full bg-black/40 absolute rounded-full top-0 left-0 hidden group-hover/avatar:flex" />
          <button
            onClick={downloadImage}
            className="hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 absolute group-hover/avatar:inline-flex h-7 w-7 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <Download size={16} />
          </button>
        </div>
      </TooltipTrigger>
    </Tooltip>
  );
}

type SimpleAvatarProps = {
  image: Post["images"][0];
  index: number;
  postTitle: string;
  hasDownload?: boolean;
};
