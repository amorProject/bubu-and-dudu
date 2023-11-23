import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePicture } from "@/lib/images";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { saveAs } from "file-saver";
import { DownloadIcon } from "lucide-react";

export function UserVoiceCall({user, i, selected, onChange}:{user: string, i: number, selected: ProfilePicture | null, onChange: (value: string, num: number) => void}) {
  const [hovered, setHovered] = useState<boolean>(false)

  function saveFile() {
    if (!selected) return;
    saveAs(
      selected.images[i].url,
      selected.images[i].title
    )
  }

  return (
    <div 
      className="w-60 h-8 bg-accent flex justify-start px-1 items-center my-[1px] gap-x-2 relative" 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar className="h-7 w-7">
        <AvatarImage src={selected ? selected.images[i].url : ''} />
        <AvatarFallback>{i + 1}</AvatarFallback>
      </Avatar>
      <Button size="icon" className={`h-7 w-7 p-1 absolute${hovered ? '' : ' hidden'}`} onClick={saveFile}>
        <DownloadIcon className="p-0 h-6 w-6" />
      </Button>
      <UserNameInput user={user} i={i} onChange={onChange} />
    </div>  
  )
}

function UserNameInput({user, i, onChange}:{user: string, i: number, onChange: (value: string, num: number) => void}) {
  return (
    <input
      type="text"
      className="w-full h-8 bg-accent flex justify-start px-1 items-center my-[1px] gap-x-2"
      placeholder={`User ${i + 1}`}
      value={user}
      onChange={(e) => onChange(e.target.value, i)}
    />
  )
}

export function UserVoiceCallList({selected, users, setUsers}:{selected: ProfilePicture | null, users: string[], setUsers: Dispatch<SetStateAction<string[]>>}) {
  function handleUserNameChange(index: number, value: string) {
    const updatedUserNames = [...users];
    updatedUserNames[index] = value;
    setUsers(updatedUserNames);
  };

  return (
    <div className="flex flex-col gap-y-1">
      {users.map((user, i) => (
        <UserVoiceCall key={i} user={user} i={i} selected={selected} onChange={(value, num) => handleUserNameChange(num, value)} />
      ))}
    </div>
  )
}