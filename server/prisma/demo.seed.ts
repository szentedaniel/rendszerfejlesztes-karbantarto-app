import {
  Prisma,
  PrismaClient,
  User,
  Category,
  Period,
  ScheduledMaintenance,
  Building,
  Location,
  Device,
  Priority,
  Instruction,
  Qualification,
  UserQualification,
  ScheduledMaintenanceQualification,
  Status,
  Task,
  SpecialMaintenance,
  SpecialMaintenanceQualification
} from '@prisma/client'
const prisma = new PrismaClient()

const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7 * 1);

const oneWeekBackFromNow = new Date();
oneWeekBackFromNow.setDate(oneWeekBackFromNow.getDate() - 7 * 1);

const back37FromNow = new Date();
back37FromNow.setDate(back37FromNow.getDate() - 37 * 1);

interface TaskWithoutDefaults {
  id: number;
  scheduledMaintenanceId: number | null;
  specialMaintenanceId: number | null;
  userId: number;
  description: string | null;
  acceptedAt: Date | null;
  declinedAt: Date | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  statusId: number;
}

export const DemoPriority: Priority[] = [{
  id: 1,
  name: 'Sürgős',
  priority: 2
},
{
  id: 2,
  name: 'Normál',
  priority: 3
},
{
  id: 3,
  name: 'Kevésbé sürgős',
  priority: 4
},
{
  id: 4,
  name: 'Ütemezett',
  priority: 4
},
]


export const DemoPeriod: Period[] = [{
  id: 1,
  name: 'Heti',
  periodInDays: 1
},
{
  id: 2,
  name: 'Havi',
  periodInDays: 7
},
{
  id: 3,
  name: 'Negyedéves',
  periodInDays: 30
},
{
  id: 4,
  name: 'Féléves',
  periodInDays: 182
},
{
  id: 5,
  name: 'Éves',
  periodInDays: 365
},
]

export const DemoCategory: Category[] = [{
  id: 1,
  name: 'Nincs',
  parentId: null
},
{
  id: 2,
  name: 'Tűz',
  parentId: null
},
{
  id: 3,
  name: 'Biztonság',
  parentId: null
},
{
  id: 4,
  name: 'Tűzoltó készülék',
  parentId: 2
},
{
  id: 5,
  name: 'CO2-Tűzoltó készülék',
  parentId: 4
},
{
  id: 6,
  name: 'Tűz.Füstjelző',
  parentId: 2
},
{
  id: 7,
  name: 'Víz-Tűzoltó készülék',
  parentId: 4
},
{
  id: 8,
  name: 'Lézer',
  parentId: 3
},
{
  id: 9,
  name: 'Kamera',
  parentId: 3
}
]

export const DemoBuilding: Building[] = [{
  id: 1,
  name: 'A-Épület'
},
{
  id: 2,
  name: 'B-Épület'
},
{
  id: 3,
  name: 'C-Épület'
},
{
  id: 4,
  name: 'D-Épület'
},
{
  id: 5,
  name: 'E-Épület'
},
{
  id: 6,
  name: 'F-Épület'
},
]

export const DemoLocation: Location[] = [{
  id: 1,
  name: 'Konyha',
  buildingId: 1
},
{
  id: 2,
  name: 'Kondi terem',
  buildingId: 2
},
{
  id: 3,
  name: 'Iroda1',
  buildingId: 3
},
{
  id: 4,
  name: 'Iroda2',
  buildingId: 3
},
{
  id: 5,
  name: 'Öltöző',
  buildingId: 1
},
]

