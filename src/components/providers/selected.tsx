"use client"

import { Post } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const selectedContext = createContext<SelectedContext>({
  selected: null,
  setSelected: () => {},
  roll: () => {},
  isLoading: true,
  isDisabled: true,
}) as React.Context<SelectedContext>;

export function SelectedProvider({ children }: SelectedProviderContext) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rollCount, setRollCount] = useState(0);
  const [selected, setSelected] = useState<Post | null>(null);
  const [nextRoll, setNextRoll] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const id = searchParams.get("");

  async function roll() {
    setIsLoading(true);
    setIsDisabled(true);

    if (id && rollCount === 0) {
      const res = await fetch(`/api/post/${id}`);
      const data = await res.json();
      setSelected(data);
      setIsLoading(false);
      setIsDisabled(false);
      setRollCount(rollCount + 1);
      return;
    }

    if (nextRoll) {
      setSelected(nextRoll);
      router.replace(`?=${nextRoll.id}`)
      setIsLoading(false);
      const res = await fetch("/api/post/roll");
      const data = await res.json();
      setNextRoll(data);
    } else {
      const res = await fetch("/api/post/roll?firstLoad=true");
      const data = await res.json();
      setSelected(data.post);
      router.replace(`?=${data.post.id}`)
      setIsLoading(false);
      setNextRoll(data.preload);
    }
    setIsDisabled(false);
  }

  useEffect(() => {
    roll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <selectedContext.Provider value={{ selected, setSelected, roll, isLoading, isDisabled }}>
      <div hidden>
        {nextRoll && nextRoll.images.map((image, index) => (
          <img key={index} src={image.url} alt={nextRoll.title} />
        ))}
      </div>
      {children}
    </selectedContext.Provider>
  )
}

export const useSelected = () => {
  return useContext(selectedContext);
}

type SelectedContext = {
  selected: Post | null,
  setSelected: (selected: Post) => void,
  roll: () => void,
  isLoading: boolean,
  isDisabled: boolean,
}

type SelectedProviderContext = {
  children: React.ReactNode
}