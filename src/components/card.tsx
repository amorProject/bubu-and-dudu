import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: Props) {
  return (
    <div onClick={onClick} className={cn("rounded-xl border bg-card text-card-foreground shadow p-2 flex justify-center items-center gap-1", className)}>
      {children}
    </div>
  )
}