import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({ 
  className, 
  orientation = "horizontal" 
}: DividerProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal" 
          ? "h-px w-full my-8" 
          : "w-px h-full mx-4",
        "bg-border",
        className
      )}
    />
  );
}