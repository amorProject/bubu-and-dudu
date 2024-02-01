"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "../ui/button";
import { AvatarDropzone } from "../avatar-dropzone";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="pt-1.5 px-1 flex items-center justify-between absolute w-screen">
      <nav className="w-fit h-fit bg-background border border-border rounded-lg px-4 py-3 flex items-center">
        <Button
          variant="link"
          size="sm"
          className="text-primary"
          asChild
        >
          <Link href="/">
            <h2 className="text-xl text-[#e672cd]">
              Bubu & Dudu Time
            </h2>
          </Link>
        </Button>

        <Button
          variant="link"
          size="sm"
          className="text-primary"
          asChild
        >
          <Link href="https://thumpi.shop">
            <span>
              Bunny Bazaar
            </span>
          </Link>
        </Button>
      </nav>

      <div className="pr-2">
        {session && session.user ? (
          <div className="flex space-x-2">
            <AvatarDropzone
              user={session.user}
              size="md"
            />
            <div
              className="flex flex-col items-center"
            >
              <span className="text-sm">{
                session.user.name!.length > 10 ?
                session.user.name!.slice(0, 10) + "..." :
                session.user.name
              }</span>
              <Button
                size="sm"
                className="h-7 text-xs"
                variant="nav-ghost"
                onClick={() => signOut()}
              > Sign Out </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => signIn("discord")}
            size="lg"
            className="h-9 text-xs"
            variant="nav-outline"
          > Sign In </Button>
        )}
      </div>
    </div>
  )
}