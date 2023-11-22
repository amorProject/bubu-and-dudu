import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePicture } from "@/lib/images";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function UserVoiceCall({user, i, selected, onChange}:{user: string, i: number, selected: ProfilePicture | null, onChange: (value: string, num: number) => void}) {
  return (
    <div className="w-60 h-8 bg-accent flex justify-start px-1 items-center my-[1px] gap-x-2">
      <Avatar className="h-7 w-7">
        <AvatarImage src={`/images/uploaded/${selected ? selected.images[i] : 'null'}`} />
        <AvatarFallback>{i + 1}</AvatarFallback>
      </Avatar>
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