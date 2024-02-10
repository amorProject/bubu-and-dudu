"use client";

import { Post } from "@/lib/types";
import { Rabbit, UserCircle } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { CopyButton } from "../copy-button";
import { UseOnModal } from "../modals/use-export";
import { useSelected } from "../providers/selected";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SimpleAvatarWrapper } from "./avatar";

export function SimpleView({ selected }: { selected: Post }) {
  const { roll, isLoading, isDisabled } = useSelected();
  const { data: session } = useSession();

  if (!selected || !selected.id) {
    return (
      <Button
        size="lg"
        variant="accent"
        onClick={roll}
        disabled={isDisabled}
        className="flex justify-center items-center"
      >
        {isLoading ? <ClipLoader size={16} color="white" /> : "Roll"}
      </Button>
    );
  }

  return (
    <Card className="max-w-[100vw] m-0 relative">
      {session &&
        session.user &&
        (selected.author.id === session.user.id ||
          session.user.role === "ADMIN") && (
          <Button className="absolute top-4 right-4" asChild>
            <Link href="/[id]/edit" as={`/${selected.id}/edit`}>
              Edit
            </Link>
          </Button>
        )}
      <CardContent>
        <CardHeader className="items-center">
          <CardTitle className="text-white text-2xl leading-snug tracking-wide">
            {selected.title}
          </CardTitle>
          <div className="overflow-x-auto overflow-y-hidden w-96 flex scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent justify-center items-center">
            {selected.categories.length >= 1 ? (
              selected.categories.map((category, idx) => (
                <Badge key={idx} variant="outline">
                  {category}
                </Badge>
              ))
            ) : (
              <h2>No Categories</h2>
            )}
          </div>
        </CardHeader>
        <div className="flex flex-col items-center justify-center">
          <div className="flex max-w-fit">
            {selected && (
              <SimpleAvatarWrapper
                images={selected.images}
                title={selected.title}
                forceRow
              />
            )}
          </div>
        </div>
        <CardFooter className="pl-0 pb-0 pt-6 flex flex-col md:grid grid-cols-4 justify-center items-end md:justify-between gap-2">
          <div className="hidden md:flex flex-col items-center justify-center col-span-1">
            {selected.author.image && (
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={selected.author.image.url}
                  alt={`${selected.author.name}'s profile picture`}
                />
                <AvatarFallback>
                  <ClipLoader size={16} color="white" />
                </AvatarFallback>
              </Avatar>
            )}
            <p className="text-center text-lg font-semibold">
              {selected.author.name}
            </p>
          </div>
          <Button
            size="lg"
            variant="accent"
            onClick={roll}
            disabled={isDisabled}
            className="flex w-full justify-center items-center col-span-2"
          >
            {isLoading ? (
              <ClipLoader size={16} color="white" />
            ) : isDisabled ? (
              <Rabbit size={24} className="animate-rotate" />
            ) : (
              "Roll"
            )}
          </Button>
          <div className="flex md:grid md:grid-cols-2 items-center justify-end gap-x-2 col-span-1 md:ml-4 w-full">
            <CopyButton
              copy={window.location.href}
              disabled={isLoading || isDisabled}
            />
            {session && session.user ? (
              <UseOnModal selected={selected} isLoading={isLoading} />
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="flex flex-col gap-x-2 w-full h-11 text-xs"
                onClick={() => signIn("discord")}
              >
                <UserCircle size={16} />
                Sign In
              </Button>
            )}
            <div className="flex md:hidden flex-col items-center justify-center -space-y-2">
              {selected.author.image && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={selected.author.image.url}
                    alt={`${selected.author.name}'s profile picture`}
                  />
                  <AvatarFallback>
                    <ClipLoader size={16} color="white" />
                  </AvatarFallback>
                </Avatar>
              )}
              <p className="text-center text-lg font-semibold">
                {selected.author.name}
              </p>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
