"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/admin/ui/spinner";

// coss ui Button portado a Tailwind v3. Mobile first: 44px de alto en celular,
// 36px desde `sm`. El rojo del logo es el primario.
export const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border text-sm font-medium outline-none transition-[background-color,border-color,color,transform] duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:scale-100 data-[loading]:text-transparent [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: { size: "default", variant: "default" },
    variants: {
      size: {
        default: "h-11 px-4 sm:h-9",
        sm: "h-9 px-3 sm:h-8",
        xs: "h-8 px-2.5 text-xs",
        lg: "h-12 px-5 text-base sm:h-10 sm:text-sm",
        icon: "size-11 sm:size-9",
        "icon-sm": "size-9 sm:size-8",
      },
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90 [&>[data-slot=button-loading-indicator]]:text-primary-foreground",
        destructive:
          "border-destructive bg-destructive text-white hover:bg-destructive/90 [&>[data-slot=button-loading-indicator]]:text-white",
        "destructive-outline":
          "border-input bg-transparent text-destructive-foreground hover:border-destructive/40 hover:bg-destructive/10 [&>[data-slot=button-loading-indicator]]:text-destructive-foreground",
        outline:
          "border-input bg-card text-foreground hover:bg-accent [&>[data-slot=button-loading-indicator]]:text-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 [&>[data-slot=button-loading-indicator]]:text-foreground",
        ghost:
          "border-transparent text-foreground hover:bg-accent [&>[data-slot=button-loading-indicator]]:text-foreground",
        link: "border-transparent text-foreground underline-offset-4 hover:underline",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  disabled: disabledProp,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled = Boolean(loading || disabledProp);
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        {children}
        {loading && (
          <Spinner
            className="pointer-events-none absolute"
            data-slot="button-loading-indicator"
          />
        )}
      </>
    ),
    className: cn(buttonVariants({ className, size, variant })),
    "aria-disabled": loading || undefined,
    "data-loading": loading ? "" : undefined,
    "data-slot": "button",
    disabled: isDisabled,
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
