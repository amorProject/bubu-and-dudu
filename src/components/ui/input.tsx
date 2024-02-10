import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "noOutline" | "default";
  sizeC?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, sizeC, ...props }, ref) => {
    const inputVariants = cva(
      "flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      {
        variants: {
          variant: {
            default:
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            noOutline: "",
          },
          sizeC: {
            sm: "h-7 text-sm file:text-sm",
            md: "h-9 file:text-md",
            lg: "h-11 file:text-lg",
          },
        },
        defaultVariants: {
          variant: "default",
          sizeC: "sm",
        },
      }
    );

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, sizeC, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
