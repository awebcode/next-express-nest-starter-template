import React from "react";

export type Theme = "light" | "dark";

// Define a type for components and their props
interface ComponentTypes {
  component?: React.FC<any>; // The component type is generic to handle different props
  componentProps?: Record<string, any>; // Props to pass to the component
}

// Extend InputProps to include component and props information
export interface ZodInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    ComponentTypes {
  label: string;
  name: string;
  type?: string;
  description?: string;
}

export interface FileWithPreview {
  file: File;
  preview: string;
}

export type ClassName = React.HTMLAttributes<HTMLElement>["className"];
