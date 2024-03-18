export class InvalidCredentialsError extends Error {
  constructor() {
    // na classe Error o constructor recebe uma mensagem, então como estamos extendendo Erro para cá, podemos através do super o usar o constructor de lá.
    super('Invalid credentials.')
  }
}
