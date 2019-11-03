import 'reflect-metadata'

import * as dotenv from 'dotenv'
dotenv.config()

import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import * as path from 'path'
import { PORT, CONFIG, CONNECTION_CALLBACK } from './db-config'
import { setupDB } from './db-service'

import typeDefs from './types'
import resolvers from './resolvers'

import { authorize } from './resolvers/user-resolver'
import { Test } from './entity/Test'

createConnection(CONFIG.connectionConfig as PostgresConnectionOptions).then(async connection => {
    setupDB()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: {
            version: '1.7.25', // ideally, this issue goes away soon
        },
        context: ({ req }) => {
            return {
                authorized: true,
                role: {
                    level: 9001
                }
            }
            // const token = req.headers.authorization || ''
            // return authorize(token)
        }
    })

    const app = express()
    server.applyMiddleware({ app })

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../index.html'))
    })

    app.get('/db', async (req, res) => {
        res.json(await Test.find())
    })

    app.listen(PORT, CONNECTION_CALLBACK)

}).catch(console.error)
