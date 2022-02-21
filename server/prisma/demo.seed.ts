import {
  Prisma,
  PrismaClient,
  User,
  Category,
  Period
} from '@prisma/client'
import exp from 'constants'
import {
  create
} from 'domain'
const prisma = new PrismaClient()

export const DemoPeriod = [{
    name: 'Napi',
    days: 1
  },
  {
    name: 'Heti',
    days: 7
  },
  {
    name: 'Havi',
    days: 30
  },
  {
    name: 'Évi',
    days: 365
  },
]

export const DemoCategory = [{
    name: 'Tűz',
    normaInMinutes: 30,
    periodId: 1
  },
  {
    name: 'Biztonság',
    normaInMinutes: 60,
    periodId: 2
  },
  {
    name: 'Tűz.Tűzoltó készülék',
    normaInMinutes: 30,
    periodId: 3,
    parentId: 0
  },
  {
    name: 'Tűz.Tűzoltó készülék.CO2-Tűzoltó készülék',
    normaInMinutes: 30,
    periodId: 0,
    parentId: 0
  },
  {
    name: 'Tűz.Füstjelző',
    normaInMinutes: 50,
    periodId: 0,
    parentId: 0
  },
  {
    name: 'Tűz.Tűzoltó készülék.Víz-Tűzoltó készülék',
    normaInMinutes: 30,
    periodId: 0,
    parentId: 0
  },
  {
    name: 'Biztonság.Lézer',
    normaInMinutes: 0,
    periodId: 0,
    parentId: 0
  },
  {
    name: 'Biztonság.Kamera',
    normaInMinutes: 0,
    periodId: 0,
    parentId: 0
  }
]

export const DemoBuilding = [{
    name: 'A-Épület'
  },
  {
    name: 'B-Épület'
  },
  {
    name: 'C-Épület'
  },
  {
    name: 'D-Épület'
  },
  {
    name: 'E-Épület'
  },
  {
    name: 'F-Épület'
  },
]

export const DemoLocation = [{
    name: 'Konyha',
    buildingId: 1
  },
  {
    name: 'Kondi terem',
    buildingId: 2
  },
  {
    name: 'Iroda1',
    buildingId: 3
  },
  {
    name: 'Iroda2',
    buildingId: 3
  },
  {
    name: 'Öltöző',
    buildingId: 1
  },
]

export const DemoDevice = [{
    name: 'CO2-Tűzoltó készülék',
    description: 'CO2-t használ a tűz kioltására.',
    identifier: 'FIR3442',
    locationId: 1,
    categoryId: 0
  },
  {
    name: 'CO2-Tűzoltó készülék',
    description: 'CO2-t használ a tűz kioltására.',
    identifier: 'FIR3462',
    locationId: 1,
    categoryId: 0
  },
  {
    name: 'Füstjelző',
    description: 'Füst érzékelése esetén hangjelzést ad.',
    identifier: 'SMO4506',
    locationId: 2,
    categoryId: 0
  },
  {
    name: 'Víz-Tűzoltó készülék',
    description: 'Vízzel kioltja a tüzet, jobb esetben.',
    identifier: 'WFIR3442',
    locationId: 3,
    categoryId: 0
  },
  {
    name: 'Kamera',
    description: 'Megfigyel.',
    identifier: 'VID3442',
    locationId: 1,
    categoryId: 0
  },
  {
    name: 'Kamera',
    description: 'Megfigyel',
    identifier: 'VID3443',
    locationId: 3,
    categoryId: 0
  },
]

export const DemoMaintenance = [{
    name: 'Kamerák ellenőrzése.',
    exceptive: false,
    categoryId: 8
  },
  {
    name: 'CO2-Tűzoltó készülék csere.',
    exceptive: false,
    categoryId: 4
  },
  {
    name: 'Tárhely ellenőrzés.',
    exceptive: false,
    categoryId: 8
  },
  {
    name: 'Elem csere.',
    exceptive: false,
    categoryId: 5
  },

]

export const DemoInstruction = [{
    title: 'Kamera ellenőrzés.',
    body: 'Mutass be a kamerának. Ha jön a biztonságis és lebasz egyet, akkor működik.',
    maintenanceId: 1
  },
  {
    title: 'Kamera tárhely ellenőrzés.',
    body: 'Meghajtón jobb egér gomb, tulajdonságok, és a tárhely megtekintése onnan.',
    maintenanceId: 3
  },
  {
    title: 'Készülék csere',
    body: 'Készülék forgatása jobbra, balra. Teszt tüzelés. Ha jó, akkor vissza a helyére. Ha nem, akkor vegyél újat.',
    maintenanceId: 2
  },
  {
    title: 'Elem csere',
    body: 'Fedő eltávolítása. Elem kivétele. Új elem betétele. Fedő visszarakása.',
    maintenanceId: 4
  },
]

