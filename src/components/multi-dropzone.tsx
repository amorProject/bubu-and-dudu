// @ts-nocheck

import { useCallback, useRef, useState } from 'react';
import { useDropzone } from "@uploadthing/react/hooks";
import Image from './dropzone-image';
import { Button } from './ui/button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  selectedImages: File[];
  setSelectedImages: (value: File[]) => void;
}

export default function ImageDropzone({selectedImages, setSelectedImages}:Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImages((prevImages: any) => [...prevImages, ...acceptedFiles]);
  }, [setSelectedImages]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setSelectedImages((prevImages: any) => [...prevImages, ...Array.from(files)]);
    }
  }

  function handleDragStart() {
    setIsDeleting(true);
  }

  function handleDragEnd(result: any) {
    setIsDeleting(false);

    if (!result.destination) {
      // Remove the image if it is dragged out of the dropzone
      const removedIndex = result.source.index;
      setSelectedImages(selectedImages.filter((_, i) => i !== removedIndex));
      return;
    }

    const items = Array.from(selectedImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedImages(items);
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

      <div className="flex max-w-lg overflow-x-auto whitespace-nowrap overflow-y-hidden gap-1">
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <Image
              alt={`Image ${index}`}
              key={index}
              image={image}
              index={index}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="flex flex-col justify-center items-center">
            Drag &apos;n&apos; drop some files here
          </p>
        )}
      </div>
    </div>
  );
}