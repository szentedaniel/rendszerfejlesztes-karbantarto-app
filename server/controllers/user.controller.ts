import { PrismaClient, User } from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export interface createUserData{
    name: string,
    username: string,
    password: string,
    roleId: number
}

export interface updateUserData{
    name: any,
    username: any,
    password: any,
    roleId: any,
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
      MaintenanceUser: {
        select: {
          maintenance: {
            select: {
              name: true,
              exceptive: true,
              categoryId: true,
              category: {
                select:{
                  name: true,
                  Device: {
                    select: {
                      name: true,
                      description: true,
                      identifier: true,
                      location: {
                        select: {
                          name: true,
                          building: true
                        }
                      }
                    }
                  }
                }
              },
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
      MaintenanceUser: {
        select: {
          maintenance: {
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
              MaintenanceUser: {
                select: {
                  maintenance: {
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
              MaintenanceUser: {
                select: {
                  maintenance: {
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