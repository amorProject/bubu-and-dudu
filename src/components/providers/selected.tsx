"use client";

import { Post } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const selectedContext = createContext<SelectedContext>({
  roll: () => {},
  isLoading: true,
  isDisabled: true,
}) as React.Context<SelectedContext>;

export function SelectedProvider({ children }: SelectedProviderContext) {
  const router = useRouter();
  const pathname = usePathname();
  const [nextRoll, setNextRoll] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  async function roll() {
    setIsLoading(true);
    setIsDisabled(true);
    if (nextRoll) router.replace(`/${nextRoll.id}`);
    setIsLoading(false);
    const res = await fetch("/api/post/roll");
    const data = await res.json();
    setNextRoll(data);
    setIsDisabled(false);
  }

  useEffect(() => {
    roll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <selectedContext.Provider value={{ roll, isLoading, isDisabled }}>
      <div hidden>
        {nextRoll &&
          nextRoll.images &&
          nextRoll.images.length > 0 &&
          nextRoll.images.map((image, index) => (
            <img key={index} src={image.url} alt={nextRoll.title} />
          ))}
      </div>
      {children}
    </selectedContext.Provider>
  );
}

export const useSelected = () => {
  return useContext(selectedContext);
};

type SelectedContext = {
  roll: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

type SelectedProviderContext = {
  children: React.ReactNode;
};
