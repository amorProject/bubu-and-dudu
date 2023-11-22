"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Category } from "@/lib/images";
import { cn } from "@/lib/utils";

export function MultiSelect(
{selected, setSelected, categories, placeholder, count, className}
:
{selected: any, setSelected: any, categories: Category[], placeholder: string, count?: number, className?: string}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((category: Category) => {
    setSelected((prev: any) => prev.filter((s:any) => s.id !== category.id));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev: any) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          })
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = categories.filter(category => !selected.includes(category));

  return (
    <Command onKeyDown={handleKeyDown} className={cn('overflow-visible bg-transparent h-fit w-[300px]', className)}>
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap relative">
          {selected.map((category: any) => {
            return (
              <Badge className="cursor-pointer select-none" key={category.id} onClick={() => handleUnselect(category)} variant="secondary">
                {category.name}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(category);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(category)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
          <span className="absolute right-0">
            {count}
          </span>
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-60 overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
              {selectables.map((category) => {
                return (
                  <CommandItem
                    key={category.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("")
                      setSelected((prev: any) => [...prev, category])
                    }}
                    className={"cursor-pointer"}
                  >
                    {category.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
}