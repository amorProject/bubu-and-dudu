import { Profile } from '@/lib/auth';
import React, { createContext, useContext, useState } from 'react';

interface UserContextProps {
  user: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};