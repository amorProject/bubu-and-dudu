'use client'
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, Sparkle, Star, StarOff } from "lucide-react"
import { Discord, Heart } from "./logos";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { signIn, signOut } from "next-auth/react";
import { useUser } from "./context/userContext";
import { useEffect } from "react";
import { useSettings } from "./context/settingsContext";

export default function Navbar() {
  const { user, setUser } = useUser()
  const { toggleMouseTrail, setSettings, settings: { mouseTrail } } = useSettings()

  async function fetchUser() {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUser(data.error ? null : data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function toggleTrail() {
    toggleMouseTrail('toggle', 'toggle')
  }

  function toggleTrailShape() {
    setSettings((prev) => ({
      ...prev,
      mouseTrail: {
        ...prev.mouseTrail,
        shape: prev.mouseTrail.shape === "hearts" ? "stars" : "hearts",
      }
    }))
  }

  const socials = [
    { name: 'Github', logo: <Github />, link: 'https://github.com/amorProject/bubu-and-dudu'},
    { name: 'Discord', logo: <Discord />, link: 'https://discord.gg/sZ9fMqrmas'},
  ]
  
  return (
    <div className="w-[95%] md:w-[85%] lg:w-[75%] xl:w-[55%] 2xl:w-[50%] p-2 fixed self-center items-center bottom-4 left-4 bg-accent text-foreground rounded-xl grid grid-cols-3">
      <div className="flex items-center gap-x-2">
        {socials.map((social) => (
          <Link className="" href={social.link} key={social.name}>
            <Button size='icon' variant="outline" className="bg-secondary hover:bg-primary transition-colors duration-150">
              {social.logo}
            </Button>
          </Link>  
        ))}
      </div>
      <div className="flex justify-center items-center relative col-span-2 md:col-span-1">
        <Image className="absolute left-16 md:-left-4 animate-bounce hidden sm:block" src='/images/dudu.png' alt="dudu" height={64} width={50} />
        <Button variant='ghost' className="hover:bg-background/80 text-lg">
          Bubu and Dudu Time
        </Button>
        <Heart className="-top-5 absolute text-primary hidden xl:block" />
        <Image className="absolute right-16 md:-right-4 animate-bounce hidden sm:block" src='/images/bubu.png' alt="bubu" height={64} width={50} />
      </div>
      <div className="justify-end items-center gap-x-2 hidden md:flex">
        <Button size='icon' variant="outline" className="bg-secondary hover:bg-primary transition-colors duration-150" onClick={toggleTrailShape}>
          {mouseTrail.shape === "stars" ? <Sparkle /> : <Heart />}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' variant="outline" className="bg-secondary hover:bg-primary transition-colors duration-150" onClick={toggleTrail}>
              {mouseTrail.enabled ? <Star /> : <StarOff />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {mouseTrail.enabled ? 'Disable' : 'Enable'} Trail
          </TooltipContent>
        </Tooltip>
        {!user || user === null ? (
          <Button onClick={() => signIn("discord")}>
            Login
          </Button>
        ):(
          <Button onClick={() => signOut()}>
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}