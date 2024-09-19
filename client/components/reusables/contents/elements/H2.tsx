import { cn } from '@/utils/cn';
import React from 'react';
interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
const H2: React.FC<H2Props> = ({ children, className = '', ...props }) => {
    return (
        <h2 className={cn('text-2xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-200 tracking-tight leading-8', className)} {...props}>
            {children}
        </h2>
    );
};

export default H2;
