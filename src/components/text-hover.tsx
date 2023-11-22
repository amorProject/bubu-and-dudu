import { ReactNode, useState } from "react"

export default function TextHover({children, hover}:{children: ReactNode, hover: string}) {
  const [hovered, setHovered] = useState<boolean>(false)
  return (
    <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="hover:text-primary transition-all duration-200">
      {hovered ? hover : children}
    </span> 
  )
}