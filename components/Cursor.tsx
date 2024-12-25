"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="cursor"
      style={{
        position: "fixed",
        top: mousePosition.y - 10 + "px", // Adjusted position for center of cursor
        left: mousePosition.x - 10 + "px", // Adjusted position for center of cursor
        width: "20px", // Cursor size
        height: "20px",
        backgroundColor: "black", // Default color
        borderRadius: "50%", // Circular shape
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.1s ease-out", // Smooth transition
      }}
    />
  );
};

export default Cursor;
