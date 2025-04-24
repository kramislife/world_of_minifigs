import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground", // Black
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", // White
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80", // Red
        outline: "text-foreground", // White Border
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200", // Yellow color
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200", // Blue color
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200", // Green color
        accent: "bg-accent text-foreground border-none", // Yellow color
        category:
          "bg-green-600/10 text-green-400 hover:bg-green-600/20 border border-green-600/20 py-1.5",
        subCategory:
          "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 py-1.5",
        collection:
          "bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 border border-purple-600/20 py-1.5",
        subCollection:
          "bg-orange-600/10 text-orange-400 hover:bg-orange-600/20 border border-orange-600/20 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
