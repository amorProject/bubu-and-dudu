"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export default function RedirectPage() {
  const router = useRouter()

  return (
    <Button className="rounded-[4px] h-8 font-arial uppercase font-bold" onClick={() => router.push('/generate')}>
      Generate
    </Button>
  )
}