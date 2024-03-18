import { Prisma, User } from '@prisma/client'

// criasse uma interface para os repositório, tipando-os. Informando-se oq eles vão pedir, e qual o retorno que vão dar.
export interface UsersRepository {
  // No caso, aqui, em um repositório onde for implementado o UsersRepository ele terá, por obrigação um método criate que recebe data e retorna uma promise.
  create(data: Prisma.UserCreateInput): Promise<User>
  // as promises retornam tipo User do prisma, pq por exemplo, se o findByEmail achar algum usuário ele terá o formato do User, do mesmo jeito que criando o usuário, como no método acima ele terá o formato User.
  findByEmail(email: string): Promise<User | null>
}
