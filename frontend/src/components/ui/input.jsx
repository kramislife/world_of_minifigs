import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, variant, label, ...props }, ref) => {
    if (variant === "floating") {
      return (
        <div className="relative group cursor-text">
          <input
            type={type}
            className={cn(
              "block pt-6 pb-2 px-4 w-full text-white bg-brand/5 border border-white/5 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer group-hover:border-blue-500/50 cursor-text",
              className
            )}
            ref={ref}
            {...props}
          />
          <label className="absolute text-sm text-white/60 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] px-2 py-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1 group-hover:scale-75 group-hover:-translate-y-3 group-hover:top-1 pointer-events-none">
            {label}
          </label>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
