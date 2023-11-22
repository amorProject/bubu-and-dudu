import { useCallback, useState, useRef } from 'react';
import { useDropzone } from "@uploadthing/react/hooks";
import Image from './dropzone-image';
import { Button } from './ui/button';

interface Props {
  selectedImages: File[];
  setSelectedImages: (value: File[]) => void;
}

export default function ImageDropzone({selectedImages, setSelectedImages}:Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // @ts-ignore
    setSelectedImages((prevImages: any) => [...prevImages, ...acceptedFiles]);
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true, noClick: true  });

  function handleDelete(index: number) {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  function handleFileSelect() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      // @ts-ignore
      setSelectedImages((prevImages: any) => [...prevImages, ...Array.from(files)]);
    }
  }

  return (
    <div
      {...getRootProps()}
      className={`h-full w-full flex flex-col justify-center items-center gap-y-7 bg-card rounded-xl border shadow p-6 transition-all duration-50 max-w-lg sm:min-w-[325px] md:min-w-[400px] ${
        isDragActive ? 'border-white text-white' : 'text-muted-foreground'
      }`}
    >
        <input {...getInputProps()} />
        <Button onClick={handleFileSelect} disabled={isDragActive}>Select Files</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileInputChange}
        />

      <div className="flex max-w-lg overflow-x-auto">
        {selectedImages.length > 0 ? (
          <div className="flex gap-4 pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-card-foreground">
            {selectedImages.map((image, index) => (
              <Image
                key={index}
                image={image}
                index={index}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <p className="flex flex-col justify-center items-center">
            <span>
              Drag 'n' drop some files here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}