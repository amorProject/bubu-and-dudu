"use client";

import { Post } from "@/lib/types";
import { MoveLeft, MoveRight, RabbitIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function SimpleEditView({ selected }: { selected: Post }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const [verified, setVerified] = useState(selected.accepted);
  const [title, setTitle] = useState(selected.title);
  const [categories, setCategories] = useState(selected.categories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [images, setImages] = useState(
    selected.images.map((img, idx) => ({
      ...img,
      title: img.title || `${selected.title}-${idx + 1}`,
    }))
  );

  if (!session || !session.user) {
    return null;
  }
  const user = session.user;

  const resetTitle = () => {
    setTitle(selected.title);
  };

  const addCategory = (category: string) => {
    if (categories.includes(category)) return;
    if (categories.length <= 5 && user.role !== "ADMIN") return;
    setCategories([...categories, category]);
  };

  const resetCategories = () => {
    setCategories(selected.categories);
  };

  const removeCategory = (idx: number) => {
    const newCategories = [...categories];
    newCategories.splice(idx, 1);
    setCategories(newCategories);
  };

  const resetImageTitle = (idx: number) => {
    const newImages = [...images];
    newImages[idx].title =
      selected.images[idx].title || `${selected.title}-${idx + 1}`;
    setImages(newImages);
  };

  const moveImageInArray = (idx: number, direction: "left" | "right") => {
    const newImages = [...images];
    const [removed] = newImages.splice(idx, 1);
    if (direction === "left") {
      newImages.splice(idx - 1, 0, removed);
    } else {
      newImages.splice(idx + 1, 0, removed);
    }
    setImages(newImages);
  };

  const save = async () => {
    setLoading(true);
    const res = await fetch(`/api/post/${selected.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        categories,
        accepted: verified,
        images: images.map((img, idx) => ({
          ...img,
          title: images[idx].title || `${selected.title}-${idx + 1}`,
          sort: idx,
        })),
      }),
    });

    if (res.ok) {
      toast.success(`Successfully updated the post "${title}"`, {
        action: {
          label: "View",
          onClick: () => router.push(`/${selected.id}?updated=true`),
        },
      });
    } else {
      toast.error("There was an error while trying to update the post.");
    }

    setLoading(false);
  };

  if (!session || !session.user) {
    return null;
  }

  return (
    <Card className="max-w-[100vw] m-0 w-screen md:w-[600px] lg:w-[900px] md:mt-0 mt-16 relative">
      <div
        className="flex items-center gap-x-2 absolute top-2 left-2"
        onClick={() => {
          if (user.role !== "ADMIN") return;
          setVerified(!verified);
        }}
      >
        <Checkbox checked={verified} disabled={user.role !== "ADMIN"} />
        <Label>{verified ? "Verified" : "Not verified"}</Label>
      </div>
      <CardContent className="w-full">
        <CardHeader className="items-center">
          <CardTitle className="text-white text-2xl leading-snug tracking-wide">
            <div>
              <div className="flex items-center justify-between">
                <Label>Title</Label>
                <button
                  type="button"
                  onClick={resetTitle}
                  className="text-xs text-gray-400 p-0 hover:underline"
                  disabled={loading}
                >
                  Reset
                </button>
              </div>
              <Input
                variant="noOutline"
                sizeC="lg"
                placeholder={selected.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardTitle>
          <div className="overflow-x-auto overflow-y-hidden w-96 flex scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent justify-center items-center">
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
          <div>
            <div className="flex items-center justify-between">
              <Label>Add Categories</Label>
              <div className="flex gap-x-1.5">
                <button
                  type="button"
                  onClick={resetCategories}
                  className="text-xs text-gray-400 p-0 hover:underline"
                  disabled={loading}
                >
                  Reset
                </button>
                <span className="text-xs text-white">/</span>
                <button
                  type="button"
                  onClick={() => setCategories([])}
                  disabled={categories.length === 0 || loading}
                  className="text-xs text-red-400 p-0 enabled:hover:underline disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCategoryName || newCategoryName.length < 2 || loading)
                  return;
                addCategory(newCategoryName);
                setNewCategoryName("");
              }}
            >
              <Input
                variant="noOutline"
                sizeC="md"
                className="w-60"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={loading}
              />
            </form>
          </div>
        </CardHeader>
        <div className="flex md:flex-row flex-col justify-center items-center gap-2.5">
          {images.length > 0 &&
            images.map((img, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center gap-y-2 bg-secondary p-2 rounded-md`}
              >
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={img.url}
                    alt={`${selected.title} image ${idx + 1}`}
                  />
                  <AvatarFallback>
                    <RabbitIcon size={24} className="animate-rotate" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Input
                    variant="noOutline"
                    sizeC="md"
                    value={images[idx].title}
                    placeholder={`${selected.title}-${idx + 1}`}
                    disabled={loading}
                    onChange={(e) => {
                      const newImages = [...images];
                      newImages[idx].title = e.target.value;
                      setImages(newImages);
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <Label>Image {idx + 1}</Label>
                    <button
                      type="button"
                      onClick={() => resetImageTitle(idx)}
                      className="text-xs text-gray-400 p-0 hover:underline"
                      disabled={loading}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      size="icon"
                      variant="accent"
                      disabled={idx === 0 || loading}
                      onClick={() => moveImageInArray(idx, "left")}
                      className="h-fit"
                    >
                      <MoveLeft size={24} />
                    </Button>
                    <Button
                      size="icon"
                      variant="accent"
                      disabled={idx === images.length - 1 || loading}
                      onClick={() => moveImageInArray(idx, "right")}
                      className="h-fit"
                    >
                      <MoveRight size={24} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <CardFooter className="px-0 pb-0 pt-6 grid grid-cols-4 items-end justify-between gap-x-2">
          <Button
            variant="outline"
            className="col-span-2"
            disabled={loading}
            asChild
          >
            <Link href="/[id]" as={`/${selected.id}`}>
              Cancel
            </Link>
          </Button>
          <Button
            variant="nav-ghost"
            className="col-span-2"
            onClick={save}
            disabled={loading}
          >
            Save
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
