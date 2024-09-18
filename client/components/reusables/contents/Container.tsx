import { cn } from '@/utils/cn';
import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={cn(`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, className)}>
            {children}
        </div>
    );
};

export default Container;
