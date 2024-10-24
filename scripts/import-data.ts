import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Chicken = {
  id: string
  name: string
  breed?: string | null
  birthDate: string
  imageUrl?: string | null
  description?: string | null
  createdAt: string
  updatedAt: string
}

type Egg = {
  id: string
  layDate: string
  weight: number
  notes?: string | null
  chickenId: string
  createdAt: string
}

type HealthLog = {
  id: string
  date: string
  weight: number
  notes?: string | null
  status: string
  chickenId: string
  createdAt: string
}

const chickens: Chicken[] = [] // Copiez les données exportées ici
const eggs: Egg[] = [] // Copiez les données exportées ici
const healthLogs: HealthLog[] = [] // Copiez les données exportées ici

async function importData(): Promise<void> {
  try {
    // Importer les poulets
    for (const chicken of chickens) {
      await prisma.chicken.create({
        data: {
          ...chicken,
          birthDate: new Date(chicken.birthDate),
          createdAt: new Date(chicken.createdAt),
          updatedAt: new Date(chicken.updatedAt)
        }
      })
    }

    // Importer les œufs
    for (const egg of eggs) {
      await prisma.egg.create({
        data: {
          ...egg,
          layDate: new Date(egg.layDate),
          createdAt: new Date(egg.createdAt)
        }
      })
    }

    // Importer les logs de santé
    for (const log of healthLogs) {
      await prisma.healthLog.create({
        data: {
          ...log,
          date: new Date(log.date),
          createdAt: new Date(log.createdAt)
        }
      })
    }

    console.log('Import terminé avec succès')
  } catch (error) {
    console.error('Erreur lors de l\'import:', error)
  } finally {
    await prisma.$disconnect()
  }
}

importData()
