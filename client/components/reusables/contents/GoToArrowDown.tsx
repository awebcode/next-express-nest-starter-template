"use client"

import { cn } from "@/utils/cn";
import { ArrowDown } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface GoToArrowDownProps {
  to: string;
  className?: string;
  duration?: number; // Control the scroll duration
  offset?: number; // Optional offset for fine-tuned scrolling
}

const GoToArrowDown: React.FC<GoToArrowDownProps> = ({
  to,
  className,
  duration = 0.8, // Default scroll duration
  offset = 0, // Scroll offset
  ...props
}) => {
  const goTo = () => {
    const targetElement = document.getElementById(to);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop + offset; // Add offset
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      onClick={goTo}
      whileHover={{ scale: 1.1 }} // Add hover effect
      whileTap={{ scale: 0.95 }} // Add click animation
      className={cn(
        "inline cursor-pointer absolute bottom-4 left-1/2 py-4 px-2 ring-1 ring-primary rounded-full hover:bg-primary hover:text-white",
        className
      )}
      {...props}
    >
      <ArrowDown className="animate-bounce h-4 w-4 md:h-5 md:w-5" />
    </motion.div>
  );
};

export default GoToArrowDown;
