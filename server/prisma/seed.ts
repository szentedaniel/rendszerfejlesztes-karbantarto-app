import { Prisma, PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()


const userData = [
    {
        name: 'Admin',
        username: 'admin',
        password: 'admin',
        Role: {
            create: {
                name: 'Admin'
            }   
        }
    },
    {
        name: 'Eszközfelelős',
        username: 'eszkozfelelos',
        password: 'jelszo',
        Role: {
            create: {
                name: 'Eszközfelelős'
            }   
        }
    },
    {
        name: 'Operátor',
        username: 'oprator',
        password: 'jelszo',
        Role: {
            create: {
                name: 'Operátor'
            }   
        }
    },
    {
        name: 'Karbantartó',
        username: 'karbantarto',
        password: 'jelszo',
        Role: {
            create: {
                name: 'Karbantartó'
            }   
        }
    },
]

async function main() {
    console.log(`🌱  Start seeding ...\n`)
    for (const u of userData) {
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(u.password, salt, async (err, hash) => {
                u.password = hash
                const user = await prisma.user.create({
                    data: u,
                })
                console.log(`👨  Created user with id: ${user.id}`)
            })
    })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })