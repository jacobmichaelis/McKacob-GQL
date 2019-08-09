import { gql } from 'apollo-server-express'

const testType = gql`
  type Book {
    title: String
    author: String
  }
  type Test {
    id: String
    username: String
    password: String
    encrypted: String
  }
  extend type Query {
    books: [Book],
    test: [Test]
  }
  extend type Mutation {
    testLogin(id: String, username: String!, password: String!, encrypted: String): Test
    deleteTestUser(id: String!): Test
  }
`

export default testType