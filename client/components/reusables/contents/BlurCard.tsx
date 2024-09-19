import { cn } from '@/utils/cn';
import React from 'react';

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const BlurCard: React.FC<BlurCardProps> = ({ children, className = '', ...attributes }) => {
    return (
        <div className={cn(`relative bg-white py-8  px-4 md:px-8 rounded-md dark:bg-gray-700/55 backdrop-blur-xl `, className)} {...attributes}>
            {children}
            <div className="absolute left-0 top-0 h-20 w-20 bg-purple-400 blur-2xl"></div>
            <div className="absolute right-0 bottom-0 h-20 w-20 bg-yellow-500 blur-2xl"></div>
        </div>
    );
};

export default BlurCard;
