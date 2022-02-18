import { Prisma, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

export const DemoCategory = [
    {

    },
    {

    },
    {

    },
]




// async function main() {
//     console.log(`🌱  Start seeding ...\n`)
//     for (const u of DemoCategory) {
        
//         const user = await prisma.category.create({
//             data: 
//         }
//     }
// }

// main()
//     .catch((e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })