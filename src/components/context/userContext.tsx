import { Profile } from '@/lib/auth';
import React, { createContext, useEffect, useState } from 'react';

interface UserContextProps {
  user: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<Profile | null>>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

interface ProviderProps {
  children?: React.ReactNode;
}

export function UserProvider({children}: ProviderProps) {
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
