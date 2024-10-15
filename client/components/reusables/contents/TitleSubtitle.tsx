// src/components/TitleSubtitle.jsx
import { cn } from "@/utils/cn";
import React from "react";

// Create an interface that omits the title and subtitle from the HTMLAttributes
interface TitleSubtitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "subtitle"> {
  title?: React.ReactNode; // Allow any React node, not just string
  subtitle?: React.ReactNode;
  leftLine?: boolean;
  titleClassName?: string;
  subTitleClassName?: string;
  subTitlePosition?: "top" | "bottom";
}
const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title,
  subtitle,
  leftLine = false,
  titleClassName = "",
  subTitleClassName = "",
  subTitlePosition = "top",
  ...props
}) => {
  return (
    <div className="text-left my-2 p-2" {...props}>
      {subTitlePosition === "top" && (
        <p
          className={cn(
            "inline-block text-primary dark:text-primary font-poppins tracking-widest relative  after:content-[''] after:absolute after:w-6 md:after:w-8 after:h-[1px] after:bg-primary after:top-1/2 after:-right-8 md:after:-right-12 after:transform after:-translate-y-1/2",
            leftLine
              ? "before:content-[''] before:absolute before:w-6 md:before:w-8 before:h-[1px] before:bg-primary before:top-1/2 before:-left-8 md:before:-left-12 before:transform before:-translate-y-1/2"
              : "before:hidden",

            subTitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
      <h1
        className={cn(
          `text-3xl md:text-5xl my-2 font-thin text-black dark:text-white `,
          titleClassName
        )}
      >
        {title}
      </h1>
      {subTitlePosition === "bottom" && (
        <p
          className={cn(
            "inline-block  font-poppins tracking-widest relative   ",

            subTitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default TitleSubtitle;
