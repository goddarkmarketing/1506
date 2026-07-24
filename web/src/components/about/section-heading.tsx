import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mb-3 inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-3xl font-semibold tracking-tight text-[#0B2E59] md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg", className)}>
      {children}
    </p>
  );
}
