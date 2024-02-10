"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function CopyButton({ copy, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    toast.success("Copied the link to your clipboard!");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard key={copy} text={copy} onCopy={onCopy}>
      <Button
        variant="outline"
        size="icon"
        className="relative group/check h-11 w-full flex flex-col text-xs"
        disabled={disabled}
      >
        {copied ? <CopyCheck size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </CopyToClipboard>
  );
}

type CopyButtonProps = {
  copy: string;
  disabled?: boolean;
};
