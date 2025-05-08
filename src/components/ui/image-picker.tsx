"use client"

import React from "react";
import { cn } from "@/src/utils/tailwind_cn";
import { Button } from "./button";
import { X } from "lucide-react";

type ImagePickerProps = React.InputHTMLAttributes<HTMLInputElement> & {
    /** Tableau d’URLs d’images existantes */
  filesUrl?: string[];
    /** Callback appelé avec les fichiers sélectionnés (nouvelles images) */
  onFileChange: (files: File[]) => void;
  /** Callback appelé avec l'URL de l'image supprimée */
  onDeleteFileUrl?: (fileUrl: string) => void;
};

type FileWithPreview = {
  file: File;
  preview: string;
};

const ImagePicker = React.forwardRef<HTMLInputElement, ImagePickerProps>(
  ({ className, filesUrl = [], onFileChange, onDeleteFileUrl, ...props }, ref) => {
    const internalInputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => internalInputRef.current!);

    const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files) {
        const newFiles = Array.from(files).map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        const concatenedFiles = new Set([...selectedFiles, ...newFiles]);
        setSelectedFiles(Array.from(concatenedFiles));
        onFileChange(newFiles.map((item) => item.file));
      }
    };

    const handleDeleteFile = (fileUrl: string) => {
      setSelectedFiles((prev) => prev.filter((item) => item.preview !== fileUrl));
      onDeleteFileUrl?.(fileUrl);
    };

    React.useEffect(() => {
      if (selectedFiles.length === 0 && internalInputRef.current) {
        internalInputRef.current.value = ""; // Reset input value
      }
    }, [selectedFiles]);

    const allFiles =Array.from(new Set([...filesUrl, ...selectedFiles.map((item) => item.preview)])); console.log("allFiles", allFiles);

    return (
      <div className="image-picker">
        <input
          ref={internalInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
        {allFiles.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {allFiles.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Aperçu ${index + 1}`}
                  className="object-cover rounded border"
                  style={{ width: "100px", height: "100px" }}
                />
                <Button
                  variant="ghost"
                  className="absolute top-0 -right-4 bg-destructive hover:bg-red-500 rounded-full size-4 p-0"
                  onClick={() => handleDeleteFile(url)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ImagePicker.displayName = "ImagePicker";

export default ImagePicker;
