"use client";

import { Post } from "@/lib/types";
import { Check, Rabbit, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useUser from "../providers/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function UseOnModal({
  selected,
  isLoading,
}: {
  selected: Post | null;
  isLoading: boolean;
}) {
  const [prevSelectedId, setPrevSelectedId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<1 | 2>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const { user, updateImage } = useUser();

  useEffect(() => {
    if (open && isLoading) {
      setOpen(false);
      setSelectedImageIndex(0);
      setView(1);
    }
  }, [isLoading, open]);

  function handleOpenChange() {
    setOpen(!open);
    if (!open && selected?.id !== prevSelectedId) {
      setSelectedImageIndex(0);
      setView(1);
      setPrevSelectedId(selected?.id || "");
    }
  }

  if (!selected || !user) return null;

  function handleNextUseButton() {
    if (view === 1) return setView(2);

    async function setImage() {
      if (!selected) {
        toast.error("There was an error while trying to use this image.");
        return;
      }

      await fetch(`/api/me/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selected.images[selectedImageIndex],
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            updateImage(selected.images[selectedImageIndex].url);
            console.log(
              "Image was successfully applied!",
              selected.images[selectedImageIndex].url
            );
            toast.success("Image was successfully applied!");
            setOpen(false);
          } else {
            toast.error("There was an error while trying to use this image.");
          }
        })
        .catch(() => {
          toast.error("There was an error while trying to use this image.");
        });
    }

    setImage();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex gap-x-2 px-4 w-full h-11 flex-col text-xs"
        >
          <User size={16} />
          Use as PFP
        </Button>
      </DialogTrigger>
      <DialogContent className="h-72">
        <DialogHeader>
          <DialogTitle>
            {view === 1 &&
              `Which image would you like to use as your profile picture?`}
            {view === 2 && `Are you sure you want to use this image?`}
          </DialogTitle>
          <DialogDescription>
            {selected.title}
            {view === 2 &&
              ` - ${
                selected.images[selectedImageIndex].title ||
                `Image ${selectedImageIndex + 1}`
              }`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-x-2">
          {view === 1 &&
            selected.images.map((image, idx) => (
              <Tooltip key={idx}>
                <TooltipContent side="bottom">
                  {image.title || `Image ${idx + 1}`}
                </TooltipContent>
                <TooltipTrigger>
                  <div
                    className={`group/avatar relative overflow-hidden w-fit h-fit inline-flex justify-center items-center rounded-full border-2${
                      selectedImageIndex === idx
                        ? " border-[#e672cd]"
                        : " border-border"
                    }`}
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={image.url}
                        alt={`${selected.title} image ${idx + 1}`}
                      />
                      <AvatarFallback>
                        <Rabbit size={24} className="animate-rotate" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-full h-full bg-black/40 absolute rounded-full top-0 left-0 hidden group-hover/avatar:flex" />
                    <button
                      className="hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 absolute group-hover/avatar:inline-flex h-7 w-7 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      {selectedImageIndex === idx ? (
                        <Check size={12} />
                      ) : (
                        <Rabbit size={12} />
                      )}
                    </button>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            ))}
          {view === 2 && (
            <Tooltip>
              <TooltipContent side="bottom">
                {selected.images[selectedImageIndex].title ||
                  `Image ${selectedImageIndex + 1}`}
              </TooltipContent>
              <TooltipTrigger>
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={selected.images[selectedImageIndex].url}
                    alt={`${selected.title} image ${selectedImageIndex + 1}`}
                  />
                  <AvatarFallback>
                    <Rabbit size={24} className="animate-rotate" />
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
            </Tooltip>
          )}
        </div>

        <DialogFooter className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              if (view === 1) return setOpen(false);
              if (view === 2) return setView(1);
            }}
            className="px-6 w-fit"
          >
            {view === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            variant="accent"
            onClick={handleNextUseButton}
            disabled={selectedImageIndex === -1}
            className="px-6 w-fit"
          >
            {view < 2 ? "Next" : "Use"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
