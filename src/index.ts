import "reflect-metadata"
import { createConnection } from "typeorm"

import * as express from "express"
import { ApolloServer } from 'apollo-server-express'
import * as path from 'path'
import { IP, PORT, PATH, CONFIG } from './db-config'

// import typeDefs from './types'
// import resolvers from './resolvers'

// import { authorize } from './resolvers/user-resolver'
import { Test } from "./entity/Test";

createConnection().then(async connection => {

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
        console.log('App running on port', PORT)
        console.log(`${CONFIG.protocol}://localhost:${PORT}${PATH}`)
        if (IP)
        console.log(`${CONFIG.protocol}://${IP}:${PORT}${PATH}`)
    })

}).catch(error => console.log(error))
