import { cn } from '@/utils/cn';
import React from 'react';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

const H1: React.FC<H1Props> = ({ children, className = 'text-neutral-900 dark:text-neutral-200', ...props }) => {
    return (
        <h1 className={cn('text-heading1', className)} {...props}>
            {children}
        </h1>
    );
};

export default H1;
