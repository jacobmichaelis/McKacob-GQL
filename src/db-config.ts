import * as address from 'address'
import * as defaultGateway from 'default-gateway'

let result = defaultGateway.v4.sync()
let env = process.env.NODE_ENV
const IP = address.ip(result && result.interface) || undefined
const PORT = process.env.PORT || 534
const PATH = '/graphql'
const SECRET = process.env.MCKACOB_SECRET
const CONFIG = {
  env: env,
  ssl: env == 'production',
  protocol: process.env.DB_PROTOCOL || 'http',
  connectionConfig: {
    type: process.env.DB_ADAPTER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: env == 'production',
    synchronize: true,
    logging: false,
    entities: [
      process.env.DB_ENTITY_DIR
    ],
    migrations: [
      process.env.DB_MIGRATION_DIR
    ],
    subscribers: [
      process.env.DB_SUBSCRIBER_DIR
    ],
    cli: {
      entitiesDir: 'build/entity',
      migrationsDir: 'build/migration',
      subscribersDir: 'build/subscriber'
    }
  },
}
const CONNECTION_CALLBACK = () => {
  console.log('App running:')
  console.log(`\nBase URL: ${CONFIG.protocol}://localhost:${PORT}`)
  if (IP) console.log(`With IPA: ${CONFIG.protocol}://${IP}:${PORT}`)
  console.log(`\nGraphQL: ${CONFIG.protocol}://localhost:${PORT}${PATH}`)
  console.log(`\nDB Example: ${CONFIG.protocol}://localhost:${PORT}/db`)
}

export { IP, PORT, PATH, SECRET, CONFIG, CONNECTION_CALLBACK }