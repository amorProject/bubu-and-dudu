'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { categories, Category, filterImagesByCategories, ProfilePicture, images, ProfilePicture as Img } from "@/lib/images"
import { List, PhoneCall, PhoneIncoming, SettingsIcon } from "lucide-react"
import UserAvatar from "@/components/user-avatar"
import { UserVoiceCallList } from "@/components/user-voice-call"
import { MultiSelect } from "@/components/ui/multi-select"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"

const views = [
  { name: 'VC', icon: <PhoneCall /> },
  { name: 'VC 2', icon: <PhoneIncoming />  },
  { name: 'List', icon: <List /> }
]

export default function Home() {
  const [currentImage, setCurrentImage] = useState<Img | null>(null)
  const [selected, setSelected] = useState<Category[]>([]);
  const [view, setView] = useState<0 | 1 | 2>(0)
  const [filteredImages, setFilteredImages] = useState<Img[]>(images)
  const [users, setUsers] = useState<string[]>(["", ""])

  function handleSelect() {
    let randomIndex, randomImage;
  
    do {
      randomIndex = Math.floor(Math.random() * filteredImages.length);
      randomImage = filteredImages[randomIndex];
    } while (randomImage === currentImage && filteredImages.length > 1);

    console.log(randomImage)
    setCurrentImage(randomImage);
  }  

  useEffect(() => {
    setFilteredImages(filterImagesByCategories(selected))
  }, [selected])

  function handleView() {
    setView((prevView) => (prevView === 2 ? 0 : (prevView + 1) as 0 | 1 | 2))
  }

  useEffect(() => {
    if (!currentImage || !currentImage.images.length) return;
    if (currentImage.images.length === users.length) {
      return;
    } else if (currentImage.images.length > users.length) {
      const newUserNames = Array.from({ length: currentImage.images.length - users.length }, (_, index) => '');
      setUsers([...users, ...newUserNames]);
    } else if (currentImage.images.length < users.length) {
      setUsers(users.slice(0, currentImage.images.length));
    }
  }, [currentImage, users]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-y-7">
      {view === 0 && 
        <div className="flex gap-x-5">
          {currentImage && Array.from(Array(currentImage.images.length).keys()).map((u, i) => <UserAvatar key={i} user={users[i]} i={i} selected={currentImage} />)}
        </div>
      }
      {view === 1 && 
        <UserVoiceCallList users={users} setUsers={setUsers} selected={currentImage} />
      }
      <div className="flex gap-x-2">
        <Button variant='secondary' className="rounded-[4px] h-8 w-8" size='icon' onClick={handleView}>
          {views[view].icon}
        </Button>
        <Button className="rounded-[4px] h-8 font-arial uppercase font-bold" onClick={handleSelect}>
          Generate
        </Button>
        <Settings
          selected={selected}
          setSelected={setSelected}
          filteredImages={filteredImages}
        />
      </div>
      {currentImage &&
        <div className="flex flex-col">
          <p>Image #{images.findIndex((img) => img.name === currentImage.name) + 1}</p>
          <h2>{currentImage.name}</h2>
          <p>{currentImage.uploader}</p>
        </div>
      }
    </div>
  )
}

function Settings(props: any) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' className="rounded-[4px] h-8 w-8" size='icon'>
          <SettingsIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Settings
          </SheetTitle>
          <SheetDescription>
            Change your settings to find some profile pictures, wallpapers, statues, and more!
          </SheetDescription>
        </SheetHeader>
          <div>
            <Label>Categories</Label>
            <MultiSelect 
              className="w-full"
              selected={props.selected} 
              setSelected={props.setSelected} 
              categories={categories} 
              placeholder="Select Categories" 
              count={props.filteredImages.length} 
            />
          </div>
      </SheetContent>
    </Sheet>
  )
}

