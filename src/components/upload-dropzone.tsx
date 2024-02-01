"use client"

import { UploadDropzone as UploadThingDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Check } from "lucide-react"
import { Fragment, useState } from "react";

export function UploadDropzone() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <UploadThingDropzone
      endpoint="imageUploader"
      className="bg-background hover:bg-border transition-colors duration-200 ease-in-out cursor-pointer"
      appearance={{
        container: {
          border: "1px solid hsl(217.2 32.6% 17.5%)"
        },
      }}
      content={{
        uploadIcon: uploading ? (
          <Fragment />
        ) : uploaded && (
          <Check color="white" size={24} />
        )
      }}
      onBeforeUploadBegin={(files) => {
        setUploading(true);
        toast.loading(`Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`, {
          id: "uploading-files",
        })
        return files;
      }}
      onClientUploadComplete={(res) => {
        setUploading(false);
        setUploaded(true);
        setTimeout(() => {
          setUploaded(false);
        }, 1500);
        toast.success(`Successfully uploaded ${res.length} file${res.length > 1 ? "s" : ""}`, {
          id: "uploading-files",
        });
      }}
      onUploadError={(error) => {
        toast.error(error.message, {
          id: "uploading-files",
        });
      }}
    />
  )
}