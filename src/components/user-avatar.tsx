import { useState } from "react"
import { Button } from "./ui/button"
import { Download, MicOff } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoonLoader } from "react-spinners"
import { saveAs } from "file-saver";
import { ProfilePicture } from "@/lib/images"

export default function UserAvatar({user, i, selected}:{user: string, i: number, selected: ProfilePicture}) {
  const [hovered, setHovered] = useState<boolean>(false)

  function saveFile() {
    saveAs(
      `/images/uploaded/${selected.images[i]}`,
      selected.images[i]
    )
  }

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative">
      <div className="absolute left-0 top-0 w-32 h-32 transition-all duration-300 hover:bg-black/80 z-[2] rounded-full">
        {hovered && 
          <Button
            onClick={saveFile}
            className="absolute left-1/2 top-1/2 transform 
            -translate-x-1/2 -translate-y-1/2 transition-all 
            duration-300 z-[3] w-20 h-20 rounded-full bg-primary/80 hover:text-white"
          >
            <Download size={32} />
          </Button>
        }
      </div>
      <Avatar className={`w-32 h-32 ${i === 0 && 'outline outline-primary outline-offset-4'}`}>
        <AvatarImage src={`/images/uploaded/${selected.images[i]}`} />
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