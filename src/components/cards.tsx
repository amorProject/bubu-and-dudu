import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function Cards({children, className}: Props) {
  return (
    <div className={cn("grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-2xl p-4 mx-auto place-self-center relative w-full max-h-96 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary", className)}>
      {children}
    </div>
  );
};