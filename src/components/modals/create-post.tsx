"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UploadDropzone from "../upload-dropzone";

export type Image = {
  title: string;
  file: File;
};

export default function CreatePostModal() {
  const { data: session } = useSession();
  const router = useRouter();
  const [page, setPage] = useState<1 | 2>(1);
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [images, setImages] = useState<Image[]>([] as unknown as Image[]);
  const [loading, setLoading] = useState(false);

  if (!session || !session.user) {
    return null;
  }
  const user = session.user;

  const cancelButtonClick = () => {
    if (loading) return;
    if (page === 1) {
      setOpen(false);
    } else {
      setPage(1);
    }
  };

  const createButtonClick = () => {
    console.log(images);
    if (page === 1) {
      if (title.length === 0 || categories.length === 0) return;
      setPage(2);
    } else {
      if (images.length === 0 || loading) return;
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("categories", JSON.stringify(categories));
      images.forEach((img) => {
        formData.append("images", new File([img.file], img.title));
      });
      fetch("/api/post", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to create post");
          return res.json();
        })
        .then((data) => {
          setTitle("");
          setCategories([]);
          setImages([]);
          setOpen(false);
          toast.success(`Successfully created post ${title}`, {
            action: {
              label: "View",
              onClick: () => router.push(`/${data.id}`),
            },
          });
          setLoading(false);
          setOpen(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    }
  };

  const resetTitle = () => {
    setTitle("");
  };

  const resetCategories = () => {
    setCategories([]);
  };

  const removeCategory = (idx: number) => {
    const newCategories = [...categories];
    newCategories.splice(idx, 1);
    setCategories(newCategories);
  };

  const addCategory = (category: string) => {
    if (categories.includes(category)) return;
    if (categories.length <= 5 && user.role !== "ADMIN") return;
    setCategories([...categories, category]);
    setNewCategoryName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isDesktop && !isMobile ? (
          <Button
            variant="nav-ghost"
            className="md:flex flex-col hidden"
            size="lg"
          >
            Create Post
          </Button>
        ) : (
          <Button variant="nav-ghost" size="icon">
            <Plus size={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[600px] m-0 w-screen md:w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            {page === 1
              ? "Enter a title and categories for your post"
              : "Upload images for your post"}
          </DialogDescription>
        </DialogHeader>
        {page === 1 && (
          <div className="w-full">
            <div>
              <div className="flex items-center justify-between">
                <Label required>Title</Label>
                <button
                  type="button"
                  onClick={resetTitle}
                  className="text-xs text-red-500 p-0 enabled:hover:underline disabled:opacity-50"
                  disabled={title.length === 0 || loading}
                >
                  Clear
                </button>
              </div>
              <Input
                variant="noOutline"
                sizeC="lg"
                placeholder="Enter a title for your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <Label required>Categories</Label>
                <button
                  type="button"
                  onClick={resetCategories}
                  className="text-xs text-red-500 p-0 enabled:hover:underline disabled:opacity-50"
                  disabled={categories.length === 0 || loading}
                >
                  Clear
                </button>
              </div>
              <div className="overflow-x-auto overflow-y-hidden w-[550px] flex scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent justify-start items-center">
                {categories.length >= 1 ? (
                  categories.map((category, idx) => (
                    <Badge
                      key={idx}
                      variant="hover"
                      onClick={() => {
                        if (loading) return;
                        removeCategory(idx);
                      }}
                    >
                      {category}
                    </Badge>
                  ))
                ) : (
                  <h2>No Categories</h2>
                )}
              </div>
            </div>
            <div className="w-full mt-3">
              <Label>Add Categories</Label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    !newCategoryName ||
                    (user.role !== "ADMIN" && newCategoryName.length < 2) ||
                    loading
                  )
                    return;
                  addCategory(newCategoryName);
                  setNewCategoryName("");
                }}
              >
                <Input
                  variant="noOutline"
                  sizeC="md"
                  className="w-full"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className="h-fit">
            <Label>Drag & Drop Images</Label>
            <UploadDropzone onFileChange={setImages} />
          </div>
        )}
        <div className="flex mx-4 gap-x-4 justify-center">
          <Button
            onClick={cancelButtonClick}
            variant={page === 1 ? "destructive" : "secondary"}
            size="lg"
            className="w-full"
          >
            {page === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={createButtonClick}
            variant={page === 1 ? "outline" : "accent"}
            size="lg"
            className="w-full"
            disabled={
              loading ||
              (page === 1 && (title.length === 0 || categories.length === 0)) ||
              (page === 2 && images.length === 0)
            }
          >
            {page === 1 ? "Next" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
