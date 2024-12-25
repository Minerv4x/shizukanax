"use client"
import { useEffect, useState } from "react";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function MyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure the DotPattern only renders on the client side
  }, []);

  if (!isClient) {
    return null; // Prevent server-side rendering issues
  }

  return (
    <div>
      {/* DotPattern as background */}
      <DotPattern
        color="rgba(0, 0, 0, 0.1)"  // Set dot color, this is a translucent black
        size={30}                   // Size of the dots
        radius={10}                 // Border radius of the dots
        opacity={0.3}               // Dot opacity
        className="absolute inset-0 z-[-1]" // To place it in the background
      />
      
      {/* Your content */}
      <section className="relative z-10 p-8">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
        <p>This is some content over a dot pattern background.</p>
      </section>
    </div>
  );
}
