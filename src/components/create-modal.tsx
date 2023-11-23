import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import ImageDropzone from "./multi-dropzone";
import { Button } from "./ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export default function CreateModal() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");

  const { startUpload, isUploading } = useUploadThing("uploadedAvatars");

  async function handleUpload() {
    if (selectedImages.length === 0 || !title || isUploading) return;
    let images: any = []
    await startUpload(selectedImages).then((data) => {
      images = data
    });

    const newPost = {
      title,
      images,
      createdAt: new Date().toISOString(),
    }

    fetch("/api/post", {
      body: JSON.stringify(newPost),
      method: "POST",
    }).then(() => {
      setTitle("");
      setSelectedImages([]);
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create new post
          </DialogTitle>
        </DialogHeader>
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        <ImageDropzone selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        <Button onClick={handleUpload} disabled={isUploading || !title || selectedImages.length <= 0}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}