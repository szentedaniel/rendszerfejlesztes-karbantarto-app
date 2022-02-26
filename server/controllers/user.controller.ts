import {
  PrismaClient,
  User
} from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export interface createUserData {
  name: string,
  username: string,
  password: string,
  roleId: number,
  active: boolean
}

export interface updateUserData {
  name: any,
  username: any,
  password: any,
  roleId: any,
  active: any
}

export interface loginUserData {
  username: string,
  password: string
}

export interface returnWithStatusAndMessage {
  status: string,
  message: string
}

export const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        Role: {
          select: {
            name: true,
            id: true
          }
        },
        Task: {
          select: {
            scheduledMaintenance: {
              include: {
                category: {
                  include: {
                    Device: {
                      include: {
                        location: true
                      }
                    }
                  }
                }
              }
            },
            status: true
          },
        },
      },
      // where: {
      //   maintenanceUsers: {
      //     some: {
      //       status: {
      //         name: { notIn: ['Elutasítva', 'Befejezve']}
      //       }
      //     }
      //   }
      // }
    })
    return allUsers
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getUserById = async (id: number) => {
  try {
    const User = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        Role: {
          select: {
            name: true,
            id: true
          }
        },
        Task: {
          select: {
            scheduledMaintenance: {
              select: {
                name: true,
              }
            },
            status: true
          },
        },
      },
    })
    return User
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createUser = async (userData: createUserData): Promise<User> => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userData.password, salt)
    userData.password = hash
    const createdUser = await prisma.user.create({
      data: userData,
    })
    return createdUser


  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteUserById = async (id: number) => {
  try {
    const validUser = await prisma.user.findFirst({
      where: {
        id: id
      }
    })
    if (!validUser) return { status: 404, message: `User not found with id: ${id}` }

    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })
    return deletedUser
  } catch (error: any) {
    throw new Error(error)

  }
}

export const updateUserById = async (id: number, userData: updateUserData) => {
  try {
    let wantToBeUserData = userData

    const validUser = await prisma.user.findFirst({
      where: {
        id: id
      }
    })
    if (!validUser) return { status: 404, message: `User not found with id: ${id}` }

    if (wantToBeUserData.password) {
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(wantToBeUserData.password!, salt, async (err, hash) => {
          wantToBeUserData.password = hash

          try {
            const updatedUser = await prisma.user.update({
              where: {
                id: Number(id),
              },
              data: wantToBeUserData,
              include: {
                Role: {
                  select: {
                    name: true,
                    id: true
                  }
                },
                Task: {
                  select: {
                    scheduledMaintenance: {
                      select: {
                        name: true,

                      }
                    },
                    status: true
                  },
                },
              },
            })
            return updatedUser

          } catch (error: any) {
            throw new Error(error)

          }
        })
      })
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: wantToBeUserData,
        include: {
          Role: {
            select: {
              name: true,
              id: true
            }
          },
          Task: {
            select: {
              scheduledMaintenance: {
                select: {
                  name: true,

                }
              },
              status: true
            },
          },
        },
      })
      return updatedUser
    }

  } catch (error: any) {
    throw new Error(error)

  }
}

export const login = async (userData: loginUserData) => {
  try {
    const { password, username } = userData
    const User = await prisma.user.findFirst({
      where: {
        username: username
      },
      include: {
        Role: true
      },
    })



    if (User) {
      const success = bcrypt.compareSync(password, User!.password)
      if (success) {
        const response: any = User
        delete response.password
        return response
      }
      else return { status: 401, message: 'Wrong password' }
    } else return { status: 404, message: 'User not found or wrong username' }
  } catch (error: any) {
    throw new Error(error)
  }
}