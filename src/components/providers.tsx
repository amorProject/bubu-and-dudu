import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from "next-auth/react";
import { UserProvider } from '@/components/context/userContext'
import { SettingsProvider } from '@/components/context/settingsContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SessionProvider>
        <UserProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </UserProvider>
      </SessionProvider>
    </TooltipProvider>
  )
}