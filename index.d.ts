import { Prisma } from "@prisma/client";

type PrismaSession = Prisma.SessionGetPayload<{
  select: {
    id: true;
    expires: true;
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        image: {
          select: {
            url: true;
          }
        }
      }
    }
  }
}>;

type PrismaUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    image: {
      select: {
        url: true;
        key: true;
        type: true;
      }
    },
  }
}>

declare module "next-auth" {
  interface Session extends PrismaSession {}
  interface User extends PrismaUser {}
}

declare module "@auth/prisma-adapter" {
  interface AdapterUser extends PrismaUser {}
  interface User extends PrismaUser {}
}