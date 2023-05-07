import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const CompanyData: Prisma.CompanyCreateInput[] = [
  {
    name: 'STI',
    address: 'Belisario Curiel #1, D.N.',
    phone: '809-555-5555',
    email: 'info@stidatos.com',
    website: 'www.stidatos.com'
  }
]

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: 'Wilowayne De La Cruz',
    email: 'alice@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
    
]

async function main (): Promise<void> {
  console.log('Start seeding ...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')

  for (const u of CompanyData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
