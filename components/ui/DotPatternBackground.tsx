"use client";  // Ensure this is client-side only

import { DotPattern } from "@/components/ui/dot-pattern";

const DotPatternBackground = () => {
  return (
    <DotPattern
      color="rgba(0, 0, 0, 0.1)"
      size={50}
      radius={15}
      opacity={0.2}
      className="absolute inset-0 z-[-1]"
    />
  );
};

export default DotPatternBackground;
