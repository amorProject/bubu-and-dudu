"use client";

import { RefreshCcw } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { AvatarDropzone } from "../avatar-dropzone";
import CreatePostModal from "../modals/create-post";
import useUnverifiedPosts from "../providers/unverified";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function Navbar() {
  const { data: session } = useSession();
  const { loading: countLoading, count: unverifiedPostsCount } =
    useUnverifiedPosts();

  return (
    <div className="pt-1.5 px-1 flex items-center justify-between absolute w-screen">
      <nav className="w-fit h-fit bg-background border border-border rounded-lg px-4 py-3 flex items-center">
        <Button variant="link" size="sm" className="text-primary" asChild>
          <Link href="/">
            <h2 className="text-xl text-[#e672cd]">Bubu & Dudu Time</h2>
          </Link>
        </Button>
        <div className="flex gap-x-2">
          <CreatePostModal />
          {session && session.user && session.user.role === "ADMIN" && (
            <Button
              variant="outline"
              className="md:flex flex-col hidden"
              size="lg"
              asChild
            >
              <Link href="/verify" className="relative">
                <Badge className="absolute -top-2 -right-2 rounded-full flex justify-center items-center z-[2] bg-red-500 hover:bg- cursor-default text-white">
                  {countLoading ? (
                    <RefreshCcw size={16} className="animate-spin" />
                  ) : (
                    unverifiedPostsCount || (0 as any)
                  )}
                </Badge>
                {unverifiedPostsCount > 0 && !countLoading && (
                  <div className="absolute -top-2 -right-2 w-[30px] h-[22px] rounded-full flex justify-center items-center bg-red-500 animate-ping" />
                )}
                Verify Posts
              </Link>
            </Button>
          )}
        </div>
      </nav>

      <div className="pr-2">
        {session && session.user ? (
          <div className="flex space-x-2">
            <AvatarDropzone size="md" />
            <div className="flex flex-col items-center">
              <span className="text-sm">
                {session.user.name!.length > 10
                  ? session.user.name!.slice(0, 10) + "..."
                  : session.user.name}
              </span>
              <Button
                size="sm"
                className="h-7 text-xs"
                variant="nav-ghost"
                onClick={() => signOut()}
              >
                {" "}
                Sign Out{" "}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => signIn("discord")}
            size="lg"
            className="h-9 text-xs"
            variant="nav-outline"
          >
            {" "}
            Sign In{" "}
          </Button>
        )}
      </div>
    </div>
  );
}
