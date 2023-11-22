'use client'
import { Button } from "./ui/button";
import Link from "next/link";
import { Github } from "lucide-react"
import { Discord, Heart } from "./logos";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<string>("rose")
  const socials = [
    { name: 'Github', logo: <Github />, link: 'https://github.com/amorProject/bubu-and-dudu'},
    { name: 'Discord', logo: <Discord />, link: 'https://discord.gg/sZ9fMqrmas'},
  ]

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme')
    const initialTheme = localStorageTheme ? localStorageTheme : "rose"
    setTheme(initialTheme)
  }, [])

  const themes: string[] = ["red", "orange", "rose"]

  function handleToggleTheme() {
    setTheme((prevTheme: string) => {
      const prevThemeIndex: number = themes.findIndex((prev) => prev === prevTheme)
      return themes[(prevThemeIndex + 1) % themes.length]
    });
  }
  
  useEffect(() => {
    const currentThemeIndex: number = themes.findIndex((prev) => prev === theme)
    document.body.classList.remove(themes[(currentThemeIndex - 1 + themes.length) % themes.length]);
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme)
  }, [theme]);
  
  return (
    <div className="w-[95%] md:w-[85%] lg:w-[75%] xl:w-[55%] 2xl:w-[50%] p-2 fixed self-center items-center bottom-4 left-4 bg-accent text-foreground rounded-xl grid grid-cols-3">
      <div className="flex items-center gap-x-2">
        {socials.map((social) => (
          <Link className="" href={social.link} key={social.name}>
            <Button size='icon'>
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
      <div className="justify-end gap-x-2 hidden md:flex">
        <Button className="capitalize" onClick={handleToggleTheme}>
          {theme ? theme : 'Rose'}
        </Button>
      </div>
    </div>
  )
}