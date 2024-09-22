import { fileSchema } from '@/types/zodSchema/formSchema';
import React from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { z } from 'zod';

interface FileInputProps {
    onDrop: (acceptedFiles: File[]) => void;
    accept?: Accept;
}

const FileInput: React.FC<FileInputProps> = ({ onDrop, accept }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop: (acceptedFiles) => {
            // Validate files using Zod
            const filesData = acceptedFiles.map(file => ({
                type: file.type,
                size: file.size
            }));

            try {
                fileSchema.parse({ files: filesData });
                onDrop(acceptedFiles);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    alert(error.errors.map(e => e.message).join('\n')); // Handle validation errors
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

    return (
        <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg p-4 cursor-pointer focus:outline-none ${isDragActive ? 'border-blue-500' : 'border-primary'
                }`}
        >
            <input {...getInputProps()} />
            <FiUpload className="text-2xl md:text-6xl text-paragraphrimary mb-4" />
            {isDragActive ? (
                <p className="!text-blue-500 font-semibold animate-pulse">Drop the files here...</p>
            ) : (
                <p>
                    Drag and drop some files here, or click to select files
                </p>
            )}
        </div>
    );
};

export default FileInput;
