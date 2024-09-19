import { cn } from '@/utils/cn';
import React from 'react';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

const H1: React.FC<H1Props> = ({ children, className = '', ...props }) => {
    return (
        <h1 className={cn('text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-7', className)} {...props}>
            {children}
        </h1>
    );
};

export default H1;
