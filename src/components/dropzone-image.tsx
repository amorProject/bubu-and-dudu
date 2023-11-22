import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "./ui/button"

export default function Image({image, index, handleDelete}:{image: File, index: number, handleDelete: (index: number) => void}) {
  return (
    <ContextMenu modal>
      <ContextMenuTrigger>
        <ImageTrigger image={image} index={index} handleDelete={handleDelete} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>
          {image.name}
        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Preview
          </ContextMenuItem>
          <ContextMenuItem>
            Share
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem asChild>
            <Button variant="destructive" className="w-full h-fit" onClick={() => handleDelete(index)}>
              Remove
            </Button>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function ImageTrigger({image, index, handleDelete}:{image: File, index: number, handleDelete: (index: number) => void}) {
  return (
    <img
      onClick={() => handleDelete(index)}
      key={index}
      src={URL.createObjectURL(image)}
      alt={`Selected ${index + 1}`}
      className="max-w-sm h-16"
    />
  )
}