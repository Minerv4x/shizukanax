"use client";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Horizontal Scrolling Example</h2>
      <SimpleBarReact style={{ maxHeight: 300 }}>
        {[...Array(50)].map((x, i) => (
          <p>{i}</p>
        ))}
      </SimpleBarReact>
    </div>
  );
}