export const DemoDevice: Device[] = [{
  id: 1,
  name: 'CO2-Tűzoltó készülék',
  description: 'CO2-t használ a tűz kioltására.',
  identifier: 'FIR3442',
  locationId: 1,
  categoryId: 5
},
{
  id: 2,
  name: 'CO2-Tűzoltó készülék',
  description: 'CO2-t használ a tűz kioltására.',
  identifier: 'FIR3462',
  locationId: 1,
  categoryId: 5
},
{
  id: 3,
  name: 'Füstjelző',
  description: 'Füst érzékelése esetén hangjelzést ad.',
  identifier: 'SMO4506',
  locationId: 2,
  categoryId: 6
},
{
  id: 4,
  name: 'Víz-Tűzoltó készülék',
  description: 'Vízzel kioltja a tüzet, jobb esetben.',
  identifier: 'WFIR3442',
  locationId: 3,
  categoryId: 7
},
{
  id: 5,
  name: 'Kamera',
  description: 'Megfigyel.',
  identifier: 'VID3442',
  locationId: 1,
  categoryId: 9
},
{
  id: 6,
  name: 'Kamera',
  description: 'Megfigyel',
  identifier: 'VID3443',
  locationId: 3,
  categoryId: 9
},
]


export const DemoInstruction: Instruction[] = [{
  id: 1,
  title: 'Kamera ellenőrzés.',
  body: 'Mutass be a kamerának. Ha jön a biztonságis és lebasz egyet, akkor működik.',
  scheduledMaintenanceId: 1,
  specialMaintenanceId: null
},
{
  id: 2,
  title: 'Készülék csere',
  body: 'Készülék forgatása jobbra, balra. Teszt tüzelés. Ha jó, akkor vissza a helyére. Ha nem, akkor vegyél újat.',
  scheduledMaintenanceId: 2,
  specialMaintenanceId: null
},
{
  id: 3,
  title: 'Kamera tárhely ellenőrzés.',
  body: 'Meghajtón jobb egér gomb, tulajdonságok, és a tárhely megtekintése onnan.',
  scheduledMaintenanceId: 3,
  specialMaintenanceId: null
},
{
  id: 4,
  title: 'Elem csere',
  body: 'Fedő eltávolítása. Elem kivétele. Új elem betétele. Fedő visszarakása.',
  scheduledMaintenanceId: 4,
  specialMaintenanceId: null
},
]

export const DemoQualification: Qualification[] = [{
  id: 1,
  name: 'Villamosmérnök'
},
{
  id: 2,
  name: 'Műszerész'
},
{
  id: 3,
  name: 'Informatikus'
},
{
  id: 4,
  name: 'Tűzbiztonsági szakértő'
},
{
  id: 5,
  name: 'Titkár'
}
]

