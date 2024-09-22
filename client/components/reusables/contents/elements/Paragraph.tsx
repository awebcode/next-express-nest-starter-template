import { cn } from '@/utils/cn';
import React from 'react';
interface ParagraphProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
const Paragraph: React.FC<ParagraphProps> = ({ children, className = 'text-neutral-600 dark:text-neutral-200', ...props }) => {
    return (
        <p className={cn('text-paragraph', className)} {...props}>
            {children}
        </p>
    );
};

export default Paragraph;
