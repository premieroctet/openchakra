import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { prisma } from '../../../utils/prisma'

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),
}

const authHandler: NextApiHandler = async (req, res) => {
  try {
    await NextAuth(req, res, options)
  } finally {
    prisma.$disconnect()
  }
}

export default authHandler
