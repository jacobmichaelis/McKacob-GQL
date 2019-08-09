import { gql } from 'apollo-server-express'
import testType from './test-type'
import { userType } from './user-type'

const baseType = gql`
  type Query { base: String }
  type Mutation { base: String }
` // A base Query and Mutation are required to modularize types

const typeDefs = [ baseType, testType, userType ]

export default typeDefs