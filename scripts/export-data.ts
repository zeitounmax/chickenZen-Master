import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function exportData(): Promise<void> {
  try {
    // Exporter les poulets
    const chickens = await prisma.chicken.findMany()
    process.stdout.write('Chickens: ' + JSON.stringify(chickens, null, 2) + '\n')

    // Exporter les œufs
    const eggs = await prisma.egg.findMany()
    process.stdout.write('Eggs: ' + JSON.stringify(eggs, null, 2) + '\n')

    // Exporter les logs de santé
    const healthLogs = await prisma.healthLog.findMany()
    process.stdout.write('HealthLogs: ' + JSON.stringify(healthLogs, null, 2) + '\n')

  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
  } finally {
    await prisma.$disconnect()
  }
}

exportData()
