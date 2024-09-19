import { cn } from '@/utils/cn';
import React from 'react';

interface BlurBgProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const BlurBg: React.FC<BlurBgProps> = ({
    className = 'top-0 left-0',
    ...attributes
}) => {
    return (
        <div
            className={cn(
                `absolute bg-primary h-20 w-20 blur-3xl`, // Default styles, no positioning
                className // Dynamic positioning via className
            )}
            {...attributes}
        />
    );
};

export default BlurBg;
