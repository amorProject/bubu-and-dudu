"use client"

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from './ui/button';
import { Copy, CopyCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CopyButton({ copy, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    toast.success('Copied the link to your clipboard!')
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <CopyToClipboard key={copy} text={copy} onCopy={onCopy}>
      <Button variant="outline" size="icon" className='relative group/check' disabled={disabled}>
        {copied ? (
          <CopyCheck size={16} />
        ) : (
          <Copy size={16} />
        )}
      </Button>
    </CopyToClipboard>
  )
}

type CopyButtonProps = {
  copy: string;
  disabled?: boolean;
}