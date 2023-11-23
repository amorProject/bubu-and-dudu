import { Category } from "@/lib/images"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { SettingsIcon } from "lucide-react";
import Cards from "./cards";
import Card from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";

interface Props {
  selected: Category[];
  setSelected: (selected: Category[]) => void;
  totalImages: { postCount: number, filteredPostCount: number };
}

export default function CategorySettings({ selected, setSelected, totalImages }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const data = await fetch('/api/category').then((res) => res.json());
      setCategories(data);
    };
    getCategories();
  }, [])

  function handleClick(category: Category) {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  }

  const isSelected = (category: Category) => selected.includes(category);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-secondary hover:bg-primary transition-colors duration-150 rounded-[4px] h-8 w-8 p-0">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <div className="flex gap-x-4">
            <DialogTitle>
              Settings
            </DialogTitle>
            <Badge className="w-fit">
              {totalImages.filteredPostCount}/{totalImages.postCount} Images
            </Badge>
          </div>
        </DialogHeader>
        <Cards className="max-w-fit flex flex-wrap">
          {categories.map((category, i) => (
            <Tooltip key={`${category.id}-${i}`}>
              <TooltipTrigger>
                <Card className={`flex justify-center items-center gap-1${isSelected(category) ? ' outline outline-primary' : ''}`} onClick={() => handleClick(category)}>
                  {category.name}
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                {category.description || 'No description.'}
              </TooltipContent>
            </Tooltip>
          ))}
        </Cards>
      </DialogContent>
    </Dialog>
  )
}