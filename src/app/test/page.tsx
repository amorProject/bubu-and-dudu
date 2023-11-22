'use client'

import ImageDropzone from "@/components/multi-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

export default function Page() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");

  const { startUpload, isUploading } = useUploadThing(
    "uploadedAvatars",
    {
      onClientUploadComplete: () => {
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    },
  );

  async function handleUpload() {
    if (selectedImages.length === 0) {
      return;
    }
    let images: any = []
    await startUpload(selectedImages).then((data) => {
      images = data
    });

    const newPost = {
      title,
      images,
      createdAt: new Date().toISOString(),
    }

    fetch("/api/image", {
      body: JSON.stringify(newPost),
      method: "POST",
    }).then(async (data) => {
      setTitle("");
      setSelectedImages([]);
    })
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-y-7">
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4">
        <h2>
          Upload New Profile Pictures!
        </h2>
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        <div>
          <ImageDropzone selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        </div>
        <Button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  )
}