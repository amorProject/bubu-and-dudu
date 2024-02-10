import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export type UserType = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    role: true;
    image: {
      select: {
        url: true;
      };
    };
  };
}>;

const userContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  updateImage: () => {},
});

type UserContext = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  updateImage: (url: string) => void;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!session || !session.user) return setUser(null);

    const { id, name, email, role, image } = session.user as any;
    setUser({ id, name, email, role, image });
  }, [session]);

  function updateImage(url: string) {
    if (!user) return;
    setUser({ ...user, image: { url } });
  }

  return (
    <userContext.Provider value={{ user, setUser, updateImage }}>
      {children}
    </userContext.Provider>
  );
}

export default function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
