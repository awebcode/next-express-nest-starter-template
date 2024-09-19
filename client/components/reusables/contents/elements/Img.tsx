"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const BASE_URL = process.env.BASE_PATH || "/images/";

type ImgProps = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
> &
    Partial<{
        src: string;
        alt: string;
        isStatic: boolean;
        width: number;
        height: number;
    }>;

const Img: React.FC<React.PropsWithChildren<ImgProps>> = ({
    className,
    src = "defaultNoData.png",
    alt = "testImg",
    isStatic = false,
    width = 1000, // default width
    height = 1000, // default height
    ...restProps
}) => {
    const [imgSrc, setImgSrc] = React.useState(src);

    React.useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{
                duration: 0.6,
                ease: "easeInOut",
            }}
            viewport={{ once: true }}
        >

            {/* //width: `${width}px`, height: `${height}px` */}
            <div style={{ position: "relative", }}>
                <Image
                    src={isStatic ? imgSrc : BASE_URL + imgSrc}
                    alt={alt}
                    height={height}
                    width={width} // Makes the image fill the parent div
                    objectFit="cover" // Ensures the image scales properly
                    title={alt}
                    blurDataURL="defaultNoData.png"
                    placeholder="blur"
                    loading="lazy"
                    {...restProps}
                    onError={() => {
                        setImgSrc("defaultNoData.png");
                    }}
                    className={cn("w-full h-full object-cover rounded-lg")}
                />
            </div>
        </motion.div>
    );
};

export default Img 