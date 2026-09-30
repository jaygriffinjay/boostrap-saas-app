import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "rounded-sm font-semibold text-foreground underline decoration-chart-1 decoration-4 underline-offset-4 transition-colors hover:bg-main/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
