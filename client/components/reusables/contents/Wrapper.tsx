import { cn } from '@/utils/cn';
import React from 'react';
interface WrapperProps {
    children: React.ReactNode;
    className?: string;
}
const Wrapper: React.FC<WrapperProps> = ({ children, className = '' }) => {
    return (
        <div className={cn(`py-8  md:py-16 min-h-screen flex justify-center items-center`, className)}>
            {children}
        </div>
    );
};

export default Wrapper;
