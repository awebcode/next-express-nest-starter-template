"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PrimaryButton from '../../buttons/PrimaryButton';
import { Trash } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatFileSize, generateFilterFilesWithPreview, getFileIdentifier } from '@/utils/formatFile';
import type { FileWithPreview } from '@/types/types';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const FileInput = dynamic(() => import('../input/FileInput'));

const FilesUploadForm = ({ onAcceptFiles }: { onAcceptFiles: (files: FileWithPreview[]) => void }) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const handleDrop = (acceptedFiles: File[]) => {
        const filesWithPreview = generateFilterFilesWithPreview(files, acceptedFiles);
        setFiles([...filesWithPreview]);
        onAcceptFiles(filesWithPreview);

    };

    const handleUpload = () => {
        console.log(files);
        // Handle file upload logic here
    };

    const handleRemove = (index: number) => {
        setFiles((files) => files.filter((_, i) => i !== index));
    };
    const handleRemoveAll = () => {
        setFiles([]);
    };


    return (
        <div className="w-full max-w-lg mx-auto py-2">
            <h2 className="text-xl font-bold mb-4 leading-8 tracking-wider">Upload Files</h2>
            <FileInput onDrop={handleDrop} accept={{ 'image/*': [] }} />
            <div className="flex justify-end gap-2"> <PrimaryButton onClick={handleUpload} type="submit" className="mt-4">Upload</PrimaryButton>
                <PrimaryButton onClick={handleRemoveAll} type="submit" className="mt-4 bg-red-500 hover:bg-red-400">Remove All</PrimaryButton></div>

            {files.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Selected Files:{files.length}</h3>
                    <RenderImagesInCarousel files={files} handleRemove={handleRemove} />
                </div>
            )}
        </div>
    );
};

const RenderImagesInCarousel = ({ files, handleRemove }: { files: FileWithPreview[], handleRemove: (index: number) => void }) => {
    return (
        <Carousel
            opts={{
                align: "center",
            }}
            className="relative  w-full max-w-[800px] mx-auto p-2   "
        >
            <CarouselContent>
                {files.map(({ file, preview }, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <AnimatePresence mode="popLayout">  <motion.div
                            key={file.name}
                            className="relative flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            <Image
                                src={preview}
                                alt={file.name}
                                width={40}
                                height={40}
                                className="w-full h-20 object-cover rounded"
                            />

                            <Trash onClick={() => handleRemove(index)} className="absolute top-0 left-0 bg-red-100 hover:bg-red-400 text-red-500 p-1 rounded-full" />
                        </motion.div></AnimatePresence>
                    </CarouselItem>
                ))}


            </CarouselContent>
            <div className="flex absolute bottom-[-20px] right-8">
                <CarouselPrevious className='bg-primary text-white' />
                <CarouselNext className='bg-primary text-white' />
            </div>


        </Carousel>
    )
}

export default FilesUploadForm;
