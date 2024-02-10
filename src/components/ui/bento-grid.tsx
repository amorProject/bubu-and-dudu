"use client";

import { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SimpleAvatarWrapper } from "../views/avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[14rem] grid-cols-1 md:grid-cols-6 gap-4 max-w-7xl mx-auto p-4 md:p-0 md:gap-8 transition duration-200 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  categories,
  author,
  images,
  onClick,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 relative h-full rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input shadow-none p-4 bg-black border-white/[0.2] border justify-between flex flex-col space-y-4",
        className
      )}
      onClick={onClick}
    >
      <SimpleAvatarWrapper images={images as any} title={title} forceRow />
      <div className="transition duration-200">
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={author.image.url} alt={author.name} />
            <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="font-bold text-neutral-200">{author.name}</span>
        </div>
        <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="overflow-x-auto overflow-y-hidden w-full flex scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent justify-start items-center">
          {categories.length >= 1 ? (
            categories.map((category, idx) => (
              <Badge key={idx} variant="outline">
                {category}
              </Badge>
            ))
          ) : (
            <h2>No Categories</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export type BentoGridItemProps = {
  id: string;
  title: string;
  categories: string[];
  header: string;
  author: Post["author"];
  images: Post["images"][];
  className?: string;
  onClick?: () => void;
};
