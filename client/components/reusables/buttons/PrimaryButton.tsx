"use client";
import React, { ReactNode, FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// Define the types for the Button Props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    onClick?: () => void;
    className?: string;
    isOutlineAnimation?: boolean;
    type?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<ButtonProps> = ({
    children,
    onClick,
    iconLeft,
    iconRight,
    className,
    isOutlineAnimation = false,
    ...props
}) => {
    // Define animation props separately
    const animations = {
        whileTap: { scale: 0.95 },
        whileHover: { scale: 1.1 },
        transition: { type: "spring", stiffness: 100, damping: 10, duration: 0.3 },
    }

    if (isOutlineAnimation) {
        return (
            <motion.button
                {...animations}
                {...props as any}
                className={cn(`relative inline-flex h-10 md:h-14 overflow-hidden rounded-full p-[1px] w-full max-w-[150px] md:w-[200px] focus:outline-none `,className)}
                onClick={onClick}
            >
                {/* Inner spinning gradient */}
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex uppercase h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    {!!iconLeft && iconLeft}
                    <span>{children}</span>
                    {!!iconRight && iconRight}
                </span>
            </motion.button>
        );
    } else {
        return (
            <motion.button
                {...animations}
                className={cn(
                    `flex items-center uppercase justify-center px-4 md:px-12 py-2 md:py-3 bg-primary text-white rounded hover:bg-purple-700 focus:outline-none `,  className 
                )}
                onClick={onClick}
                {...props as any}
            >
                {!!iconLeft && iconLeft}
                <span>{children}</span>
                {!!iconRight && iconRight}
            </motion.button>
        );
    }
};

export default PrimaryButton;