export const DemoUserQualification: UserQualification[] = [{
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

export const DemoScheduledMaintenanceQualification: ScheduledMaintenanceQualification[] = [{
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

export const DemoSpecialMaintenanceQualification: SpecialMaintenanceQualification[] = [
  {
    qualificationId: 4,
    maintenanceId: 1
  }
]

export const DemoStatus: Status[] = [{
  id: 1,
  name: 'Kiosztva'
},
{
  id: 2,
  name: 'Elfogadva'
},
{
  id: 3,
  name: 'Elutasítva'
},
{
  id: 4,
  name: 'Elkezdve'
},
{
  id: 5,
  name: 'Befejezve'
},
{
  id: 6,
  name: 'Kiosztatlan'
}

]

export const DemoTask: Task[] = [{
  id: 1,
  specialMaintenanceId: null,
  userId: 1,
  description: null,
  due: oneWeekFromNow,
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  finishedAt: null,
  scheduledMaintenanceId: 1,
  statusId: 1,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3

},
{
  id: 2,
  specialMaintenanceId: null,
  description: null,
  due: oneWeekFromNow,
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  finishedAt: null,
  scheduledMaintenanceId: 2,
  userId: 3,
  statusId: 3,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3
},
{
  id: 3,
  specialMaintenanceId: null,
  description: null,
  due: oneWeekFromNow,
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  finishedAt: null,
  scheduledMaintenanceId: 3,
  userId: 3,
  statusId: 1,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3
},
{
  id: 4,
  specialMaintenanceId: null,
  description: null,
  due: oneWeekBackFromNow,
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  scheduledMaintenanceId: 4,
  userId: 2,
  statusId: 5,
  finishedAt: new Date('2021-02-24T18:17:29.558Z'),
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3
},
{
  id: 5,
  specialMaintenanceId: null,
  description: null,
  due: new Date(Date.now()),
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  finishedAt: null,
  scheduledMaintenanceId: 4,
  userId: 4,
  statusId: 3,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3
},
{
  id: 6,
  specialMaintenanceId: 1,
  description: null,
  due: oneWeekFromNow,
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  finishedAt: null,
  scheduledMaintenanceId: null,
  userId: 4,
  statusId: 3,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3
},
{
  id: 7,
  specialMaintenanceId: null,
  description: null,
  due: back37FromNow,
  acceptedAt: null,
  declinedAt: null,
  startedAt: null,
  scheduledMaintenanceId: 4,
  userId: 2,
  statusId: 5,
  finishedAt: new Date('2021-02-24T18:17:29.558Z'),
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  createdByUserId: 3
}

]

export const DemoScheduledMaintenance: ScheduledMaintenance[] = [{
  id: 1,
  name: 'Kamerák ellenőrzése.',
  normaInMinutes: 60 * 3,
  lastMaintenance: null,
  periodId: 2,
  categoryId: 9,
  priorityId: 4
},
{
  id: 2,
  name: 'CO2-Tűzoltó készülék csere.',
  normaInMinutes: 30,
  lastMaintenance: null,
  periodId: 3,
  categoryId: 4,
  priorityId: 4
},
{
  id: 3,
  name: 'Lézer ellenőrzés.',
  categoryId: 8,
  normaInMinutes: 30,
  lastMaintenance: null,
  periodId: 3,
  priorityId: 4
},
{
  id: 4,
  name: 'Elem csere.',
  categoryId: 5,
  lastMaintenance: null,
  normaInMinutes: 30,
  periodId: 3,
  priorityId: 4
},
{
  id: 5,
  name: 'Olyan Maintenance ami a TŰZÉÉ',
  categoryId: 2,
  lastMaintenance: null,
  normaInMinutes: 30,
  periodId: 3,
  priorityId: 4
},
]

export const DemoSpecialMaintenance: SpecialMaintenance[] = [
  {
    id: 1,
    name: 'Elem csere',
    description: '...',
    normaInMinutes: 5,
    malfunctionDate: new Date(Date.now()),
    deviceId: 3,
    priorityId: 3
  },
  {
    id: 2,
    name: 'Készülék csere',
    description: '...',
    normaInMinutes: 15,
    malfunctionDate: new Date(Date.now()),
    deviceId: 1,
    priorityId: 1
  }
]


async function main() {
  console.log(`🌱  Start seeding ...\n`)

  for (const u of DemoPeriod) {
    const per = await prisma.period.create({
      data: u
    })
  }

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

  for (const u of DemoDevice) {
    const building = await prisma.device.create({
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



  for (const u of DemoStatus) {
    const building = await prisma.status.create({
      data: u
    })
  }

  for (const u of DemoPriority) {
    const building = await prisma.priority.create({
      data: u
    })
  }




  for (const u of DemoScheduledMaintenance) {
    const building = await prisma.scheduledMaintenance.create({
      data: u
    })
  }

  for (const u of DemoSpecialMaintenance) {
    const building = await prisma.specialMaintenance.create({
      data: u
    })
  }

  for (const u of DemoInstruction) {
    const building = await prisma.instruction.create({
      data: u
    })
  }

  for (const u of DemoScheduledMaintenanceQualification) {
    const building = await prisma.scheduledMaintenanceQualification.create({
      data: u
    })
  }

  for (const u of DemoSpecialMaintenanceQualification) {
    const building = await prisma.specialMaintenanceQualification.create({
      data: u
    })
  }

  for (const u of DemoTask) {
    const building = await prisma.task.create({
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

