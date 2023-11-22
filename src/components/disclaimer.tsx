import { Button } from "./ui/button";

export default function Disclaimer() {
  return (
    <div className="absolute top-2 right-2 flex items-center">
      <span className="mr-1 lg:mr-0">
        We are not affiliated
      </span>
      <span className="hidden lg:flex">
        , associated, authorized, endorsed by, or in any way officially 
        <span className="mx-1">
          connected
        </span>
      </span> 
      <span className="mr-1">
        with
      </span>
      <a href='https://www.youtube.com/channel/UCo-ElOvpzkht6cHr2jFRGow' target="_blank">
        <Button variant='link' className="p-0 text-md my-0 py-0 h-4">
          Bubuanddudu
        </Button>
      </a>
    </div>  
  )
}