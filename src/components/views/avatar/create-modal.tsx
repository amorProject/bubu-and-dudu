import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import ImageDropzone from "../../multi-dropzone";
import { Button } from "../../ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Category } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Profile } from "@/lib/auth";

interface Props {
  user: Profile | null
}

export default function CreateModal({user}: Props) {
  const { toast } = useToast() 

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/category").then((res) => res.json()).then((data) => {
      setCategories(data);
    })
  }, [])

  const { startUpload } = useUploadThing("uploadedAvatars");

  async function handleUpload() {
    if (!user) return toast({ title: "You must be logged in to upload an avatar!" })
    if (user.username != "yakisn0w" && user.username != ".fabra") return toast({ title: "You must be verified to upload an avatar!" })
    if (selectedImages.length === 0 || !title || isUploading) return;
    let images: any = []
    setIsUploading(true);
    await startUpload(selectedImages).then((data: any) => {
      images = data
    });

    const newPost = {
      title,
      images,
      categories: selectedCategories.map((category) => category.id),
    }

    fetch("/api/post", {
      body: JSON.stringify(newPost),
      method: "POST",
    }).then(() => {
      setTitle("");
      setSelectedImages([]);
      setSelectedCategories([]);
      setIsUploading(false)

      toast({
        title: "Post created!",
        description: "Your post has been created successfully!",
      })
    }).catch((error) => {
      console.error(error);
      setIsUploading(false)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className="rounded-[4px] h-8 w-8" size='icon'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create new post
          </DialogTitle>
        </DialogHeader>
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        <MultiSelect categories={categories} placeholder="Categories" selected={selectedCategories} setSelected={setSelectedCategories} className="w-full" />
        <ImageDropzone selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        <Button onClick={handleUpload} disabled={isUploading || !title || selectedImages.length <= 0}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}