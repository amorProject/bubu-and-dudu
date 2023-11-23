import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Download, MicOff, ThumbsDown, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoonLoader } from "react-spinners"
import { saveAs } from "file-saver";
import { ProfilePicture } from "@/lib/images"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Image, Profile } from "@/lib/auth"
import { useToast } from "./ui/use-toast"

interface Props {
  user: Profile | null;
  setUser: Dispatch<SetStateAction<Profile | null>>;
  i: number;
  selected: ProfilePicture;
}

export default function UserAvatar({user, i, selected, setUser}: Props) {
  const { toast } = useToast()
  const [hovered, setHovered] = useState<boolean>(false)
  const [totalDownloads, setTotalDownloads] = useState<any[]>([])
  const [liked, setLiked] = useState<boolean[]>([])

  useEffect(() => {
    setTotalDownloads(selected.images.map((img) => img.downloads))
    if (!user) return
    setLiked(selected.images.map((img) => user?.likedImages.filter(likedImg => likedImg.id === img.id).length >= 1 ? true : false))
  }, [selected])

  async function saveFile() {
    const image = selected.images[i]

    fetch('/api/image/download', {
      body: JSON.stringify({
        id: image.id,
      }),
      method: 'PUT'
    })

    setTotalDownloads((prev) => {
      const newTotalDownloads = [...prev]
      newTotalDownloads[i] = newTotalDownloads[i] + 1
      return newTotalDownloads
    })

    toast({
      title: 'Image Downloaded',
      description: `You downloaded ${image.title}`,
    })

    saveAs(
      image.url,
      image.title
    )
  }

  async function likeImage() {
    if (!user) return
    const image = selected.images[i]

    const newData = user
    if (newData.likedImages.filter(img => img.id === image.id).length >= 1) {
      newData.likedImages = newData.likedImages.filter(img => img.id !== image.id)
    } else {
      newData.likedImages.push({
        downloads: image.downloads ?? 0,
        id: image.id,
        title: image.title,
        url: image.url,
      })
    }
    setLiked(selected.images.map((img) => newData?.likedImages.filter(likedImg => likedImg.id === img.id).length >= 1 ? true : false))
    setUser(newData)

    toast({
      title: 'Image Liked',
      description: `You ${newData.likedImages.filter(img => img.id === image.id).length >= 1 ? 'liked' : 'unliked'} ${image.title}`,
    })

    await fetch('/api/image/like', {
      body: JSON.stringify({
        id: image.id,
        add: newData.likedImages.filter(img => img.id === image.id).length >= 1 ? true : false,
      }),
      method: 'PUT'
    }).then((res) => res.json())
  }

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative rounded-full group">
      <div className="absolute left-0 top-0 w-32 h-32 transition-all duration-300 hover:bg-black/80 group-hover:bg-black/80 z-[2] rounded-full">
        {hovered && 
          <Tooltip disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                onClick={saveFile}
                className="absolute left-1/2 top-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 transition-all 
                duration-300 z-[3] w-20 h-20 rounded-full bg-primary/80 hover:text-white"
              >
                <Download size={32} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {totalDownloads[i]}&nbsp;
              Download{totalDownloads[i] === 1 ? '': 's'}
            </TooltipContent>
          </Tooltip>
        }
        {user && (
          <Button 
            onClick={likeImage}
            className="absolute left-1/2 top-0 transform 
            transition-all -translate-x-1/2 opacity-0
            group-hover:translate-x-10 group-hover:opacity-100"
            size="icon"
          >
            <ThumbsUp className={`transition-all duration-500${liked[i] ? ' rotate-180' : ''}`} />
          </Button>
        )}
      </div>
      <Avatar className={`w-32 h-32 rounded-full ${i === 0 && 'md:outline outline-primary outline-offset-4'}`}>
        <AvatarImage src={selected.images[i].url} />
        <AvatarFallback>
          <MoonLoader />
        </AvatarFallback>
      </Avatar>
      {i === 1 && 
        <div className="bg-primary w-10 h-10 absolute bottom-0 right-0 rounded-full flex justify-center items-center border-2 border-background z-[3]">
          <MicOff size={24} />
        </div>
      }
    </div>
  )
}