export const DemoQualification = [{
    name: 'Villamosmérnök'
  },
  {
    name: 'Kertész'
  },
  {
    name: 'Informatikus'
  },
  {
    name: 'Tűzbiztonsági szakértő'
  },
  {
    name: 'Titkár'
  }
]

export const DemoUserQualification = [{
    qualificationId: 1,
    userId: 2
  },
  {
    qualificationId: 3,
    userId: 2
  },
  {
    qualificationId: 2,
    userId: 1
  },
  {
    qualificationId: 5,
    userId: 3
  },
  {
    qualificationId: 4,
    userId: 4
  },

]

export const DemoMaintenanceQualification = [{
    qualificationId: 1,
    maintenanceId: 1
  },
  {
    qualificationId: 3,
    maintenanceId: 1
  },
  {
    qualificationId: 4,
    maintenanceId: 2
  },
  {
    qualificationId: 3,
    maintenanceId: 3
  },
  {
    qualificationId: 1,
    maintenanceId: 4
  },
  {
    qualificationId: 3,
    maintenanceId: 4
  }

]

export const DemoStatus = [{
    name: 'Kiosztva'
  },
  {
    name: 'Elfogadva'
  },
  {
    name: 'Elutasítva'
  },
  {
    name: 'Elkezdve'
  },
  {
    name: 'Befejezve'
  }

]

export const DemoMaintenanceUser = [{
    maintenanceId: 1,
    userId: 1,
    statusId: 1
  },
  {
    maintenanceId: 2,
    userId: 3,
    statusId: 3
  },
  {
    maintenanceId: 3,
    userId: 3,
    statusId: 2
  },
  {
    maintenanceId: 4,
    userId: 2,
    statusId: 5
  }

]

async function main() {
  console.log(`🌱  Start seeding ...\n`)
  for (const u of DemoPeriod) {
    const per = await prisma.period.create({
      data: u
    })
  }

  GenerateMissingCategoryInfromation()

  for (const u of DemoCategory) {
    if (u.name.includes('.')) {
      const prefix = u.name.substring(0, u.name.lastIndexOf('.'))
      u.name = u.name.replace(prefix + '.', '')
      console.log(u.name)
    }
    const user = await prisma.category.create({
      data: u

    })
  }

  for (const u of DemoBuilding) {
    const building = await prisma.building.create({
      data: u
    })
  }

  for (const u of DemoLocation) {
    const building = await prisma.location.create({
      data: u
    })
  }

  GenerateCategoryOfDevices()

  for (const u of DemoDevice) {
    const building = await prisma.device.create({
      data: u
    })
  }

  for (const u of DemoMaintenance) {
    const building = await prisma.maintenance.create({
      data: u
    })
  }

  for (const u of DemoInstruction) {
    const building = await prisma.instruction.create({
      data: u
    })
  }

  for (const u of DemoQualification) {
    const building = await prisma.qualification.create({
      data: u
    })
  }

  for (const u of DemoUserQualification) {
    const building = await prisma.userQualification.create({
      data: u
    })
  }

  for (const u of DemoMaintenanceQualification) {
    const building = await prisma.maintenanceQualification.create({
      data: u
    })
  }

  for (const u of DemoStatus) {
    const building = await prisma.status.create({
      data: u
    })
  }
  
  for (const u of DemoMaintenanceUser) {
    const building = await prisma.maintenanceUser.create({
      data: u
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

const GenerateMissingCategoryInfromation = () => {
  for (const u of DemoCategory) {
    if (u.name.includes('.')) {
      const prefix = u.name.substring(0, u.name.lastIndexOf('.'))
      console.log(prefix)
      for (const p of DemoCategory) {
        if (p.name == prefix) {
          u.parentId = DemoCategory.indexOf(p) + 1
          console.log('Parent found')
          break
        }
      }
    }

    if (u.periodId == 0) {
      u.periodId = DemoCategory.at(u.parentId!-1) !.periodId
    }

    if (u.normaInMinutes == 0) {
      u.normaInMinutes = DemoCategory.at(u.parentId!-1) !.normaInMinutes
    }
    console.log('parent: ' + u.parentId + ' period: ' + u.periodId)
  }
}

const GenerateCategoryOfDevices = () => {
  for (const u of DemoDevice) {
    for (const cat of DemoCategory) {
      if (u.name == cat.name) {
        u.categoryId = DemoCategory.indexOf(cat) + 1
        break
      }
    }
  }
}