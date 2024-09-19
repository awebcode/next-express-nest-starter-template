import { cn } from '@/utils/cn';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', ...attributes }) => {
    return (
        <div className={cn(`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, className)} {...attributes}>
            {children}
        </div>
    );
};

export default Container;
