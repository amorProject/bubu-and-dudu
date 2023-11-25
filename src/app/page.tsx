"use client"

import { useUser } from "@/components/context/userContext";
import { Button } from "@/components/ui/button";
import AvatarPage from "@/components/views/avatar/avatar-page";
import { useState } from "react"
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const { user, setUser } = useUser()
  // 1: Avatar, 2: Status, 3: Wallpaper
  const [view, setView] = useState<number>(1)
  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center">
      {view === 1 && <AvatarPage user={user} setUser={setUser} />}
      {view === 2 && <div>
        <h1 className="text-6xl text-foreground">Status</h1>
      </div>}
      {view === 3 && <div>
        <h1 className="text-6xl text-foreground">Wallpaper</h1>
      </div>}

      <Button onClick={() => setView((prevView) => (prevView % 3) + 1)}>
        View {view}
      </Button>
    </div>
  )
}