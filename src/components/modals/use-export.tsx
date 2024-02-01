"use client"

import { Check, Rabbit } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useSelected } from "../providers/selected"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

export function UseOnModal() {
  const [prevSelectedId, setPrevSelectedId] = useState<string>("")
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<0 | 1 | 2>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<"bunnybazaar" | "bubuanddudu">("bubuanddudu");
  const { selected, isLoading } = useSelected();
  const { update } = useSession();

  useEffect(() => {
    if (open && isLoading) {
      setOpen(false);
      setSelectedImageIndex(0);
      setView(0);
      setSelectedType("bubuanddudu");
    }
  }, [isLoading, open])

  function handleOpenChange() {
    setOpen(!open);
    if (!open && selected?.id !== prevSelectedId) {
      setSelectedImageIndex(0);
      setView(0);
      setSelectedType("bubuanddudu");
      setPrevSelectedId(selected?.id || "");
    }
  }

  if (!selected) return null;

  function handleNextUseButton() {
    if (view === 0) return setView(1);
    if (view === 1) return setView(2);

    async function setImageBunnyBazaar() {
      if (!selected) {
        toast.error("There was an error while trying to use this image on Bunny Bazaar.")
        return;
      };

      await fetch(`/api/me/export/bunnybazaar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: selected.images[selectedImageIndex]
        })
      }).then(async (res) => {
        if (res.ok) {
          toast.success("Image was successfully applied on Bunny Bazaar.")
          setOpen(false);
        } else {
          toast.error("There was an error while trying to use this image on Bunny Bazaar.")
        }
      }).catch(() => {
        toast.error("There was an error while trying to use this image on Bunny Bazaar.")
      })
    }
    
    if (selectedType === "bunnybazaar") {
      setImageBunnyBazaar();
    }

    async function setImageBubuAndDudu() {
      if (!selected) {
        toast.error("There was an error while trying to use this image on Bubu & Dudu Time.")
        return;
      };

      await fetch(`/api/me/export/bubuanddudu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: selected.images[selectedImageIndex]
        })
      }).then(async (res) => {
        if (res.ok) {
          toast.success("Image was successfully applied to Bubu & Dudu Time.")
          setOpen(false);
        } else {
          toast.error("There was an error while trying to use this image on Bubu & Dudu Time.")
        }
      }).catch(() => {
        toast.error("There was an error while trying to use this image on Bubu & Dudu Time.")
      })
      
      await update()
    }
    
    if (selectedType === "bubuanddudu") {
      setImageBubuAndDudu();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex gap-x-2 px-4"
        >
          <Rabbit size={28} />
          Use as Profile Picture
        </Button>
      </DialogTrigger>
      <DialogContent className="h-72">
        <DialogHeader>
          <DialogTitle>
            { selected.title }
            { view === 2 && ` - ${1 + selectedImageIndex}`}
          </DialogTitle>
          <DialogDescription>
            { view === 0 && "Where would you like to use this image?"}
            { view === 1 && `Which image would you like to use on ${selectedType === "bubuanddudu" ? "Bubu & Dudu Time" : "Bunny Bazaar"}?` }
            { view === 2 && `Are you sure you want to use this image on ${selectedType === "bubuanddudu" ? "Bubu & Dudu Time" : "Bunny Bazaar"}?` }
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-x-2">
          {view === 0 && (
            <div className="flex  justify-center items-center gap-x-2">
              <Button 
                variant="nav-outline" 
                onClick={() => {
                  setSelectedType("bunnybazaar")
                  setView(1)
                }}
                className="px-6 w-fit"
              >
                Bunny Bazaar
              </Button>
              <Button 
                variant="nav-ghost" 
                onClick={() => {
                  setSelectedType("bubuanddudu")
                  setView(1)
                }}
                className="px-6 w-fit"
              >
                Bubu & Dudu Time
              </Button>
            </div>
          )}
          {view === 1 && selected.images.map((image, idx) => (
            <div 
              key={idx} 
              className={`group/avatar relative overflow-hidden w-fit h-fit inline-flex justify-center items-center rounded-full border-2${selectedImageIndex === idx ? " border-[#e672cd]" : " border-border"}`}
            >
              <Avatar className="w-16 h-16">
                <AvatarImage src={image.url} alt={`${selected.title} image ${idx + 1}`} />
                <AvatarFallback>
                  <Rabbit size={24} className="animate-rotate" />
                </AvatarFallback>
              </Avatar>
              <div className="w-full h-full bg-black/40 absolute rounded-full top-0 left-0 hidden group-hover/avatar:flex" />
              <button 
                className="hidden top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 absolute 
                  group-hover/avatar:inline-flex h-7 w-7 animate-shimmer 
                  items-center justify-center rounded-md border border-slate-800 
                  bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors 
                  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                onClick={() => setSelectedImageIndex(idx)}
              >
                {selectedImageIndex === idx ? (
                  <Check size={12} />
                ) : (
                  <Rabbit size={12} />
                )}
              </button>
            </div>
          ))} 
          {view === 2 && (
            <Avatar className="w-16 h-16">
              <AvatarImage src={selected.images[selectedImageIndex].url} alt={`${selected.title} image ${selectedImageIndex + 1}`} />
              <AvatarFallback>
                <Rabbit size={24} className="animate-rotate" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <DialogFooter className="flex items-end">
          <Button 
            variant="outline" 
            onClick={() => {
              if (view === 0) return setOpen(false);
              if (view === 1) return setView(0);
              if (view === 2) return setView(1);
            }}
            className="px-6 w-fit"
          >
            { view === 0 ? "Cancel" : "Back"}
          </Button>
          <Button 
            variant="accent" 
            onClick={handleNextUseButton}
            disabled={selectedImageIndex === -1}
            className="px-6 w-fit"
          >
            { view < 2 ? "Next" : "Use" }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}