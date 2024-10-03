import { cn } from '@/utils/cn';
import React from 'react'
interface StyledParagrahProps extends React.HTMLAttributes<HTMLParagraphElement> {
  content: string
  leftLine?: boolean
}
const After_BeforeLineParagraph: React.FC<StyledParagrahProps> = ({content,className,leftLine=false, ...props}) => {
  return (
    <p
      className={cn(
        "inline-block text-primary font-poppins tracking-widest relative  after:content-[''] after:absolute after:w-6 md:after:w-8 after:h-[1px] after:bg-primary after:top-1/2 after:-right-8 md:after:-right-12 after:transform after:-translate-y-1/2",
        leftLine
          && "before:content-[''] before:absolute before:w-6 md:before:w-8 before:h-[1px] before:bg-primary before:top-1/2 before:-left-8 md:before:-left-12 before:transform before:-translate-y-1/2"
          
      )}
      {...props}
    >
      {content}
    </p>
  );
}

export After_BeforeLineParagraph
