"use client";

import { SessionProvider } from "next-auth/react";
import * as React from "react";
import { Triangle } from "react-loader-spinner";
import { SelectedProvider } from "./providers/selected";
import { UnverifiedPostsProvider } from "./providers/unverified";
import { UserProvider } from "./providers/user";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <UserProvider>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Triangle color="#4F46E5" height={100} width={100} />
            </div>
          }
        >
          <SelectedProvider>
            <UnverifiedPostsProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </UnverifiedPostsProvider>
          </SelectedProvider>
        </React.Suspense>
      </UserProvider>
    </SessionProvider>
  );
}

type ProvidersProps = {
  children: React.ReactNode;
};
