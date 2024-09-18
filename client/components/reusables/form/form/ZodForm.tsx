"use client";
import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ZodInputProps } from '@/types/types';
const ZodInput = dynamic(() => import('../input/ZodInput'));
const PrimaryButton = dynamic(() => import('../../buttons/PrimaryButton'));
const FilesUploadForm = dynamic(() => import('./FilesUploadForm'));

import type { FileWithPreview } from "@/types/types";
import dynamic from 'next/dynamic';

type ZodHookFormProps<TFormData extends FieldValues, TIsFileUpload extends boolean = false> = {
    schema: ZodSchema<TFormData>;
    onSubmit: (data: TFormData) => Promise<void>;
    fields: ZodInputProps[];
    submitButtonLabel?: string;
    isFileUpload?: TIsFileUpload;
    onAcceptFiles?: TIsFileUpload extends true ? (acceptedFiles: FileWithPreview[]) => void : never;
};

const ZodHookForm = <TFormData extends FieldValues, TIsFileUpload extends boolean = false>({
    schema,
    onSubmit,
    fields,
    submitButtonLabel = "Submit",
    isFileUpload = false as TIsFileUpload,
    onAcceptFiles
}: ZodHookFormProps<TFormData, TIsFileUpload>) => {
    const methods = useForm<TFormData>({
        resolver: zodResolver(schema),
        mode: "all",
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-lg ">
                {fields.map((field) => {
                    if (field.component) {
                        const Component = field.component;
                        return <Component key={field.name as string} description={field.description} label={field.label}
                            name={field.name as string} {...field.componentProps} />;
                    }
                    return (
                        <ZodInput
                            key={field.name as string}
                            label={field.label}
                            name={field.name as string}
                            type={field.type}
                            description={field.description}
                            autoComplete={field.autoComplete || "on"}
                        />
                    );
                })}
                {/** Files upload form */}
                {isFileUpload && <FilesUploadForm onAcceptFiles={onAcceptFiles as (acceptedFiles: FileWithPreview[]) => void} />}
                <PrimaryButton type="submit" className="">
                    {submitButtonLabel}
                </PrimaryButton>
            </form>
        </FormProvider>
    );
};

export default ZodHookForm;
