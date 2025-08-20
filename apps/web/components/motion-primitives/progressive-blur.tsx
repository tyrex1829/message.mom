import React from "react";
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  direction: "left" | "right";
  blurIntensity?: number;
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className,
  direction,
  blurIntensity = 1,
}) => {
  const blurClass =
    direction === "left"
      ? "bg-gradient-to-r from-transparent to-background/80"
      : "bg-gradient-to-l from-transparent to-background/80";

  return (
    <div
      className={cn(blurClass, className)}
      style={{ backdropFilter: `blur(${blurIntensity * 4}px)` }}
    />
  );
};
