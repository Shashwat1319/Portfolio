import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Expand cursor when hovering over links, buttons, or any clickable elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("glass-card") ||
        getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Variants for Framer Motion to handle the trailing and scaling animations
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 400,
        damping: 30,
      },
    },
    hover: {
      x: mousePosition.x - 32, // Adjusted for larger size
      y: mousePosition.y - 32,
      scale: 1.5,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(139, 92, 246, 0.8)",
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0, // dot disappears when hovering
    },
  };

  // Only render on devices that support hover
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-blue-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ width: "32px", height: "32px" }}
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ width: "8px", height: "8px" }}
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
      />
    </>
  );
};

export default CustomCursor;
