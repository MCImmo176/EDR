import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  subtitleClassName?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = false,
  className,
  subtitleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2 className="mb-3">{title}</h2>
      {subtitle && (
        <p className={cn("text-muted-foreground text-lg max-w-2xl", 
          centered && "mx-auto", 
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}