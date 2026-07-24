"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF7A1A] text-white shadow-[0_10px_30px_rgba(255,122,26,0.28)] hover:bg-[#E86B12] hover:scale-[1.02]",
        navy:
          "bg-[#0B2E59] text-white shadow-[0_10px_30px_rgba(11,46,89,0.22)] hover:bg-[#09304f] hover:scale-[1.02]",
        outline:
          "border border-white/70 bg-transparent text-white hover:bg-white/10 hover:scale-[1.02]",
        ghost:
          "bg-white text-[#0B2E59] shadow-[0_8px_24px_rgba(11,46,89,0.08)] hover:bg-[#F8FAFC] hover:scale-[1.02]",
        soft:
          "bg-white/95 text-[#0B2E59] border border-[#E2E8F0] shadow-[0_8px_24px_rgba(11,46,89,0.06)] hover:border-[#FF7A1A]/40 hover:scale-[1.02]",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8 text-base",
        sm: "h-10 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
