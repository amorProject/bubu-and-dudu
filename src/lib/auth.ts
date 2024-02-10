import db from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";

// @ts-ignore
const Adapter: typeof PrismaAdapter = () => {
  return {
    createSession: (session) => {
      return db.session.create({
        data: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires
        }
      })
    },
    createUser: (user) => {
      return db.user.create({
        data: {
          id: user.id,
          name: user.name as string,
          email: user.email,
          image: {
            create: {
              url: user.image as string,
              type: "DEFAULT"
            }
          },
        }
      })
    },
    deleteSession: (sessionToken) => {
      return db.session.delete({
        where: {
          sessionToken
        }
      })
    },
    deleteUser: (userId) => {
      return db.user.delete({
        where: {
          id: userId
        }
      })
    },
    getSessionAndUser: async (sessionToken) => {
      const sessionAndUser = await db.session.findUnique({
        where: {
          sessionToken
        },
        select: {
          expires: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              image: {
                select: {
                  url: true,
                  key: true,
                  type: true
                }
              }
            }
          }
        }
      })

      if (!sessionAndUser) return null;

      const { user, ...session } = sessionAndUser;
      return { user: {
        ...user,
        currentSessionId: session.id,
      }, session };
    },
    getUser: (id) => {
      return db.user.findUnique({
        where: {
          id
        }
      })
    },
    getUserByAccount: ({ provider, providerAccountId: id }) => {
      if (provider !== "discord") return null;
      
      return db.user.findFirst({
        where: {
          id
        }
      })
    },
    getUserByEmail: (email) => {
      return db.user.findFirst({
        where: {
          email
        }
      })
    },
    updateSession: (session) => {
      return db.session.update({
        where: {
          sessionToken: session.sessionToken
        },
        data: {
          expires: session.expires
        }
      })
    },
    updateUser: (user) => {
      return db.user.update({
        where: {
          id: user.id
        },
        data: {
          name: user.name as string,
          email: user.email,
        }
      })
    },
    linkAccount: () => {
      return null;
    },
    unlinkAccount: () => {
      return null;
    },
    createVerificationToken: () => {
      return null;
    },
    useVerificationToken: () => {
      return null;
    }
  }
}

export const authOptions = {
  providers: [ Discord ],
  adapter: Adapter(db) as any,
  callbacks: {
    session: (params) => {
      // @ts-ignore
      const { user: { currentSessionId, ...user } } = params;
      return Promise.resolve({
        id: currentSessionId,
        expires: params.session.expires,
        user: user,
      })
    }
  }
} satisfies NextAuthConfig;

export const { auth } = NextAuth(authOptions);