"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { UploadCloud } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { generateClientDropzoneAccept } from "uploadthing/client";
import useUser from "./providers/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AvatarDropzone({ size = "lg" }: AvatarDropzoneProps) {
  const { user, updateImage } = useUser();
  const sizeClasses = {
    lg: "h-16 w-16",
    md: "h-12 w-12",
    sm: "h-8 w-8",
  };
  const sizeClass = sizeClasses[size];
  const { data: session, status, update } = useSession();
  const [isUploading, setIsUploading] = useState(false);

  const [isOwner, setIsOwner] = useState(user && session?.user?.id === user.id);

  useEffect(() => {
    if (!session || !session.user || !user) return;
    setIsOwner(session?.user.id === user.id);
  }, [session, user]);

  const { startUpload } = useUploadThing("avatarUploader", {
    onBeforeUploadBegin: (files) => {
      setIsUploading(true);
      toast.loading("Uploading your avatar..", {
        id: "avatar-uploading",
      });
      return files;
    },
    onClientUploadComplete: (data) => {
      if (!data?.[0]) return;
      toast.success("Successfully updated your avatar!", {
        id: "avatar-uploading",
      });
      updateImage(data[0].url);
      setIsUploading(false);
      update();
    },
    onUploadError: (err) => {
      toast.error(err.message, {
        id: "avatar-uploading",
      });
      setIsUploading(false);
      if (user) updateImage(user.image?.url!);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      void startUpload(acceptedFiles);
      // setImg(URL.createObjectURL(acceptedFiles[0]!));
    },
    [startUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept([
      "image/png",
      "image/jpeg",
      "image/gif",
    ]),
  });

  if (!user)
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-border bg-background/50 p-1",
          sizeClass
        )}
      >
        <Avatar className="w-full h-full">
          <AvatarImage
            src="https://placewaifu.com/image/200"
            alt="Avatar placeholder"
          />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </div>
    );

  if (status === "unauthenticated") return null;
  if (user.id !== session?.user?.id)
    return (
      <Avatar className={sizeClass}>
        <AvatarImage src={(user.image as any).url} alt={user.name!} />
        <AvatarFallback>{user.name ? user.name[0] : "?"}</AvatarFallback>
      </Avatar>
    );

  return (
    <div
      {...(isOwner ? getRootProps() : {})}
      className={cn(
        "flex flex-col items-center justify-center gap-y-1 rounded-full border border-border bg-background/50",
        !user.image && isOwner && "border-dashed",
        isOwner && "cursor-pointer",
        user.image && "border-0 border-transparent bg-transparent",
        sizeClass
      )}
    >
      {user.image &&
        (isUploading ? (
          <div
            className={cn(
              "relative overflow-hidden rounded-full pointer-events-none",
              sizeClass
            )}
          >
            <Avatar className={sizeClass}>
              <AvatarImage src={user.image?.url!} alt={user.name!} />
              <AvatarFallback>{user.name!.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-full">
              <ClipLoader color="white" size={24} />
            </div>
          </div>
        ) : isOwner ? (
          <div
            className={cn(
              "relative overflow-hidden rounded-full group",
              sizeClass
            )}
          >
            <Avatar className={sizeClass}>
              <AvatarImage src={user.image?.url!} alt={user.name!} />
              <AvatarFallback>{user.name!.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 group-hover:flex items-center justify-center bg-black/25 rounded-full hidden ">
              <UploadCloud color="white" size={24} />
            </div>
          </div>
        ) : (
          <Avatar className={sizeClass}>
            <AvatarImage src={user.image?.url!} alt={user.name!} />
            <AvatarFallback>{user.name!.slice(0, 2)}</AvatarFallback>
          </Avatar>
        ))}

      {isOwner && !user.image && (
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
      )}

      {isOwner && <input {...getInputProps()} />}
    </div>
  );
}

type AvatarDropzoneProps = {
  size?: "lg" | "md" | "sm";
};
