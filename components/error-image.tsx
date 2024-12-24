"use client";
import { cn } from "@/lib/utils";
import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & {
  errorText?: string;
};

export function WithErrorImage({ className, errorText, src, ...props }: Props) {
  const [newSrc] = useState(src);
  const [isLoading, setLoading] = useState(true);
  return (
    <NextImage
      {...props}
      className={cn(
        className,
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0",
      )}
      src={newSrc}
      onLoad={() => setLoading(false)}
    />
  );
}