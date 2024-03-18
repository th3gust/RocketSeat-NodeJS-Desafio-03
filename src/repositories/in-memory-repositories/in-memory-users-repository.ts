import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UsersRepository } from '../interfaces/UsersRepository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  // criar um novo usuário
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
  } | null> {
    const user = this.items.find((item) => item.email === email)

    // a condicional de retornar nulo é feita pq na interface dissemos que ou se acha o usuário o valor de retorno é nulo.
    if (!user) {
      return null
    }

    return user
  }
}
