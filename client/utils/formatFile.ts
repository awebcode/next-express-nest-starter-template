import type { FileWithPreview } from "@/types/types";

export const formatFileSize = (size: number) => {
  if (size >= 1_000_000) {
    return (size / 1_000_000).toFixed(2) + " MB";
  } else if (size >= 1_000) {
    return (size / 1_000).toFixed(2) + " KB";
  } else {
    return size + " bytes";
  }
};
export const getFileIdentifier = (file: File) => `${file.size}-${file.lastModified}`;

export function generateFilterFilesWithPreview(
  prevFiles: FileWithPreview[],
  acceptedFiles: File[]
): FileWithPreview[] {
  const existingFileIdentifiers = new Set(
    prevFiles.map(({ file }) => getFileIdentifier(file))
  );
  const newFilesWithPreview = acceptedFiles
    .filter((file) => !existingFileIdentifiers.has(getFileIdentifier(file)))
    .map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

  prevFiles.push(...newFilesWithPreview);

  return prevFiles;
}
