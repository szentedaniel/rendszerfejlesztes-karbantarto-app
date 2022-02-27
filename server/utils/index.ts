import { User } from "@prisma/client"

export function exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
): Omit<User, Key> {
    for (let key of keys) {
        delete user[key]
    }
    return user
}

export const removePasswordFromUserArray = (array: Array<User>): Array<User> => {
    const users = array.map(user => {
        exclude(user, 'password')
        return user
    })
    console.log(users);

    return users
}