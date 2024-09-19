"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface HeadingPart {
    text: string | React.ReactNode;
    isSpan?: boolean;
    spanClassName?: string
}

interface HeadingProps {
    parts: HeadingPart[];
    fontSize?: string;
    align?: "text-left" | "text-center" | "text-right";
    subTitle?: string;
    subTitleClassName?: string,
    className?: string
}

const Heading: React.FC<HeadingProps> = ({
    parts,
    fontSize = 'text-5xl', // Default font size
    align = 'text-left',
    subTitle = '',
    subTitleClassName = "",
    className
}) => {
    return (
        <div className={cn('prose prose-orange sm:prose-lg dark:prose-invert', className, align)}>

            <motion.h1 initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -5 }} // Start invisible, lower position, slightly smaller and rotated
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}    // Animate to visible, original size, and position
                transition={{
                    duration: 0.8,     // Slower duration for a smooth effect
                    ease: [0.6, -0.05, 0.01, 0.99], // Custom ease curve for professional feel
                    type: "spring",    // Adds a slight spring effect
                    stiffness: 120,    // Controls how bouncy the spring is
                    damping: 10
                }}        // Smoothens the bounceransition details
                viewport={{ once: true }} className={`text-3xl md:${fontSize}   text-neutral-800 overflow-hidden leading-8 `}>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part.isSpan ? (
                            <span className={cn('mx-2', part.spanClassName)}>{part.text}</span>
                        ) : (
                            part.text
                        )}
                    </React.Fragment>
                ))}

            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20, scale: 0.7, rotate: -4 }} // Start invisible, lower position, slightly smaller and rotated
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}    // Animate to visible, original size, and position
                transition={{
                    duration: 0.6,     // Slower duration for a smooth effect
                    ease: [0.4, -0.05, 0.02, 0.99], // Custom ease curve for professional feel
                    type: "spring",    // Adds a slight spring effect
                    stiffness: 110,    // Controls how bouncy the spring is
                    damping: 11
                }}        // Smoothens the bounceransition details
                viewport={{ once: true }} className={cn(`overflow-hidden my-2`, subTitleClassName)}>{subTitle}</motion.p>
        </div>
    );
};

export default Heading;