import { app } from './app'
import { env } from './env'

// cria uma porta para comunicação com o servidor
app
  .listen({
    port: env.PORT,
    host: '0.0.0.0', // para o server poder ser lido pelo Docker
  })
  .then(() => {
    console.log('HTTP Server Running.')
  })
