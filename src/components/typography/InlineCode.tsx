import { cn } from "@/lib/utils";

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function InlineCode({ children, className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "inline me-1 wrap-anywhere rounded-base border border-border bg-main/20 px-1.5 py-0.5 text-[0.85em] font-medium text-foreground shadow-[2px_2px_0px_0px_var(--border)] [box-decoration-break:clone]",
        className,
      )}
      style={{ fontFamily: "var(--font-jetbrains-mono)", ...props.style }}
      {...props}
    >
      {children}
    </code>
  );
}
