import { PrismaClient } from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

interface createUserData{
  name: string,
  username: string,
  password: string,
  roleId: number
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
      maintenanceUsers: {
        select: {
          maintenance: {
            select: {
              name: true,
              exceptive: true,
              categoryId: true,
              category: {
                select:{
                  name: true,
                  devices: {
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
              instructions: true,

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
    throw new Error(error);
  }
}

export const getUserById = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
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
      maintenanceUsers: {
        select: {
          maintenance: {
            select: {
              name: true,
              instructions: true,

            }
          },
          status: true
        },
      },
      },
    })
    res.json(User)
  } catch (error) {
    next(error)    
  }
}

export const createUser = async (req: express.Request, res: express.Response, next: any) => {
    try {
      let userData: createUserData = req.body

      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(userData.password, salt, async (err, hash) => {
          userData.password = hash

          const createdUser = await prisma.user.create({ 
            data: userData,
          })
          res.json(createdUser)
        })
      })
      
  } catch (error) {
    next(error)    
  }
}

export const deleteUserById = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(deletedUser)
  } catch (error) {
    next(error)    
  }
}

export const updateUserById = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params

    let wantToBeUserData = req.body

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
              maintenanceUsers: {
                select: {
                  maintenance: {
                    select: {
                      name: true,
                      instructions: true,

                    }
                  },
                  status: true
                },
              },
              },
            })
            res.json(updatedUser)
            
          } catch (error) {
            next(error)
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
              maintenanceUsers: {
                select: {
                  maintenance: {
                    select: {
                      name: true,
                      instructions: true,

                    }
                  },
                  status: true
                },
              },
            },
          })
          res.json(updatedUser)
    }
    
  } catch (error) {
    next(error)    
  }
}