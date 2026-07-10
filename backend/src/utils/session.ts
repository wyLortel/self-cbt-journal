import { crypto } from 'node:crypto'
import { prisma } from './prisma'

export const createSession = async (userId: string) => {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return { token, expiresAt: expiresAt.toISOString() }
}
