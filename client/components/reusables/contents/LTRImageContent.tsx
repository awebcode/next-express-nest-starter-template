
"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LTRImageWithContentProps {
    imageSrc: string;
    altText: string;
    imagePosition?: 'left' | 'right';
    imageSize?: string;
    contentClassName?: string;
    children: React.ReactNode;
}

const LTRImageWithContent: React.FC<LTRImageWithContentProps> = ({
    imageSrc,
    altText,
    imagePosition = 'left',
    imageSize = 'w-40 h-40', // Default size can be adjusted
    contentClassName = '', // Additional classes for the content
    children,
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Triggers animation when 30% of component is in view
            className={`flex flex-col sm:flex-row ${imagePosition === 'right' ? 'sm:flex-row-reverse' : ''} items-center gap-6`}
        >
            {/* Image Section with Animation */}
            <motion.div
                className={`flex-shrink-0 h-full w-full sm:h-auto sm:w-auto ${imageSize}`}
                initial={{ opacity: 0, x: imagePosition === 'left' ? -50 : 50 }} // Slide in from left/right
                animate={{ opacity: 1, x: 0 }} // Animate to normal position
                transition={{ duration: 0.7, ease: 'easeInOut' }} // Smooth transition
                whileHover={{ scale: 1.05 }} // Slight scaling on hover
            >
                <Image
                    src={imageSrc}
                    alt={altText}
                    className="object-cover h-full w-full  sm:h-full sm:w-full rounded-sm"
                    layout="responsive"
                    width={150}
                    height={150}
                />
            </motion.div>

            {/* Content Section with Animation */}
            <motion.div
                className={`flex-1 ${contentClassName}`}
                initial={{ opacity: 0, y: 20 }} // Slide content from below
                animate={{ opacity: 1, y: 0 }} // Animate to normal position
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }} // Delayed smooth transition
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default LTRImageWithContent;