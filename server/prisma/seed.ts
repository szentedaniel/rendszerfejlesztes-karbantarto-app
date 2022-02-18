import { Prisma, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()



const userData = [
    {
        name: 'Admin',
        username: 'admin',
        password: 'admin',
        UserRole: {
            create: {
                role: {
                    create: {
                        name: 'Admin'
                    }
                }
            }   
        }
    },
]

async function main() {
    console.log(`🌱 🌱 🌱 🌱 🌱 🌱 🌱 🌱 `)
    console.log(`🌱  Start seeding ...\n`)
    for (const u of userData) {
    const user = await prisma.user.create({
        data: u,
    })
    console.log(`👨  Created user with id: ${user.id}`)
    }
    console.log(`\n🌱  Seeding finished.`)
    console.log(`🌱 🌱 🌱 🌱 🌱 🌱 🌱 🌱 `)

}

main()
    .catch((e) => {
    console.error(e)
    process.exit(1)
    })
    .finally(async () => {
    await prisma.$disconnect()
    })