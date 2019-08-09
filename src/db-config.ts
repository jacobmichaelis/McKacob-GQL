import * as address from 'address'
import * as defaultGateway from 'default-gateway'

let result = defaultGateway.v4.sync()
const IP = address.ip(result && result.interface) || undefined
const PORT = process.env.PORT || 534
const PATH = '/graphql'
const CONFIG = {
  ssl: process.env.NODE_ENV == 'production',
  protocol: (process.env.NODE_ENV != 'production' ? 'http' : 'https')
}

export { IP, PORT, PATH, CONFIG }