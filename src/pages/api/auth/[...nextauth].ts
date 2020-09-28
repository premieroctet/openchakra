import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient } from '@prisma/client'
import Adapters from 'next-auth/adapters'

const prisma = new PrismaClient()

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler

const options = {
  providers: [
    Providers.GitHub({
      //@ts-ignore
      clientId: process.env.GITHUB_ID,
      //@ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adaptor: Adapters.Prisma.Adapter({ prisma }),
}
