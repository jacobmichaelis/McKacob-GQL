import * as address from 'address'
import * as defaultGateway from 'default-gateway'

let result = defaultGateway.v4.sync()
let env = process.env.NODE_ENV
const IP = address.ip(result && result.interface) || undefined
const PORT = process.env.PORT || 534
const PATH = '/graphql'
const CONFIG = {
  env: env,
  ssl: env == 'production',
  protocol: (env != 'production' ? 'http' : 'https'),
  connectionConfig: (env == 'production' ? {
    type: "postgres",
    host: 'ec2-54-204-35-248.compute-1.amazonaws.com',
    port: 5432,
    username: 'bqglturyuoehjn',
    password: '29addc9e37bbc393894ec065e1dbe2753b267a73af5bd239a00f5d6935486953',
    database: "d27f76ir5cn5cg",
    ssl: env == 'production',
    synchronize: true,
    logging: false,
    entities: [
      "src/entity/**/*.ts"
    ],
    migrations: [
      "src/migration/**/*.ts"
    ],
    subscribers: [
      "src/subscriber/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "supermelons",
    password: "yomama",
    database: "supermelons",
    synchronize: true,
    logging: false,
    entities: [
      "src/entity/**/*.ts"
    ],
    migrations: [
      "src/migration/**/*.ts"
    ],
    subscribers: [
      "src/subscriber/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }),
}

export { IP, PORT, PATH, CONFIG }