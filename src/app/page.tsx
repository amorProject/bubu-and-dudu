"use client"

import AvatarPage from "@/components/avatar-page"
import { UserContext } from "@/components/context/userContext";
import { Button } from "@/components/ui/button";
import { Profile } from "@/lib/auth";
import { useContext, useEffect, useState } from "react"

export default function Page() {
  const { user, setUser } = useContext(UserContext)
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