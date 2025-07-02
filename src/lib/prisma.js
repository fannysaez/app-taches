import { PrismaClient } from '@prisma/client'

// Configuration pour éviter de créer trop de connexions en développement
const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}