import { cn } from '@/utils/cn';
import React from 'react';
interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
const H2: React.FC<H2Props> = ({ children, className = 'text-neutral-900 dark:text-neutral-200', ...props }) => {
    return (
        <h2 className={cn('text-heading2', className)} {...props}>
            {children}
        </h2>
    );
};

export default H2;
