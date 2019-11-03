import { gql } from 'apollo-server-express'

const userType = gql`
  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    phone: String
    street: String
    city: String
    state: String
    zip: String
    app: Application
    env: Environment
    role: Role
    token: String
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    loginUser(email: String!, password: String!): User
    registerUser(id: String, email: String!, password: String!, firstName: String!, lastName: String!, phone: String, street: String, city: String, state: String, zip:String, app: String!, env: String!, role: String!): User
    deleteOneUser(id: String!): User
    deleteAllUsers: [User]
  }
`

export default userType