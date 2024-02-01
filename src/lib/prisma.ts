import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var db: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.db ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.db = prisma