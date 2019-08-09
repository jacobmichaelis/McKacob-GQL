import "reflect-metadata"
import { createConnection, ConnectionOptions } from "typeorm"

import * as express from "express"
import { ApolloServer } from 'apollo-server-express'
import * as path from 'path'
import { IP, PORT, PATH, CONFIG } from './db-config'
import * as pgConnection from 'pg-connection-string'

// import typeDefs from './types'
// import resolvers from './resolvers'

// import { authorize } from './resolvers/user-resolver'
import { Test } from "./entity/Test";

const connectionOptions = pgConnection.parse(process.env.DATABASE_URL)

createConnection(<ConnectionOptions>{
    driver: {
        type: process.env.TYPEORM_DRIVER_TYPE,
        host: connectionOptions.host,
        port: connectionOptions.port || 5432,
        username: connectionOptions.user,
        password: connectionOptions.password,
        database: connectionOptions.database
    },
    entities: [...this.entities],
    subscribers: [...this.subscribers]
}).then(async connection => {

    // const server = new ApolloServer({
    //     typeDefs,
    //     resolvers,
    //     playground: {
    //         version: '1.7.25', //  ideally, this issue goes away soon
    //     },
    //     context: ({ req }) => {
    //         const token = req.headers.authorization || ''
    //         return authorize(token)
    //     }
    // })

    const app = express()
    // server.applyMiddleware({ app })

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../index.html'))
    })

    app.get('/db', async (req, res) => {
        res.json(await Test.find())
    })

    // Start the server
    app.listen(PORT, () => {
        console.log('App running:')
        console.log(`\nBase URL: ${CONFIG.protocol}://localhost:${PORT}`)
        if (IP) console.log(`With IPA: ${CONFIG.protocol}://${IP}:${PORT}`)
        console.log(`\nGraphQL: ${CONFIG.protocol}://localhost:${PORT}${PATH}`)
        console.log(`\nDB Example: ${CONFIG.protocol}://localhost:${PORT}/db`)
    })

}).catch(error => console.log(error))
