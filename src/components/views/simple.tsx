"use client"

import { useSelected } from "../providers/selected";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UseOnModal } from "../modals/use-export";
import { Rabbit } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { CopyButton } from "../copy-button";
import { Post } from "@/lib/types";

export function SimpleView({ selected }: { selected?: Post | null }) {
  const { selected: selectedContext, roll, isLoading, isDisabled } = useSelected();
  if (!selected) {
    selected = selectedContext;
  }
  const { data: session } = useSession();

  const generateText = (title: string, id?: string) => {
    return (
      <TextGenerateEffect
        key={id}
        words={title || "Loading..."}
        className="text-center"
      />
    );
  }

  if (!selected) {
    return (
      <Button size="lg" variant="accent" onClick={roll} disabled={isDisabled} className="flex justify-center items-center">
        {isLoading ? <ClipLoader size={16} color="white" /> : "Roll"}
      </Button>
    )
  }

  return (
    <Card className="max-w-[800px] w-screen">
      <CardContent>
        <CardHeader className="items-center">
          <CardTitle>
            {generateText(selected.title, selected.id)}
          </CardTitle>
          <CardDescription>
            {selected.categories.map((category, idx) => (
              <Badge key={idx} variant="outline">
                {category.name}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center justify-center">
          <div className="flex max-w-fit">
            {selected && (
              <AnimatedTooltip item={selected} />
            )}
          </div>
          <Button size="lg" variant="accent" onClick={roll} disabled={isDisabled} className="flex justify-center items-center">
            {isLoading ? <ClipLoader size={16} color="white" /> : isDisabled ? <Rabbit size={24} className="animate-rotate" /> : "Roll"}
          </Button>
        </div>
        <CardFooter className="px-0 pb-0 pt-12 flex items-end justify-between">
          <div className="flex flex-col items-center justify-center">
            {selected.author.image && (
              <Avatar className="w-12 h-12">
                <AvatarImage src={selected.author.image.url} alt={`${selected.author.name}'s profile picture`} />
                <AvatarFallback>
                  <ClipLoader size={16} color="white" />
                </AvatarFallback>
              </Avatar>
            )}
            <p className="text-center text-lg font-semibold">
              {selected.author.name}
            </p>
          </div>
          {session && session.user ? (
            <div className="flex items-center space-x-2">
              <CopyButton copy={window.location.href} disabled={isLoading || isDisabled} />
              <UseOnModal />
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="flex gap-x-2"
              onClick={() => signIn("discord")}
            >
              <Rabbit size={28} />
              Login to Export Images
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  )
}